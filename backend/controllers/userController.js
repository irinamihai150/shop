import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"

//desc auth user and get token
//route GET /api/users/login
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error("Invalid email or password")
	}
})

//desc register user
//route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
	res.send("register user")
})

//desc logout user/ clear cookie
//route POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
	res.send("logout user")
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
