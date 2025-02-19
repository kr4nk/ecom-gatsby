import * as React from 'react'

import SvgLogout from '../../components/svg/logout'

import * as navMain from '../../styles/nav-main.module.css'

interface OwnProps {
  className?: string;
  onClick: React.MouseEventHandler;
}

function ButtonLogout ({ className, onClick }: OwnProps, ref: React.Ref<HTMLButtonElement>): JSX.Element {
  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      type='button'
    >
      <div
        role='img'
        aria-hidden
        className={navMain.icon}
      >
        <SvgLogout />
      </div>

      Logout
    </button>
  )
}

export default React.forwardRef<HTMLButtonElement, OwnProps>(ButtonLogout)
