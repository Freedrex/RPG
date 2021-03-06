const route = require("express").Router();
const { Player, Team, Charact, Item } = require("../models/models");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// route.get("/", (req, res) => {
//   res.render("index");
// });
route.get("/", async (req, res) => {
  const teams = await Team.find().select("name");
  console.log(teams);

  res.render("index", { teams });
});

route.post("/registration", async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  const player = new Player({
    login: username,
    password: await bcrypt.hash(password, saltRounds),
    charact: [],
    inventory: []
  });

  await player.save();
  res.redirect(`/account/?id=${player._id}`);
});

route.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

route.get("/badauth", (req, res) => {
  res.render("badauth");
});

module.exports = route;
