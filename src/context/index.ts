import { createContext } from 'react'

import {
  TCategories,
  TCertificates,
  TManufacturers,
  TProducts
} from '../types/static'

export interface TContextIndex {
  name: string;

  productIds: string[];
  productItems: TProducts;

  categoryIds: string[];
  categoryItems: TCategories;

  manufacturerIds: string[];
  manufacturerItems: TManufacturers;

  certificateIds: string[];
  certificateItems: TCertificates;
}

export const ContextIndex = createContext<TContextIndex>({
  name: 'index',

  productIds: [],
  productItems: {},

  categoryIds: [],
  categoryItems: {},

  manufacturerIds: [],
  manufacturerItems: {},

  certificateIds: [],
  certificateItems: {}
})
