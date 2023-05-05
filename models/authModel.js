const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Enter a your Email'],
        unique:true,
        lowercase:[true,'Enter a valid Email'],
        validate:[isEmail,'Enter a valid Email']
    },
    password:{
        type:String,
        required:[true,"Enter Password"],
        minlength:[6,"Minimum length of password is 6"]
    }
});

userSchema.pre('save',async function (next) {
//    console.log("pre =>",this)
   const salt =await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password,salt); 
   next();  
})

userSchema.statics.login = async function (email,password) {
    const user =await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user;
        }
        else{
            throw new Error("incorrect Password")
        }
    }
    else{
        throw new Error("Signup First")
    }
}


const User = mongoose.model('user',userSchema);
module.exports = User;


