const mongoose = require("mongoose");

const data = mongoose.Schema({
    oldRoleIDD: String,
    newRoleID: String,

    Date: Number
});

module.exports = mongoose.model("deletedRolee", data);