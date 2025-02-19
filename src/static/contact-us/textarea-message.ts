import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldMessage
} from '../../redux/selectors/default-contact-us'

import Textarea from '../../components/fields/textarea'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  OnOff,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;

  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;

  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'message',
  name: 'message',
  labelText: 'Message *',
  placeholder: 'Enter your message',

  autoCapitalize: 'off' as OnOff,
  autoComplete: 'off' as OnOff,
  autoCorrect: 'on' as OnOff,

  className: classnames(
    fields.field,
    grid.colMd4
  ),
  disabled: getIsFetching(state),
  params: getFieldMessage(state)
})

const TextareaMessage = connect(
  mapStateToProps
)(Textarea)

export default TextareaMessage
