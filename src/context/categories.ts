import { createContext } from 'react'

import { TCategories } from '../types/static'

export interface TContextCategories {
  name: string;

  categoryIds: string[];
  categoryItems: TCategories;
}

export const ContextCategories = createContext<TContextCategories>({
  name: 'categories',

  categoryIds: [],
  categoryItems: {}
})
