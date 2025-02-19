import { Map } from 'immutable'

import { ImmutableMap } from '../utils/immutable'

export type TImmutableAdminUser = ImmutableMap<{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  createdAt: number;
  role: number;
}>

export type TImmutableAdminUsers = Map<string, TImmutableAdminUser>
