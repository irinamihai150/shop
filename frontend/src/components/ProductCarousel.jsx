import React from "react"
import { Link } from "react-router-dom"
import { Carousel } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"
import { useGetTopProductsQuery } from "../slices/productsApiSlice"

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery()

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-light mb-4'>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Carousel.Caption className='carousel-caption'>
						<h2>
							{product.name} (${product.price})
						</h2>
						{/* <p>{product.description}</p> */}
					</Carousel.Caption>
					<Link to={`/products/${product._id}`}>
						<img
							style={{ width: "100%", maxWidth: "300px", margin: "auto" }}
							className='d-block w-100'
							src={product.image}
							alt={product.name}
						/>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
