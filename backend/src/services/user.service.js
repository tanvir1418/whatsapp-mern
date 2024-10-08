const createHttpError = require("http-errors");
const { UserModel } = require("../models/index");

const findUser = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw createHttpError.BadRequest("Please fill all fields");
    }
    return user;
};

const searchUsers = async (keyword, userId) => {
    const users = await UserModel.find({
        $or: [{ name: { $regex: keyword, $options: "i" } }, { email: { $regex: keyword, $options: "i" } }],
    }).find({
        _id: { $ne: userId },
    });
    return users;
};

module.exports = { findUser, searchUsers };
