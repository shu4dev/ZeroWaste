const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {strict: false},
  {collection: "Order"}
);

const UserSchema = new Schema({
    Username: {
      type: String,
      default: "",
      required: true,
    },
    Password: {
        type: String,
        default: "",
        required: true,
    }
  },
  {collection: "UserInfo"}
);

const UserInfo = mongoose.model('UserInfo', UserSchema);
const Order = mongoose.model('Order', OrderSchema);
module.exports = {Order, UserInfo}

