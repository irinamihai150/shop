import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { FaArrowUp } from "react-icons/fa"

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false)

	// Show the button when the user scrolls down 100 pixels
	const handleScroll = () => {
		if (window.scrollY > 100) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	// Scroll to the top when the button is clicked
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	// Add scroll event listener on mount
	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])
	return (
		<div>
			<Button
				variant='light'
				className={`scroll-to-top-btn ${isVisible ? "visible" : "hidden"}`}
				onClick={scrollToTop}
			>
				<FaArrowUp />
			</Button>
		</div>
	)
}

export default ScrollToTopButton
