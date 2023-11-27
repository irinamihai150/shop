import React, { useState, useEffect } from "react"
import validator from "validator"

function CheckPassword({ password }) {
	const [errorMessage, setErrorMessage] = useState("")

	const validate = (value) => {
		if (
			value &&
			validator.isStrongPassword(value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			setErrorMessage("Is a strong password")
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
