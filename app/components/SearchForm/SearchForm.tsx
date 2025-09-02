"use client"
import React, {useState} from "react"
import Button from "../Button/Button"

type Props = {
	setNewCity: (city: string) => void
}

export default function SearchForm({setNewCity}: Props) {
	// Holds the active value of the user's input to allow React to control and track the input
	const [city, setCity] = useState("")
	// Stores an error message to inform the user if the input is invalid
	const [error, setError] = useState("")

	// Capitalizes the first letter of a string for consistent formatting
	const capatilize = (str: string): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "")

	const handleSearch = (submit: React.FormEvent<HTMLFormElement>) => {
		// Prevent default form submission to validate input before sending the API request
		submit.preventDefault()

		// Checks if city is empty to avoid sending invalid requests
		if (!city) return setError("Enter value in the input field")

		// Replaces special swedish characters for API compatibility
		const cleanCityStr = city.replace(/[åäÅÄ]/g, "a").replace(/[ö]/g, "o")
		setNewCity(capatilize(cleanCityStr))

		// Resets input and error states to allow the user to enter a new value
		setCity("")
		setError("")
	}

	return (
		<div className="flex justify-center">
			{/* Form for searching a city's weather and managing user input */}
			<form
				onSubmit={handleSearch}
				className="searchForm inline-flex flex-col py-[2.9rem] sm:py-[3.3rem] px-8 sm:px-10 md:px-15 lg:px-20 gap-7 h-auto">
				<h2 className="text-center lg:text-4xl font-medium pb-0.5 sm:text-3xl text-2xl">
					Search for a city´s weather
				</h2>
				<div className="w-full flex justify-center flex-col sm:flex-row gap-2">
					{/* Updates the state with the users input, which will be used in the API request */}
					<input
						type="text"
						value={city}
						onChange={(city) => setCity(city.target.value)}
						name="cityName"
						placeholder="Enter a city"
						className="w-full sm:w-[78%] p-[0.4rem] sm:p-[0.6rem] mb-2 sm:mb-1 self-center rounded-sm border border-gray-500"
					/>
					<Button type="submit" text="Search" />
				</div>
				{/* Displays an error message to inform the user about the error */}
				{error && <p className="text-red-600 italic">{error}</p>}
			</form>
		</div>
	)
}
