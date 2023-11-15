const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    Bowl: {
      type: Number,
      default: 0,
      required: false,
    },
    Box: {
        type: Number,
        default: 0,
        required: false,
    },
    Container_L: {
        type: Number,
        default: 0,
        required: false,
    },
    Container_S: {
        type: Number,
        default: 0,
        required: false,
    },
    Container_M: {
        type: Number,
        default: 0,
        required: false,
    },
    Forks: {
        type: Number,
        default: 0,
        required: false,
    },
    Knives: {
        type: Number,
        default: 0,
        required: false,
    },
    Plate_L: {
        type: Number,
        default: 0,
        required: false,
    },
    Plate_S: {
        type: Number,
        default: 0,
        required: false,
    },
    Spoons: {
        type: Number,
        default: 0,
        required: false,
    },
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

