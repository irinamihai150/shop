import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"
//desc fetch all products
//route GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 8
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: "i" } }
		: {}
	const count = await Product.countDocuments({ ...keyword })

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({
		products,
		page,
		pages: Math.ceil(count / pageSize),
	})
})

//desc fetch  product by id
//route GET /api/products/:id

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		return res.json(product)
	} else {
		res.status(404)
		throw new Error("Resource not found")
	}
})
// create a product
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample description",
	})
	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})
// update a product
// put/api/products/:id
//private/admin

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, image, brand, category, countInStock, description } =
		req.body

	try {
		const product = await Product.findById(req.params.id)
		console.log("Received Product ID:", req.params.id)

		console.log("Received Product ID:", req.params.id)
		if (product) {
			console.log("Updating product with the following data:", {
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
			product.name = name
			product.price = price
			// product.image = image
			if (image !== undefined) {
				product.image = image
			}
			product.brand = brand
			product.category = category
			product.countInStock = countInStock
			product.description = description

			const updatedProduct = await product.save()
			console.log("Updated Product:", updatedProduct)
			res.json(updatedProduct)
		} else {
			res.status(404)
			throw new Error("Resource not found")
		}
	} catch (error) {
		res.status(500).json({ error: "Server error" })
	}
})

//delete a product
//delete /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await Product.deleteOne({ _id: product._id })
		res.status(200).json({ message: "Product deleted successfully" })
	} else {
		res.status(404)
		throw new Error("Product not found")
	}
})

// create a new review
// POST /api/products/:id/reviews
// const createProductReview = asyncHandler(async (req, res) => {
// 	try {
// 		const { rating, comment } = req.body

// 		console.log("Before creating review. User Info:", req.user)
// 		if (!req.user.isAdmin) {
// 			console.log("User does not have admin rights. Sending 401 Unauthorized.")
// 			res.status(401)
// 			throw new Error("Not authorized as admin")
// 		}

// 		const product = await Product.findById(req.params.id)

// 		if (product) {
// 			console.log("Product found:", product)

// 			const alreadyReviewed = product.reviews.find(
// 				(review) => review.user.toString() === req.user._id.toString()
// 			)

// 			if (alreadyReviewed) {
// 				console.log("Product already reviewed.")
// 				res.status(400)
// 				throw new Error("Product already reviewed")
// 			}

// 			const review = {
// 				name: req.user.name,
// 				rating: Number(rating),
// 				comment,
// 				user: req.user._id,
// 			}

// 			product.reviews.push(review)
// 			product.numReviews = product.reviews.length

// 			product.rating =
// 				product.reviews.reduce((acc, review) => acc + review.rating, 0) /
// 				product.reviews.length

// 			await product.save()
// 			console.log("Review added successfully. Sending 201 Created.")
// 			res.status(201).json({ message: "Review added" })
// 		} else {
// 			console.log("Product not found. Sending 404 Not Found.")
// 			res.status(404)
// 			throw new Error("Resource not found")
// 		}
// 	} catch (error) {
// 		console.error("Error in createProductReview:", error.message)
// 		res.status(res.statusCode || 500).json({ message: error.message })
// 	}
// })

const createProductReview = asyncHandler(async (req, res) => {
	try {
		const { rating, comment } = req.body

		console.log("Before creating review. User Info:", req.user)

		const product = await Product.findById(req.params.id)

		console.log("Product found:", product)

		if (!product) {
			console.log("Product not found. Sending 404 Not Found.")
			res.status(404)
			throw new Error("Resource not found")
		}

		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		)

		console.log("Already reviewed:", alreadyReviewed)

		if (alreadyReviewed) {
			console.log("Product already reviewed. Sending 400 Bad Request.")
			res.status(400)
			throw new Error("Product already reviewed")
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)
		product.numReviews = product.reviews.length

		product.rating =
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
			product.reviews.length

		await product.save()
		console.log("Review added successfully. Sending 201 Created.")
		res.status(201).json({ message: "Review added" })
	} catch (error) {
		console.error("Error in createProductReview:", error.message)
		res.status(res.statusCode || 500).json({ message: error.message })
	}
})

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
}
