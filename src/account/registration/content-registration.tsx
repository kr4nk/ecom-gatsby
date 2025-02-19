import { connect } from 'react-redux'

import { getFieldCountry } from '../../redux/selectors/user-registration'

import { submitRegistration } from '../../redux/actions/user-registration'

import ContentRegistration from '../common/content-registration'

import { Dispatch, ReduxState } from '../../types/common'

import { VALUE } from '../../redux/selector-consts'

interface StateProps {
  country: string;
}

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  country: getFieldCountry(state)
    .get(VALUE)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (e): void {
    e.preventDefault()

    dispatch(
      submitRegistration()
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentRegistration)
