"use client"
import React, {useState} from "react"
import SearchForm from "../SearchForm/SearchForm"
import CurrentWeather from "../CurrentWeather/CurrentWeather"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import Forecast from "../ForecastWeather/ForecastWeather"

type Props = {
	showCurrentWeather?: boolean
	showForecastWeather?: boolean
}

/* 
    Wraps child components in an ErrorHandler to display errors from API requests. 
	It also passes the current city and user input to child components
*/
export default function DataHandler({showCurrentWeather, showForecastWeather}: Props) {
	// Contains the sanitized input that is used for the API request
	const [newCity, setNewCity] = useState("stockholm")
	// Contains the sanitized input from the user that views on the screen
	const [userInput, setUserInput] = useState("")

	return (
		<>
			<ErrorHandler
				reset={() => {
					setNewCity("stockholm")
					setUserInput("")
				}}>
				{/* Conditionally renders CurrentWeather or ForecastWeather components based on props, passing down 'city' and 'userInput' dynamically */}
				{showCurrentWeather ? (
					<>
						<CurrentWeather city={newCity} userInput={userInput} />
						<div className="w-[95%] sm:w-full pb-8">
							<SearchForm setNewCity={setNewCity} setUserInput={setUserInput} />
						</div>
					</>
				) : showForecastWeather ? (
					<>
						<div className="w-[95%] sm:w-full pb-8">
							<SearchForm setNewCity={setNewCity} setUserInput={setUserInput} />
						</div>
						<Forecast city={newCity} userInput={userInput} />
					</>
				) : null}
			</ErrorHandler>
		</>
	)
}
