import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Message from "./Message"
import { useGetTopProductsQuery } from "../slices/productsApiSlice"

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery()

	return isLoading ? null : error ? (
		<Message variant='danger'>{error?.data?.message || error.error}</Message>
	) : (
		<Carousel pause='hover' className='bg-light mb-4'>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image
							style={{ width: "100%", maxWidth: "300px", margin: "auto" }}
							className='d-block w-100'
							src={product.image}
							alt={product.name}
						/>
						<Carousel.Caption className='carousel-caption'>
							<h2 className='text-white text-right'>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
