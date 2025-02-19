const AWS = require('aws-sdk')

const environment = process.argv[2] || process.env.AWS_ENV

// SDK autodetect ENV:
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html

if (
  !('AWS_ACCESS_KEY_ID' in process.env) ||
  !('AWS_SECRET_ACCESS_KEY' in process.env)
) {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: environment === 'production'
      ? 'ecomgatsbysourceprod'
      : 'ecomgatsbysource'
  })
}

if (!('AWS_REGION' in process.env)) {
  AWS.config.region = ''
}

const variables = require(`./.env-${environment}.json`)

const ssm = new AWS.SSM()

const promises = Object.entries(variables)
  .map(([key, value]) =>
    ssm.putParameter({
      Name: `/${environment}/.env/${key}`,
      Type: 'String',
      Value: value,
      Overwrite: true
    }).promise()
  )

Promise.all(promises)
  .then(_result => {
    console.info(`[${environment}]`, 'Environment variables updated.')
  })
  .catch(err => {
    console.error(err)
  })
