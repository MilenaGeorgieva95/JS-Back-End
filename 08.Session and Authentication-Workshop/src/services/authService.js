import User from '../models/User.js';

function register(userData){
return User.create(userData)
}

const authService={
    register
}

export default authService;