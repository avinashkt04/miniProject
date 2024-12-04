import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";

// Register user with email and password
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field.trim === "")) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(new ApiResponse(StatusCodes.CONFLICT, {}, "Email already existed"));
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  await newUser.save();

  const token = await newUser.generateAccessToken();

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "Something went wrong while registering the user"
        )
      );
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.CREATED)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        createdUser,
        "User Registered successfully"
      )
    );
});

// Login user with email and password
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim === "")) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields required");
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(StatusCodes.UNAUTHORIZED, {}, "Invalid Credentials")
      );
  }

  const isValidPassword = await existedUser.isPasswordCorrect(password);

  if (!isValidPassword) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(StatusCodes.UNAUTHORIZED, {}, "Invalid Credentials")
      );
  }

  const token = await existedUser.generateAccessToken();

  const user = await User.findById(existedUser._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.ACCEPTED)
    .cookie("token", token, options)
    .json(
      new ApiResponse(StatusCodes.ACCEPTED, user, "User logged in successfully")
    );
});

// Fetching current user
const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id).populate(
    "userQueries"
  );
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, user, "Current user fetched successfully")
    );
});

// Logout User
const userLogout = asyncHandler(async (req, res) => {
  res
    .status(StatusCodes.OK)
    .clearCookie("token")
    .clearCookie("connect.sid")
    .json(new ApiResponse(StatusCodes.OK, {}, "Logout successfully"));
});

export { userRegister, userLogin, currentUser, userLogout };
