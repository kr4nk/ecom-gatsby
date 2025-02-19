import { createContext } from 'react'

import { TSiteDocument } from '../types/static'

export interface TContextDownloads {
  name: string;

  catalog: TSiteDocument[];
  documents: TSiteDocument[];
}

export const ContextDownloads = createContext<TContextDownloads>({
  name: 'downloads',

  catalog: [],
  documents: []
})
