import { StatusCodes } from "http-status-codes";
import { UserQuery } from "../models/query.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const addUserQuery = asyncHandler(async (req, res) => {
  const { symptoms, prediction } = req.body;

  const query = new UserQuery({
    symptoms,
    prediction,
  });

  await query.save();

  const user = await User.findById(req.user._id);
  user.userQueries.push(query._id);
  await user.save();

  res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse(StatusCodes.CREATED, query, "User query added"));
});

const deleteQuery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existedQuery = await UserQuery.findByIdAndDelete(id);

  if (!existedQuery) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ApiResponse(StatusCodes.BAD_REQUEST, {}, "No such query found")
      );
  }

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, {}, "Query deleted successfully"));
});

export { addUserQuery, deleteQuery };
