import { connect } from 'react-redux'

import {
  getIsFetching,
  getFiles
} from '../../redux/selectors/user-downloads'

import ListDownloads from '../common/list-downloads'

import { ReduxState } from '../../types/common'
import { TSiteDocuments } from '../../types/account';

interface StateProps {
  isFetching: boolean;
  files: TSiteDocuments;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  files: getFiles(state)
})

export default connect(
  mapStateToProps
)(ListDownloads)
