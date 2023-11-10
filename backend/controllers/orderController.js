import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"

//desc create new orders
//route GET /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
	res.send("add order items")
})

//desc get logged in user orders
//route GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
	res.send("get my orders")
})

//desc get order by id
//route GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
	res.send("add order items")
})

//desc update order to paid
//route GET /api/orders/:id/paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
	res.send("update order to paid")
})

//desc update order to deliver
//route GET /api/orders/:id/deliver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	res.send("update order to delivered")
})

//desc get all orders
//route GET /api/orders
//admin
const getOrders = asyncHandler(async (req, res) => {
	res.send("get  all orders")
})

export {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToDelivered,
	updateOrderToPaid,
	getOrders,
}
