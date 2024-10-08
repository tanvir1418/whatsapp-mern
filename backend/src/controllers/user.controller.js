const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const { searchUsers: searchUsersService } = require("../services/user.service");

const searchUsers = async (req, res, next) => {
    try {
        const keyword = req.query.search;
        if (!keyword) {
            logger.error("Please add a search query first");
            throw createHttpError.BadRequest("Oops...Something went wrong!");
        }
        const users = await searchUsersService(keyword, req.user.userId);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = { searchUsers };
