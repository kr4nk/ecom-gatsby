import * as React from 'react'

import { publicUrl } from './config'

interface HtmlProps {
  htmlAttributes?: Map<string, string>;
  headComponents?: React.ReactNode[];
  bodyAttributes?: Map<string, string>;
  preBodyComponents?: React.ReactNode[];
  body?: string;
  postBodyComponents?: React.ReactNode[];
}

export default function Html (props: HtmlProps): JSX.Element {
  const body = React.useMemo(
    function setBody (): { __html: string } {
      return { __html: props.body || '' }
    }, [ props.body ]
  )

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no' />
        <meta name='theme-color' content='#ffffff' />

        <meta name='google-site-verification' content='ecomgatsby' />

        <base href={publicUrl} />

        <meta name='mobile-web-app-capable' content='yes' />

        <link
          rel='preconnect'
          href='https://www.google.com'
        />

        <link
          rel='preconnect'
          href='https://www.googletagmanager.com'
        />

        <link rel='apple-touch-startup-image' sizes='2732x2048' href='/splash/apple_2732.jpg' />
        <link rel='apple-touch-startup-image' sizes='2436x1125' href='/splash/apple_2436.jpg' />
        <link rel='apple-touch-startup-image' sizes='2224x1668' href='/splash/apple_2224.jpg' />
        <link rel='apple-touch-startup-image' sizes='2208x1242' href='/splash/apple_2208.jpg' />
        <link rel='apple-touch-startup-image' sizes='2048x2732' href='/splash/apple_2048.jpg' />
        <link rel='apple-touch-startup-image' sizes='2048x1536' href='/splash/apple_2048_p.jpg' />
        <link rel='apple-touch-startup-image' sizes='1668x2224' href='/splash/apple_1668.jpg' />
        <link rel='apple-touch-startup-image' sizes='1536x2048' href='/splash/apple_1536.jpg' />
        <link rel='apple-touch-startup-image' sizes='1334x750' href='/splash/apple_1334.jpg' />
        <link rel='apple-touch-startup-image' sizes='1242x2208' href='/splash/apple_1242.jpg' />
        <link rel='apple-touch-startup-image' sizes='1136x640' href='/splash/apple_1136.jpg' />
        <link rel='apple-touch-startup-image' sizes='1125x2436' href='/splash/apple_1125.jpg' />
        <link rel='apple-touch-startup-image' sizes='750x1334' href='/splash/apple_750.jpg' />
        <link rel='apple-touch-startup-image' sizes='640x1136' href='/splash/apple_640.jpg' />

        <link rel='apple-touch-icon-precomposed' sizes='57x57' href='/apple-icon-57x57.png' />
        <link rel='apple-touch-icon-precomposed' sizes='60x60' href='/apple-icon-60x60.png' />
        <link rel='apple-touch-icon-precomposed' sizes='72x72' href='/apple-icon-72x72.png' />
        <link rel='apple-touch-icon-precomposed' sizes='76x76' href='/apple-icon-76x76.png' />
        <link rel='apple-touch-icon-precomposed' sizes='114x114' href='/apple-icon-114x114.png' />
        <link rel='apple-touch-icon-precomposed' sizes='120x120' href='/apple-icon-120x120.png' />
        <link rel='apple-touch-icon-precomposed' sizes='144x144' href='/apple-icon-144x144.png' />
        <link rel='apple-touch-icon-precomposed' sizes='152x152' href='/apple-icon-152x152.png' />
        <link rel='apple-touch-icon-precomposed' sizes='180x180' href='/apple-icon-180x180.png' />

        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />

        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />

        <link rel='icon' type='image/png' href='/favicon-16x16.png' sizes='16x16' />
        <link rel='icon' type='image/png' href='/favicon-32x32.png' sizes='32x32' />
        <link rel='icon' type='image/png' href='/favicon-96x96.png' sizes='96x96' />
        <link rel='icon' type='image/png' href='/favicon-128.png' sizes='128x128' />
        <link rel='icon' type='image/png' href='/favicon-196x196.png' sizes='196x196' />

        <meta name='application-name' content='ecom-gatsby' />
        <meta name='msapplication-TileColor' content='#4a4a4a' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
        <meta name='msapplication-square70x70logo' content='/mstile-70x70.png' />
        <meta name='msapplication-square150x150logo' content='/mstile-150x150.png' />
        <meta name='msapplication-wide310x150logo' content='/mstile-310x150.png' />
        <meta name='msapplication-square310x310logo' content='/mstile-310x310.png' />

        <style type='text/css'>
          {'html{font-family:Cabin,sans-serif;font-size:62.5%;line-height:1.2;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;box-sizing:border-box;text-rendering:optimizeLegibility;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;}html,textarea{font-family:Cabin,sans-serif;}html,body{min-height:100%;}body{position:relative;scroll-behavior:smooth;background-color:#ffffff;cursor:default;}*,:after,:before{box-sizing:inherit;}iframe,img,svg{width:100%;}input,select,textarea{font-weight:700;}a,body,button,div,em,footer,form,h1,h2,h3,header,img,input,label,li,nav,option,p,section,select,span,svg,textarea,ul{font-family:inherit;font-size:inherit;font-weight:inherit;font-size:100%;margin:0;padding:0;vertical-align:baseline;border:0;border-radius:0;}textarea{overflow:auto;}h1,h2,h3,li,p,span{cursor:inherit;}a,button,label,select{cursor:pointer;}a,button,div,h1,h2,h3,img,input[type=checkbox],li,nav,option,p,select,span,svg{user-select:inherit;}a{background-color:transparent;word-wrap:normal;color:inherit;}select,option{text-transform:none;text-indent:.75rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;}:-ms-input-placeholder,::-webkit-input-placeholder,:placeholder-shown{color:#abaaa9;}:-moz-placeholder,::-moz-placeholder{opacity:1;color:#abaaa9;}input[type=number]{-moz-appearance:textfield;-webkit-appearance:none;}input[type="number"]:hover,input[type="number"]:focus{-moz-appearance:number-input;}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}input[type=checkbox],input[type=radio],select::-ms-expand{display:none;}button,svg{display:block;}iframe,img{height:auto;object-fit:contain;vertical-align:middle;}button{text-align:center;background:0 0;border:none;border-radius:0;-webkit-tap-highlight-color:transparent;transition:.3s ease all;}button::-moz-focus-inner,input[type=button]::-moz-focus-inner,input[type=reset]::-moz-focus-inner,input[type=submit]::-moz-focus-inner{border:0;padding:0;}svg{fill:currentColor;height:auto;pointer-events:none;}svg:not(:root){overflow:hidden;}button,input,select{overflow:visible;}[type=search]{-webkit-appearance:textfield;}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration,[type=\'time\']{-webkit-appearance:none;}.grecaptcha-badge{position:absolute !important;right: 0 !important; bottom: 1rem !important;}@media screen and (max-width:319px){body{min-width:32rem;}}@media screen and (min-width:360px){html{font-size:70%;}}@media screen and (min-width:375px){html{font-size:71.875%;}}@media screen and (min-width:414px){html{font-size:81.25%;}}@media screen and (min-width:504px){html{font-size:98.4375%;}}@media screen and (min-width:600px){html{font-size:115.625%;}}@media screen and (min-width:768px){html{font-size:62.5%;}.grecaptcha-badge{bottom:7.2rem !important;}}@media screen and (min-width:800px){html{font-size:65.104166666666667%;}}@media screen and (min-width:1024px){html{font-size:62.5%;}}@media screen and (min-width:1280px){html{font-size:62.5%;}.grecaptcha-badge{bottom: 12rem !important;}}@media screen and (min-width:1536px){html{font-size:68%;}}@media screen and (min-width:1920px){html{font-size:75%;}}@media screen and (min-width:2048px){html{font-size:82%;}}@media screen and (min-width:2560px){html{font-size:90%;}}@media screen and (min-width:2732px){html{font-size:100%;}}'
          }
        </style>

        { props.headComponents }
      </head>

      <body {...props.bodyAttributes}>
        { props.preBodyComponents }

        <div
          key='body'
          id='___gatsby'
          dangerouslySetInnerHTML={body}
        />

        { props.postBodyComponents }

        <div id='modal-mobile-nav' />

        <div id='modal-confirm' />

        <noscript>
          <style>{'.nojs {position:fixed;top:50%;width:20 rem;text-align:center; background-color:#e42222;padding:2rem;left:50%;transform:translateX(-50%)translateY(-50%);color:#000;font-weight:700;font-size:1.6rem;line-height:2.4rem;border:0.1rem solid #ff6161;border-radius:0.8rem;box-shadow:0 0 1rem 1rem rgba(0, 0, 0, 0.5);}'}</style>

          <div className='nojs'>
            To use our website, you need to enable JavaScript
          </div>
        </noscript>
      </body>
    </html>
  )
}
