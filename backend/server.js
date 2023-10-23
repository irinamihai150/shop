import express from "express"

import productRoutes from "./routes/productRoutes.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import connectDB from "./config/db.js"

const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use(cors())
app.get("/", (req, res) => {
	res.send("Api is running at ...")
})

app.use("/api/products", productRoutes)
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})