const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myRides').then((connection) => {
    console.log('Successfully connceted to the database.');
}).catch((e) => {
  console.log(e);
});

module.exports = {
  mongoose
};