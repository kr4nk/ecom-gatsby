import * as React from 'react'
import { connect } from 'react-redux'

import { getIsShopLoaded } from '../../redux/selectors/user-shop'

import Spinner from '../../components/common/spinner'
import ButtonReturn from '../../components/common/button-return'

import ContainerProduct from './container-product'

import * as layout from '../../styles/layout.module.css'

import { ReduxState } from '../../types/common'

interface StateProps {
  isShopLoaded: boolean;
}

interface OwnProps {
  slug: string;
}

const Product = ({ slug, isShopLoaded }: StateProps & OwnProps): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.controls}>
      <ButtonReturn />
    </div>

    <div className={layout.content}>
      {
        // eslint-disable-next-line @getify/proper-arrows/return
        isShopLoaded
          ? (
            <ContainerProduct
              slug={slug}
            />
          )
          : <Spinner />
      }
    </div>

    <div className={layout.controls}>
      <ButtonReturn />
    </div>
  </div>
)

const mapStateToProps = (state: ReduxState): StateProps => ({
  isShopLoaded: getIsShopLoaded(state)
})

export default connect(
  mapStateToProps
)(Product)
