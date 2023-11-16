const HID = require('node-hid');
devices = HID.devices()
console.log(devices)