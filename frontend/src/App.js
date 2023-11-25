import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/Footer"
import Header from "./components/Header"

function App() {
	const appStyle = {
		backgroundImage: `url(/images/background.jpg)`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	}

	return (
		<div style={appStyle}>
			<Header />
			<main className='py-2'>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
			<ToastContainer />
		</div>
	)
}

export default App
