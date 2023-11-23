import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
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
	FormGroup,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
	useGetProductDetailsQuery,
	useCreateProductMutation,
} from "../slices/productsApiSlice"
import { addToCart } from "../slices/cartSlice"
import { toast } from "react-toastify"

const ProductScreen = () => {
	const { id: productId } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState("")

	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId)

	const [createReview, { isLoading: loadingProductReview }] =
		useCreateProductMutation()

	const { userInfo } = useSelector((state) => state.auth)
	console.log("User Info from Redux:", userInfo)

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }))
		navigate("/cart")
	}
	const submitHandler = async (e) => {
		e.preventDefault()

		try {
			console.log("Before submitting review:", { productId, rating, comment })
			await createReview({
				productId,
				rating,
				comment,
			}).unwrap()
			 console.log("Review submitted successfully")
			refetch()
			toast.success("Review Submitted")
			setRating(0)
			setComment("")
		} catch (err) {
			   console.error("Error submitting review:", err)
			toast.error(err?.data?.message || err.error)
		}
	}
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
				<>
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
								<ListGroupItem>
									Description: {product.description}
								</ListGroupItem>
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
													{product.countInStock > 0
														? "In Stock"
														: "Out Of Stock"}
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
											onClick={addToCartHandler}
										>
											Add to cart
										</Button>
									</ListGroupItem>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row className='review'>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{loadingProductReview && <Loader />}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating' className='my-2'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(Number(e.target.value))}
												>
													<option value=''>Select</option>
													<option value='1'>1- Poor</option>
													<option value='2'>2- Fair</option>
													<option value='3'>3-Good</option>
													<option value='4'>4-Very Good</option>
													<option value='5'>5-Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment' className='my-2'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingProductReview}
												type='submit'
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'></Link>sign in to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
