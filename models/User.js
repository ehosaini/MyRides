const {
    mongoose
} = require('./mongoose-connect');


let Schema = mongoose.Schema;

let userSchema = new Schema({
    picture: String,
    first_name: String,
    last_name: String,
    promo_code: String,
    rider_id: String,
    email: String,
    mobile_verified: String,
    uuid: String,
    history: {
        type: Array,
        "default": []
    },
});

let User = mongoose.model('User', userSchema);

module.exports = {
    User
}