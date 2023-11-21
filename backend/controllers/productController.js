import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"
//desc fetch all products
//route GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	res.json(products)
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
export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
}
