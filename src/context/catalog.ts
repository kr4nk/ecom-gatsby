import { createContext } from 'react'

import {
  TCategories,
  TManufacturers,
  TProducts
} from '../types/static'

export interface TContextCatalog {
  name: string;

  productIds: string[];
  productItems: TProducts;

  categoryIds: string[];
  categoryItems: TCategories;

  manufacturerIds: string[];
  manufacturerItems: TManufacturers;
}

export const ContextCatalog = createContext<TContextCatalog>({
  name: 'catalog',

  productIds: [],
  productItems: {},

  categoryIds: [],
  categoryItems: {},

  manufacturerIds: [],
  manufacturerItems: {}
})
