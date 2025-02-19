import * as React from 'react'

import SvgChecked from '../../components/svg/checked'
import SvgEmpty from '../../components/svg/empty'
import SvgCancel from '../../components/svg/cancel'

interface StateProps {
  status: string;
}

const StatusIcon = ({ status }: StateProps): JSX.Element => {
  switch (status) {
    case 'resolved':
      return (
        <SvgChecked />
      )
    case 'rejected':
      return (
        <SvgCancel />
      )
    default:
      return (
        <SvgEmpty />
      )
  }
}

export default StatusIcon
