// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
//const apiId = '...'
export const apiEndpoint = `https://fng2gedj4i.execute-api.eu-west-1.amazonaws.com/dev` //taken from backend ServiceEndpoint

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-l1t4mrdg.us.auth0.com',            // Auth0 domain
  clientId: 'lknEE2lmFkZtOV9PPovf68pK2pwxkTG9',          // Auth0 client id
  clientSecret: 'NscYfihfPxdcz0xtjVfsOwjCxDX3jkpqUNtCjK8E7jwGYkxBu7vAxuL3yefDUqPQ',// Auth0 client secret
  callbackUrl: 'http://localhost:3000/callback' //defined in auth0
}
