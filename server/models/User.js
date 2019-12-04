const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.Promise = Promise

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.methods = {
    checkPassword: function(inputPass) {
        return bcrypt.compareSync(inputPass, this.password)
    },
    hashPass: plainTextPass => {
        return bcrypt.hashSync(plainTextPass, 10)
    }
}

userSchema.pre('save', function(next){
    if(!this.password){
        console.log('models/user.js ==NO PASSWORD==')
        next()
    }else{
        console.log('models/user.js hashPassword in pre save');
        this.password = this.hashPass(this.password)
        next()
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User