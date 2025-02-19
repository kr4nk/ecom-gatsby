import { createContext } from 'react'

import {
  TCategories,
  TCertificates,
  TManufacturers,
  TProducts,
  TProduct
} from '../types/static'

export interface TContextProduct {
  name: string;

  product: TProduct;

  productIds: string[];
  productItems: TProducts;

  categoryIds: string[];
  categoryItems: TCategories;

  manufacturerIds: string[];
  manufacturerItems: TManufacturers;

  certificateIds: string[];
  certificateItems: TCertificates;
}

export const ContextProduct = createContext<TContextProduct>({
  name: 'product',

  product: {
    id: '',
    slug: '',
    name: '',
    rating: 0,
    manufacturerId: '',
    certificates: [],

    descShort: '',
    descFull: '',
    details: '',

    seoTitle: '',
    seoDesc: '',

    versions: [],
    images: [],
    files: [],

    isBestseller: false,
    isPublished: true,
    isUsed: true
  },

  productIds: [],
  productItems: {},

  categoryIds: [],
  categoryItems: {},

  manufacturerIds: [],
  manufacturerItems: {},

  certificateIds: [],
  certificateItems: {}
})
