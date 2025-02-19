import { connect } from 'react-redux'

import { getCatalog } from '../../redux/selectors/user-downloads'

import CatalogDownloads from '../common/catalog-downloads'

import { ReduxState } from '../../types/common'
import { TSiteDocument } from '../../types/account'

interface StateProps {
  catalog: TSiteDocument;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  catalog: getCatalog(state)
})

export default connect(
  mapStateToProps
)(CatalogDownloads)
