import Footer from "./components/Footer"
import Header from "./components/Header"
import { Container } from "react-bootstrap"
function App() {
	return (
		<>
			<Header />
			<main className='py-3'>
				<Container>
					<p>hey</p>
				</Container>
			</main>
			<Footer />
		</>
	)
}

export default App
