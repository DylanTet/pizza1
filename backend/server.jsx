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


const jwtCheck = auth({
  audience: "https://www.pizza-orders.com",
  issuerBaseURL: "https://dev-aw24h7vl.us.auth0.com"
});

// This route needs authentication
const checkScopes = requiredScopes('read:orders');

app.use(express.json())

app.post('/api/order', jwtCheck, checkScopes, function(req, res) {

  console.log(req.body)

  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });


    var ManagementClient = require('auth0').ManagementClient;
    var management = new ManagementClient({
      domain: 'dev-aw24h7vl.us.auth0.com',
      clientId: 'S7yoBMlAudrJm4Vx3EtQhXvPA81ntyxS',
      clientSecret: 'fiQmqQvtjPzxUTJqCeKo2ABbko4KHpb_BCzHiFk8AA7dNidKufDUo_Ko19YOlxFP',
      scope: "read:users update:users"
    });

    management.getUser({id: req.auth.payload.sub}, function (err, user) {
      if (err) {
        console.log(err)
      } else {

        usersOrders = user.user_metadata.orders || []
        user.user_metadata.orders.push('pizza')

        management.updateUser({id: user.user_id}, {user_metadata: {orders: usersOrders}})
        console.log(user.user_metadata.orders)
      }
    });
});

app.listen(6060, function() {
  console.log('Listening on http://localhost:6060');
});