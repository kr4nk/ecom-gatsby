import * as React from 'react'
import Helmet from 'react-helmet'

import { publicUrl } from '../config'

interface OwnProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  image?: string;
  locale?: string;
  children?: React.ReactNode;
}

function Head ({
  title,
  description,
  keywords,
  canonical,
  image,
  locale,
  children
}: OwnProps): JSX.Element {
  return (
    <Helmet
      title={title}
      defaultTitle={publicUrl}
      encodeSpecialCharacters
    >
      <html lang={locale} />

      <meta item-prop='name' content={title} />
      <meta item-prop='description' content={description} />
      <meta item-prop='image' content={image} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='image' content={image} />
      <meta name='og:title' content={title} />
      <meta name='og:description' content={description} />
      <meta name='og:image' content={image} />
      <meta name='og:url' content={`${publicUrl}/${canonical}`} />

      {
        canonical !== undefined && (
          <link
            rel='canonical'
            href={`${publicUrl}/${canonical}`}
          />
        )
      }

      {
        children
      }
    </Helmet>
  )
}

Head.defaultProps = {
  canonical: '',
  image: '',
  locale: 'en'
}

export default React.memo(Head)
