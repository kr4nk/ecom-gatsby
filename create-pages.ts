/* env: node */
// @ts-ignore
import fetch, { Response } from 'node-fetch'
import * as path from 'path'
import { print } from 'graphql'

// Do not move this plugin to .babelrc
// He turns off hot reloading for *.graphql files
// @ts-ignore
import { requireGql } from 'babel-plugin-import-graphql/build/requireGql'

import { getEndpoint } from './src/aws/amplify'

import {
  getProductFileUrl,
  getProductImageUrl
} from './src/aws/s3'

// @see https://www.gatsbyjs.org/docs/actions/#createPage
const IndexTemplate = path.resolve('./src/templates/index.tsx')

const LandingTemplate = path.resolve('./src/templates/landing.tsx')

const AccountTemplate = path.resolve('./src/templates/account.tsx')
const AdminTemplate = path.resolve('./src/templates/admin.tsx')
const ManagerTemplate = path.resolve('./src/templates/manager.tsx')

const NotFoundTemplate = path.resolve('./src/templates/404.tsx')
const CatalogTemplate = path.resolve('./src/templates/catalog.tsx')
const CategoriesTemplate = path.resolve('./src/templates/categories.tsx')
const CategoryTemplate = path.resolve('./src/templates/category.tsx')
const CertificateTemplate = path.resolve('./src/templates/certificate.tsx')
const CertificatesTemplate = path.resolve('./src/templates/certificates.tsx')
const ContactUsTemplate = path.resolve('./src/templates/contact-us.tsx')
const DownloadsTemplate = path.resolve('./src/templates/downloads.tsx')
const ForgotTemplate = path.resolve('./src/templates/forgot.tsx')

const ManufacturerTemplate = path.resolve('./src/templates/manufacturer.tsx')
const ManufacturersTemplate = path.resolve('./src/templates/manufacturers.tsx')
const PasswordTemplate = path.resolve('./src/templates/password.tsx')
const PrivacyTemplate = path.resolve('./src/templates/privacy.tsx')
const ProductTemplate = path.resolve('./src/templates/product.tsx')
const ResetTemplate = path.resolve('./src/templates/reset.tsx')
const RearchTemplate = path.resolve('./src/templates/search.tsx')
const SignInConfirmTemplate = path.resolve('./src/templates/signin-confirm.tsx')
const SignInTemplate = path.resolve('./src/templates/signin.tsx')
const SignUpConfirmTemplate = path.resolve('./src/templates/signup-confirm.tsx')
const SignUpTemplate = path.resolve('./src/templates/signup.tsx')

interface Category {
  parentId: string;
  id: string;
  slug: string;
  products: string[];
  children: string[];

  parentSlug: string;
  expanded: boolean;
}

interface CategoryMap {
  [key: string]: Category;
}

interface ProductVersion {
  productId: string;
  id: string;

  discount: number;
}

interface ImageBreakpoint {
  path: string;
  blur?: string;
  type: string;
  media: string;
  width: number;
  height: number;
}

interface ProductImage {
  src: string;
  alt: string;
  breakpoints: ImageBreakpoint[];
}

interface ProductFile {
  src: string;
}

interface Product {
  id: string;
  slug: string;
  versions: ProductVersion[];
  images: ProductImage[];
  files: ProductFile[];
}

interface ProductMap {
  [key: string]: Product;
}

interface Manufacturer {
  id: string;
  slug: string;
}

interface ManufacturerMap {
  [key: string]: Manufacturer;
}

interface Certificate {
  id: string;
  slug: string;
}

interface CertificateMap {
  [key: string]: Certificate;
}

interface GroupProduct {
  groupId: string;
  productId: string;
  versionId: string;
  discount: number;
}

interface Group {
  id: string;
  products: GroupProduct[];
}

interface ResultGetHome {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any[];
}

interface Context {
  categoryIds: string[];
  categoryItems: CategoryMap;
  certificateIds: string[];
  certificateItems: CertificateMap;
  manufacturerIds: string[];
  manufacturerItems: ManufacturerMap;
  productIds: string[];
  productItems: ProductMap;
  category?: Category;
  manufacturer?: Manufacturer;
  certificate?: Certificate;
  product?: Product;
}

interface Page {
  path: string;
  component: string;
  context?: Context;
}

interface CreatePagesArgs {
  actions: {
    createPage (
      page: Page,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      actionOptions?: any
    ): void;
  };
}

function toJson (response: Response): Promise<ResultGetHome> {
  return response.json()
}

function reduceProductItems (acc: ProductMap, item: Product): ProductMap {
  for (const image of item.images) {
    image.src = getProductImageUrl(image.src)

    for (const params of image.breakpoints) {
      params.path = getProductImageUrl(params.path)
    }
  }

  for (const file of item.files) {
    file.src = getProductFileUrl(file.src)
  }

  acc[item.id] = item

  return acc
}

function pluckId ({ id }: { id: string }): string { return id }

function filterParentCategories (item: Category): boolean {
  return item.parentId === 'none'
}

function reduceCategoryItems (acc: CategoryMap, item: Category): CategoryMap {
  item.expanded = false

  acc[item.id] = item

  return acc
}

