import { ReduxState } from '../../types/common'

import {
  FIELDS,
  IS_FETCHING,
  ADMIN_TOOLS
} from '../selector-consts'

export function getIsFetching (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, ADMIN_TOOLS, IS_FETCHING])
}
