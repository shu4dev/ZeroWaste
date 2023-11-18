const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    return: {
        type: Boolean,
        default: false,
        required: true,
    }
  },
  {strict: false},
  {collection: "Order"}
);

const UserSchema = new Schema({
    Username: {
      type: String,
      default: "",
      required: true,
    },
    Order : {
      type : Array,
      default: [],
      required : true
    }
  },
  {collection: "UserInfo"}
);

const UserInfo = mongoose.model('UserInfo', UserSchema);
const Order = mongoose.model('Order', OrderSchema);
module.exports = {Order, UserInfo}