function reduceItems (acc: ManufacturerMap | CertificateMap, item: Manufacturer | Certificate): ManufacturerMap | CertificateMap {
  acc[item.id] = item

  return acc
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createPages ({ actions: { createPage } }: CreatePagesArgs): Promise<any> {
  const { getHome } = requireGql(path.resolve('./src/graphql/user.gql'))

  const query = print(getHome)

  const url = `${getEndpoint('user')}/graphql-incognito`

  console.log('url:', url)

  function createEachPage (pages: Page[]): void {
    for (let page of pages) {
      console.info('page.path:', page.path)

      createPage(page)
    }
  }

  function success (result: ResultGetHome): Promise<void> {
    if (
      result.data === undefined ||
      result.errors !== undefined
    ) {
      throw result.errors
    }

    const {
      data: {
        categories: listCategories,
        products,
        manufacturers,
        certificates,
        catalog = [],
        documents = [],
        groups
      }
    } = result

    // Products
    const productIds = products
      .map(pluckId)

    const productItems: ProductMap = products
      .reduce(reduceProductItems, {})

    function productExists (id: string): boolean { return productItems[id] !== undefined }

    // Categories
    const subcategories: Category[] = []

    const catAssoc: CategoryMap = {}

    function sortCategoriesByParent (item: Category): void {
      catAssoc[item.id] = item

      if (item.parentId !== 'none') {
        const parent = catAssoc[item.parentId]

        if (parent !== undefined) {
          parent.children.push(item.id)
          item.parentSlug = parent.slug
          subcategories.push(item)
        }
      } else {
        item.children = []
      }

      // Remove private products
      item.products = item.products
        .filter(productExists)
    }

    listCategories.forEach(sortCategoriesByParent)

    const categories = listCategories.filter(filterParentCategories)

    // Parent categories
    const categoryIds = categories
      .map(pluckId)

    // Collect map of items
    const categoryItems: CategoryMap = listCategories
      .reduce(reduceCategoryItems, {})

    // Manufacturers
    const manufacturerIds = manufacturers
      .map(pluckId)

    const manufacturerItems: ManufacturerMap = manufacturers
      .reduce(reduceItems, {})

    // Certificates
    const certificateIds = certificates
      .map(pluckId)

    const certificateItems: CertificateMap = certificates
      .reduce(reduceItems, {})

    // Groups
    function forEachProduct ({ productId, versionId, discount }: GroupProduct): void {
      const product = productItems[productId]

      function versionExists ({ id }: ProductVersion): boolean {
        return id === versionId
      }

      if (product !== undefined) {
        const version = product.versions.find(versionExists)

        if (
          version !== undefined && (
            version.discount === undefined ||
            version.discount < discount
          )
        ) {
          version.discount = discount
        }
      }
    }

    function forEachGroup ({ products }: Group): void {
      products.forEach(forEachProduct)
    }

    groups.forEach(forEachGroup)

    const context: Context = {
      categoryIds,
      categoryItems,

      certificateIds,
      certificateItems,

      manufacturerIds,
      manufacturerItems,

      productIds,
      productItems
    }

    const pages = [{
      path: '/',
      component: LandingTemplate
    }, {
      path: '/shop',
      component: IndexTemplate,
      context
    }, {
      path: '/search',
      component: RearchTemplate,
      context
    }, {
      path: '/categories',
      component: CategoriesTemplate,
      context
    }, {
      path: '/certificates',
      component: CertificatesTemplate,
      context
    }, {
      path: '/manufacturers',
      component: ManufacturersTemplate,
      context
    }, {
      path: '/catalog',
      component: CatalogTemplate,
      context
    }, {
      path: '/downloads',
      matchPath: '/downloads/*',
      component: DownloadsTemplate,
      context: {
        catalog,
        documents
      }
    }, {
      path: '/404.html',
      component: NotFoundTemplate
    }, {
      path: '/account',
      matchPath: '/account/*',
      component: AccountTemplate
    }, {
      path: '/admin',
      matchPath: '/admin/*',
      component: AdminTemplate
    }, {
      path: '/contact-us',
      component: ContactUsTemplate
    }, {
      path: '/forgot',
      component: ForgotTemplate
    }, {
      path: '/manager',
      matchPath: '/manager/*',
      component: ManagerTemplate
    }, {
      path: '/password',
      component: PasswordTemplate
    }, {
      path: '/privacy',
      component: PrivacyTemplate
    }, {
      path: '/reset',
      component: ResetTemplate
    }, {
      path: '/signin-confirm',
      component: SignInConfirmTemplate
    }, {
      path: '/signin',
      component: SignInTemplate
    }, {
      path: '/signup-confirm',
      component: SignUpConfirmTemplate
    }, {
      path: '/signup',
      component: SignUpTemplate
    }]

    function createCategoryPages (category: Category): void {
      pages.push({
        path: `/category/${category.slug}`,
        component: CategoryTemplate,
        context: { category, ...context }
      })
    }

    function createManufacturerPages (manufacturer: Manufacturer): void {
      pages.push({
        path: `/manufacturer/${manufacturer.slug}`,
        component: ManufacturerTemplate,
        context: { manufacturer, ...context }
      })
    }

    function createCertificatePages (certificate: Certificate): void {
      pages.push({
        path: `/certificate/${certificate.slug}`,
        component: CertificateTemplate,
        context: { certificate, ...context }
      })
    }

    function createProductPages (product: Product): void {
      pages.push({
        path: `/product/${product.slug}`,
        component: ProductTemplate,
        context: { product, ...context }
      })
    }

    [...categories, ...subcategories].forEach(createCategoryPages)

    manufacturers.forEach(createManufacturerPages)

    certificates.forEach(createCertificatePages)

    products.forEach(createProductPages)

    return Promise.resolve(pages)
      // @ts-ignore
      .then(createEachPage)
  }

  return fetch(url, {
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    })
  })
    .then(toJson)
    .then(success)
}
