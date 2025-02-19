import * as React from 'react'
import classnames from 'classnames'

import SvgStars from '../svg/stars'

import * as stars from '../../styles/stars.module.css'

function getRatingClass (rating: number): string {
  switch (rating) {
    case 3.0: return stars.rating30
    case 3.5: return stars.rating35
    case 4.0: return stars.rating40
    case 4.5: return stars.rating45
    case 5.0: return stars.rating50
    default: return ''
  }
}

interface OwnProps {
  rating: number;
}

function Stars ({ rating }: OwnProps): JSX.Element {
  return (
    <div className={stars.stars}>
      <div
        role='img'
        aria-label={
          rating
            ? `Rating ${rating} stars`
            : 'No rating'
        }
        className={stars.starsInactive}
      >
        <SvgStars />

        {
          rating !== 0 && (
            <div
              className={
                classnames(
                  stars.starsRating,
                  getRatingClass(rating)
                )
              }
            >
              <div className={stars.starsActive}>
                <SvgStars />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default React.memo(Stars)
