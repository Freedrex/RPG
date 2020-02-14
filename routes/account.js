const route = require('express').Router();
const { Player, Team, Charact, Item } = require('../models/models');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// route.get('/', async (req, res) => {
//   res.render('account')
// });

route.post('/', async (req, res) => {
  // if (admin) res.redirect('/admin');
  const {username, password} = req.body
  // console.log(username);
  
  const player = await Player.findOne({ login: username}).populate('charact').populate('inventory');
  console.log(username,player); 
  if( await bcrypt.compare(password, player.password )) {
    const admin = await Team.findOne({ commander: player._id });
    if(admin){ 
      res.render('admin', {player})
    }else{
    const players = await Team.findOne({players: player._id}).populate('players').populate('storage');
    res.render('account', { player})
  }
  }
});

// route.get('/', async (req,res)=>{
// const player = await Player.findOne({_id: req.query.id}).populate('players').populate('storage');
// res.render('account', { player})

// })

module.exports = route;
