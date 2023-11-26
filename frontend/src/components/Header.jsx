import { useNavigate } from "react-router-dom"
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../slices/usersApiSlice"
import { logout } from "../slices/authSlice"
import SearchBox from "./SearchBox"
import { resetCart } from "../slices/cartSlice"

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart)
	const { userInfo } = useSelector((state) => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [logoutApiCall] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			dispatch(resetCart())
			navigate("/login")
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<header>
			<Navbar
				bg='dark'
				variant='dark'
				expand='lg'
				collapseOnSelect
				className='custom-navbar'
				style={{ height: "150px" }}
			>
				<Container>
					<img
						src='/images/logo.jpg'
						alt='Chic Boutique Logo'
						height='100px'
						className='d-inline-block align-top rounded-circle logo '
					/>
					<LinkContainer to='/'>
						<Navbar.Brand className='text-warning custom-brand'>
							Chic Boutique
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<SearchBox />
							<LinkContainer to='/cart'>
								<Nav.Link className='text-warning'>
									<FaShoppingCart className='text-warning' />
									Cart
									{cartItems.length > 0 && (
										<Badge pill bg='success' style={{ marginLeft: "8px" }}>
											{cartItems.reduce((a, c) => a + c.qty, 0)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Log out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<FaUser />
										Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
