const User = require('../models/User')
const passport = require('../passport')
const router = require('express').Router()

router.post('/', (req, res) => {
    console.log('signup')
    console.log(req.body)
    const {firstName, lastName, password, email} = req.body

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('there was an err: ',err)
        }else if(user) {
            res.json({
                error: 'Sorry, email already registered'
            })
        }
        else {
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            newUser.save((err, savedUser) => {
                if(err){return res.json(err)}
                res.json(savedUser)
            })
        }
    })
})
router.post('/login', function(req, res, next){
    console.log('req.body: ',req.body)
    next()
},
passport.authenticate('local'),
(req,res) => {
    console.log('logged in', req.user);
    let userInfo = {
        email: req.user.email
    };
    res.send(userInfo);
}
)

router.get('/', (req,res,next) => {
    console.log(req.user)
    if(req.user){
        res.json({ user: req.user})
    }else {
        res.json({ user: null})
    }
})

router.post('/logout', (req,res) => {
    if(req.user){
        req.logout()
        res.send({msg: 'logging out'})
    }else{
        res.send({msg: 'no user logged in'})
    }
})
module.exports = router