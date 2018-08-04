const {
    User
} = require('./../User');

//Look up users
async function findUser(userUberId) {
    return User.findOne({
        uuid: userUberId
    });
}

//Look up user history
async function findUserHistory(userUberId) {

}

//Check if user is already in the database
// UUID stands for Uber User ID
async function checkUser(uberUUDI, dbUUID) {

}


//Get user's history count
async function getUserHistory(uuid) {

}

//Update user history
async function updateUserHistory() {

}

//Create a new user
async function createUser(userData) {
    const user = new User(userData);
    return user.save();
}

module.exports = {
    findUser,
    findUserHistory,
    checkUser,
    getUserHistory,
    updateUserHistory,
    createUser
}