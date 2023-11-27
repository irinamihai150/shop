import React, { useState, useEffect } from "react"
import zxcvbn from "zxcvbn"

function CheckPassword({ password }) {
	const [errorMessage, setErrorMessage] = useState("")

	const validate = (value) => {
		const passwordStrength = zxcvbn(value)
		if (passwordStrength.score < 3) {
			setErrorMessage("")
		} else {
			setErrorMessage("")
		}
	}

	useEffect(() => {
		console.log("Password prop in useEffect:", password)
		validate(password)
	}, [password])

	console.log("Render - Password value:", password)

	return (
		<div>
			{errorMessage === "" ? null : (
				<span
					style={{
						fontWeight: "bold",
						color: "red",
					}}
				>
					{errorMessage}
				</span>
			)}
		</div>
	)
}

export default CheckPassword
