const app = require("./app");

//setup PORT env in heroku,whatever...
app.listen(process.env.PORT || 3000);
