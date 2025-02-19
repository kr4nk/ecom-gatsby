import { connect } from 'react-redux'

import { getEvents } from '../../redux/selectors/user-order'

import EventsOrder from '../common/events-order'

import { ReduxState } from '../../types/common'
import { TOrderEvents } from '../../types/account'

interface StateProps {
  events: TOrderEvents;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  events: getEvents(state)
})

export default connect(
  mapStateToProps
)(EventsOrder)
