const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const client = require("@mailchimp/mailchimp_marketing");


client.setConfig({
  apiKey: "db584e8ba6aeaa14cd0699f0149ee52f-us13",
  server: "us13",
});

const app = express();

app.use(cors());
// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
// Newsletter Route
app.post('', (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email } = req.body;
  
  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.send({
   message: 'This is an error!'
});

    return;
  }

  // Construct req data
  const data = {
        email_address: req.body.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: req.body.firstName,
          LNAME: req.body.lastName
        }
  };
  
  console.log(data);

  const run = async () => {
  const response = await client.lists.addListMember("b7b5837aee", data);
  console.log(response);
};

run();
 
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));