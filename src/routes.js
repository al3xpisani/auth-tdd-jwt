const routes = require("express").Router();
const { User } = require("./app/models");
const authMiddleware = require("./app/middleware/auth");
const SessionController = require("./app/controllers/SessionController");

routes.post("/sessions", SessionController.store);

//does not include the post above. the use below is valid for the next code lines
routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.send(200).send();
});

module.exports = routes;
