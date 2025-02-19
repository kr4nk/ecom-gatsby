import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-tools'

import { rebuildSite } from '../../redux/actions/admin-tools'

import ButtonRebuildSite from './src/button-rebuild-site'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: rebuildSite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonRebuildSite)
