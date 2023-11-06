import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

//desc auth user and get token
//route GET /api/users/login
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		})

		//set jwt as http only cookie
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
		})
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			sameSite: "strict",
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		})
	} else {
		res.status(401)
		throw new Error("Invalid email or password")
	}
})

//desc register user
//route POST /api/users
const registerUser = asyncHandler(async (req, res) => {




	
})

//desc logout user/ clear cookie
//route POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	})
	res.status(200).json({ message: "Logged out successfully" })
})

//desc get user profile
//route GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
	res.send("user profile")
})

//desc update user profile
//route PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
	res.send("update user profile")
})

//desc get users
//route Get /api/users
const getUsers = asyncHandler(async (req, res) => {
	res.send("get users")
})

//desc get users by Id
//route Get /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
	res.send("get user by ID")
})

//desc delete users
//route Delete /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
	res.send("delete user")
})

//desc update user
//route PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
	res.send("update user")
})

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	getUserById,
	updateUserProfile,
	getUsers,
	updateUser,
	deleteUser,
}
