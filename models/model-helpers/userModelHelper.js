const User = require('./../User');

//Look up users
async function findUser(userUberId){
    return User.findOne({uuid: userUberId});
}

//Look up user history
async function findUserHistory(userUberId){
    
}

//Check if user is already in the database
// UUID stands for Uber User ID
async function checkUser(uberUUDI, dbUUID){

}


//Check if user's history has changed since last visit
async function checkUserHistory(uberCount, dbCount){

}

//Update user history
async function updateUserHistory(){

}

//Create a new user
async function createUser(userData){
   
}