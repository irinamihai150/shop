import { useState } from "react"
import { useParams } from "react-router-dom"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Form,
	Button,
	ListGroupItem,
} from "react-bootstrap"

import { useGetProductDetailsQuery } from "../slices/productsApiSlice"

const ProductScreen = () => {
	const [qty, setQty] = useState(1)
	const { id: productId } = useParams()
	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId)
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>
					{error?.data?.message || error.error}
					Hello
				</Message>
			) : (
				<Row>
					<Col md={5}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={4}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h3>{product.name}</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews}`}
								></Rating>
							</ListGroupItem>
							<ListGroupItem> Price: ${product.price} </ListGroupItem>
							<ListGroupItem> Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup>
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>
							</ListGroup>
							<ListGroup>
								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
												
														onChange={(e) => setQty(Number(e.target.value))}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
									>
										Add to cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
