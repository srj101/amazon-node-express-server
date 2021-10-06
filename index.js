const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JS9p5BFqjkt7bdnoFgtROrprhrLTmNd2WYexjAcZpIQe7OhQ1wwBcnnrDpMGyPiC9Sbv5bdCoEzmociafJDwdr800HAHh5qkq"
);

// Middleware
app.use(express.static("public"));
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
