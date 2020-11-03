const express = require('express')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname,'..', '/build')
const port = process.env.PORT || 3000
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-sg8fbv3t.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://dev-sg8fbv3t.us.auth0.com/api/v2/',
    issuer: `https://dev-sg8fbv3t.us.auth0.com/`,
    algorithms: ['RS256']
  });


app.use(express.static(publicPath))


app.get('*', (req, res)=>{
res.sendFile(path.join(publicPath, 'index.html'))
})
app.get('/', checkJwt , (req, res)=>{
    axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
})

app.listen(port, ()=>{
    console.log(`server is up `)
})