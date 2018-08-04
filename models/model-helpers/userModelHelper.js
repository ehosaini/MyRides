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
async function getSummaryHistory(uuid) {

    try {
        return User.aggregate([{
                // stage 1: match 
                $match: {
                    uuid: uuid
                }
            },
            {
                // stage 3: project 
                $project: {
                    _id: 0,
                    history: 1,
                    total_count: {
                        $sum: 1
                    }
                }
            }, {
                // stage 2: unwind hisotry collection
                $unwind: "$history"
            }, {
                // stage 4: group documents by city name and count
                $group: {
                    _id: {
                        city: "$history.start_city"
                    },
                    city_trips_count: {
                        $sum: 1
                    }
                }
            }
        ]);
    } catch (error) {
        console.log(error);
    }
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
    getSummaryHistory,
    updateUserHistory,
    createUser
}