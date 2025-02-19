import { connect } from 'react-redux'

import { getCertificatesItems } from '../../redux/selectors/user-certificates'

import CertificatesProduct from '../common/certificates-product'

import { ReduxState } from '../../types/common'
import { TCertificates } from '../../types/account'

interface StateProps {
  items: TCertificates;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  items: getCertificatesItems(state)
})

export default connect(
  mapStateToProps
)(CertificatesProduct)
