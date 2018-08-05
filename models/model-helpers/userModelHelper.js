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


//Get user's summary history
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

// Sum the "city_trips_count" property for the returned object
function countTrips(historyArray) {
    let count = 0;
    historyArray.forEach(element => {
        count += element['city_trips_count'];
    });
    return count;
}

//Update user history
async function updateUserHistory(uuid, data) {
    data.forEach((obj) => {
        findOneAndUpdate({
            uuid: uuid
        }, {
            $push: {
                history: obj
            }
        });
    });
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
    createUser,
    countTrips
}