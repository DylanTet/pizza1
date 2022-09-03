const express = require('express');
const app = express();
const cors = require("cors")
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
var axios = require("axios").default;
const request = require("request")

const clientOrigins = "http://localhost:3000"

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
app.use(cors({ origin: clientOrigins }));

const checkJwt = auth({
  audience: 'https://www.pizza-orders.com',
  issuerBaseURL: `https://dev-aw24h7vl.us.auth0.com/`,
});

// This route needs authentication
const checkScopes = requiredScopes('read:orders');

app.get('/api/order', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });

  if (res.status === 200 || res.status === 304) {

    var options = {
      method: 'POST',
      url: 'https://dev-aw24h7vl.us.auth0.com/oauth/token',
      headers: {'content-type': 'application/json'},
      body: {
        grant_type: 'client_credentials',
        client_id: 'MtKXEbuWerCe2JZaqWMaAXPj5OULvocy',
        client_secret: 'dhOFQyxv1soCLYxhGhXrUjkqh2DoqiRYsm6uWOo4d0F6QXUp57ZzQxRaqaJqit_C',
        audience: 'https://dev-aw24h7vl.us.auth0.com/api/v2/'
      }
    };

    request(options, function (error, response, body) {
      
      if (error) throw new Error(error);

      const token = response.json()
      const accessToken = token.get('access_token')

      var newOptions = {
        method: 'PATCH',
        url: `https://dev-aw24h7vl.us.auth0.com/api/v2/users/${req.user.client_id}`,
        headers: {'content-type': 'application/json', authorization: `Bearer ${accessToken}`},
        body: { "user_metadata": { "order_history": req.body.pizza }},
        json: true
      };

      request(newOptions, function(err, res, updateRes) {
        if (error) throw new Error(error);

        res.send({
          update: updateRes,
          user: req.user
        })

      });
      
      
    })
    
  }
});

app.listen(6060, function() {
  console.log('Listening on http://localhost:6060');
});