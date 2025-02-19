
import { getEndpoint } from './src/aws/amplify'

const config = {
  client: {
    name: 'ecom-gatsby',
    service: {
      name: 'ecom-gatsby-incognito',
      endpoint: {
        url: `${getEndpoint('user')}/graphql-incognito`
      },
      // url: `${getEndpoint('user')}/graphql-incognito`,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      localSchemaFile: './src/graphql/user.gql'
    }
  }
}

export default config
