import { connect } from 'react-redux'

import { getSearchValue } from '../../redux/selectors/user-shop'

import { shopProductSearch } from '../../redux/actions/user-shop'

import FilterSearch from '../../components/common/filter-search'

import { ReduxState, Dispatch } from '../../types/common'

interface StateProps {
  value: string;
}

interface DispatchProps {
  onChange: React.ChangeEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  value: getSearchValue(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(
      shopProductSearch(value)
    )
  }
})

const InputSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSearch)

export default InputSearch
