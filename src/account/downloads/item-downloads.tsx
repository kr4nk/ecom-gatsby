import { connect } from 'react-redux'

import { getProtectedFile } from '../../redux/actions/user-downloads'

import ItemDownloads from '../common/item-downloads'

const mapDispatchToProps = {
  getProtectedFile
}

export default connect(
  null,
  mapDispatchToProps
)(ItemDownloads)
