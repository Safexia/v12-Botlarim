const mongoose = require("mongoose");

const data = mongoose.Schema({
    oldRoleID: String,
    oldRoleIDD: String,
    newRoleID: String,
    newRoleIDD: String,

    Date: Number
});

module.exports = mongoose.model("deletedRole", data);