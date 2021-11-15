const router = require("express").Router();
const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');
const secret = 'TOP_SECRET';


router.get("/", (req, res) => {
  UserModel.find().then((response) => {
    res.send(response);
  });
});

router.post("/", (req, res) => {
  const user = new UserModel(req.body);
  user.save().then(user =>{
      res.status(201).send(user);
  })
  .catch(err => {
      res.status(500).send(err);
  })
});

router.post('/login', (req, res) => {
  UserModel.findOne({ email : req.body.email })
      .then(async (response) =>{
          const valid = await response.isValidPassword(req.body.password);
          if(valid){
              const token = jwt.sign({ ...response._doc}, secret );
              console.log('token', token)
              res.json({ token })
          }else {
              res.sendStatus(401).send();
          }      
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(401).send(err);
      })
});

router.put("/:id", (req, res) => {
  UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/validate/:id", (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      user.validateUser();
      return user.save();
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    });
});

router.delete("/:id", (req, res) => {
  UserModel.findOneAndDelete({ _id: req.params.id }).then((data) => {
    res.status(200).send(data);
  });
});

module.exports = router;