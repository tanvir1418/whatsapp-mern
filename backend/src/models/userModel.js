const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: [true, "This email address already exist."],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address."],
    },
    picture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    status: {
      type: String,
      default: "Hey there! I am using whatsapp",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [
        6,
        "Please make sure your password is at least 6 characters long",
      ],
      maxLength: [
        128,
        "Please make sure your password is less than 128 characters long",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

module.exports = UserModel;
