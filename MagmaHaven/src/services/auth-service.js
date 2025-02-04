import User from "../models/user.js"

function register(username, email, password){
   return User.create({username, email, password})
}



export default {
    register
}