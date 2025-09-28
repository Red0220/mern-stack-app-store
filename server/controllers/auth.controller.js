import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/user.model.js";
import { emitToAll, emitToUser } from "../services/socket.services.js";
import { sendTokenResponse } from "../utilities/sendTokenRes.js";

export const signUp = async (req, res, next) => {
  console.log("body \n", req.body);
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required..."));
    }
    if (password.length < 8) {
      return next(errorHandler(400, "Password too short"));
    }

    if (!validator.isEmail(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    const userExisted = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExisted) {
      return next(
        errorHandler(
          400,
          userExisted.email === email
            ? "Email already exsisted"
            : "Username already taken"
        )
      );
    }

    //hash password
    const hashPass = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    await newUser.save();
    //emit
    emitToAll("new_user", { userId: newUser._id });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "User already exists"));
    }
  
    next(error);
  }
};

// logging

export const logging = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user.password, password);

    if (!user) return next(errorHandler(404, "User not found"));

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) return next(errorHandler(400, "Invalid password"));

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    const { password: pass, ...rest } = user._doc;

    emitToAll("user_logged_in", { userId: user._id });
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 48 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: rest,
      });

    console.log(`${user} is found`);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

//log out ;

export const logout = async (req, res, next) => {
  try {
    if (req.user) {
      emitToUser(req.user.id, "user_logged_out", {
        userId: req.user.id,
        status: "offline",
      });
    }
    res.clearCookie("access_token").status(200).json({
      message: "User has been sign out",
    });
  } catch (error) {
    next(error);
  }
};

//get users
export const getUsers = async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(errorHandler(401, "You are not allowed to see all the users"));
  }

  try {
    // queries
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sortDirection === "asc" ? 1 : -1;

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: sort })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    // last month users

    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    emitToAll("admin_users_fetched", {
      adminId: req.user.id,
    });

    res.status(200).json({
      users,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

// get user by id  :
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(errorHandler(401, "user not found"));
    }
    const { password, ...rest } = user._doc;

    emitToUser("user_by_id", { userId: user._id });
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//update user
export const updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { email, username, password, avatar } = req.body;

  if (req.user.id !== userId) {
    return next(
      errorHandler(403, "You are not allowed to update this profile")
    );
  }

  // password :
  let hashPass;
  if (password) {
    if (password.length < 10) {
      return next(errorHandler(400, "password must be at least 10 characters"));
    }
    hashPass = await bcrypt.hash(password, 10);
  }
  //username :
  if (username) {
    
    if (username.length < 7 || username.length > 18) {
      return next(
        errorHandler(400, "username must be between 7 and 16 characters.")
      );
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "username must be in lowerCase"));
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "username can not contain spaces"));
    }
    if (!username.match(/^[a-z0-9]+$/)) {
      return next(errorHandler(400, "username can only contain letters and numbers"));
    }
  }
  // email : 
    if(email && !validator.isEmail(email)){
      return next(errorHandler(400, 'Invalid email'))
    }
  

  // profile image :
  if (avatar && !avatar.startsWith('http')) {
      return next(errorHandler(400, "Invalide image URL"));
    }
  
  try {
    if(email) {
       const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return next(errorHandler(400, "Email already in use"));
      }
    }

     if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return next(errorHandler(400, "Username already taken"));
      }
    }

    const updateFields = {
      ...(email && { email }) ,
      ...(username && { username }),
      ...(avatar && { avatar }) ,
      ...(hashPass && {password: hashPass})
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields } ,
      { new: true, runValidators: true }
    );

    emitToAll("profile updated", { userId });

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      message: "user updated successfully.",
      user: rest,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Username or email already exists"));
    }
    next(error);
  }
};

//delete user :
export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  const isAdmin = req.user.isAdmin;
  const isOwner = req.user.id !== userId;

  if (!isAdmin && !isOwner) {
    return next(errorHandler(401, "you re not allowed to delete this account"));
  }

  try {
    await User.findByIdAndDelete(userId);

    emitToUser(userId, "account_deleted", {
      message: "your account has been deleted",
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signInGoogle = async (req, res, next) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email})
        
        if(user){
          sendTokenResponse(res, user, 200, "google_sign_in")
        } else {
          const username = req.body.name.toLowerCase().replace(/\s+/g, '') + Math.random().toString(36).slice(-4);
          const avatar = req.body.googlePic
          const genPass = Math.random().toString(36).slice(-8);
          const hashPass = bcrypt.hashSync(genPass, 10);

          const newUsser = new User({
            username,
            email,
            password: hashPass,
            avatar
          })
          await newUsser.save();
          sendTokenResponse(res, newUsser, 201, "google_sign_up")
        }
    }catch (error) {
      next(error)
    }

}
