const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/* 
show all users
show specific user
update specific user
add user
login user
logout user
delete usser
*/


// show all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// add new user
router.post('/', async (req, res) => {
    const saltRounds = 10;
    let encrypted_password;
    try {
        const users = await User.find({username: req.body.username});
        if (users.length > 0) {
            return res.status(400).json({message: "Username Already Exists Please Try Another"})
        }
        if (req.body.password.length < 7) {
            return res.status(400).json({message: "Password isn't long enough"})
        }
        encrypted_password = await bcrypt.hash(req.body.password, saltRounds)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    const user = new User({
        username: req.body.username,
        password: encrypted_password,
        displayName: req.body.username
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// find specific user
router.get('/:username', getUser, (req, res) => {
    res.send(res.user)
})

// delete user
router.delete('/:username', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.status(200).json({message: "Deleted User"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// login user
router.post('/login', async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
    try {
        const user = await User.find({ username : username })
        if (user.length < 1) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
        const passwordMatch = await bcrypt.compare(password, user[0].password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "Passwords don't match the records in the database" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    const token = jwt.sign({ username: req.body.username }, process.env.WEB_TOKEN, { expiresIn: '2hr' })

    res.status(201).json({token, expiresIn: 120, userInfo: {username: username}})
})

// update user
router.patch('/:username', getUser, async (req, res) => {
    console.log("request body")
    console.log(req.body)
    console.log("current user")
    console.log(res.user[0])
    if (req.body.displayImageUrl != null) {
        res.user[0].displayImageUrl = req.body.displayImageUrl
    }
    if (req.body.bannerImageUrl != null) {
        res.user[0].bannerImageUrl = req.body.bannerImageUrl
    }
    if (req.body.bio != null) {
        res.user[0].bio = req.body.bio
    }
    if (req.body.displayName != null) {
        res.user[0].displayName = req.body.displayName
    }

    console.log("user after updates")
    console.log(res.user[0])

    try {
        const updatedUser = await res.user[0].save()
        res.json(updatedUser)
    } catch (err)  {
        res.status(400).json({message: err.message})
    }
})

async function getUser(req, res, next) {
    let user
    try {
      user = await User.find({username: req.params.username}).limit(1).sort({ _id: 1 });
      if (user.length < 1) {
        return res.status(404).json({ message: 'Cannot find user' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

module.exports = router