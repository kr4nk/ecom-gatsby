import { createContext } from 'react'

import {
  TCategory,
  TCategories,
  TManufacturers,
  TProducts
} from '../types/static'

export interface TContextCategory {
  name: string;

  category: TCategory;

  productIds: string[];
  productItems: TProducts;

  categoryIds: string[];
  categoryItems: TCategories;

  manufacturerIds: string[];
  manufacturerItems: TManufacturers;
}

export const ContextCategory = createContext<TContextCategory>({
  name: 'category',

  category: {
    parentId: '',
    id: '',
    name: '',
    slug: '',
    seoTitle: '',
    seoDesc: '',
    children: [],
    products: [],
  },

  productIds: [],
  productItems: {},

  categoryIds: [],
  categoryItems: {},

  manufacturerIds: [],
  manufacturerItems: {}
})
