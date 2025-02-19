import { ReduxState } from '../../types/common'

import {
  FIELDS,
  IS_FETCHING,
  MANAGER_TOOLS
} from '../selector-consts'

export function getIsFetching (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, MANAGER_TOOLS, IS_FETCHING])
}
