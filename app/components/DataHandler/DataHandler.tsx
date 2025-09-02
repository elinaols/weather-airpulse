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
	It also passes the current city to child components
*/
export default function DataHandler({showCurrentWeather, showForecastWeather}: Props) {
	// Contains the sanitized input that is used for the API request
	const [newCity, setNewCity] = useState("stockholm")

	return (
		<>
			<ErrorHandler
				reset={() => {
					setNewCity("stockholm")
				}}>
				{/* Conditionally renders CurrentWeather or ForecastWeather components based on props, passing down 'city' and 'userInput' dynamically */}
				{showCurrentWeather ? (
					<>
						<CurrentWeather city={newCity} />
						<div className="w-[95%] sm:w-full pb-8">
							<SearchForm setNewCity={setNewCity}/>
						</div>
					</>
				) : showForecastWeather ? (
					<>
						<div className="w-[95%] sm:w-full pb-8">
							<SearchForm setNewCity={setNewCity}/>
						</div>
						<Forecast city={newCity}/>
					</>
				) : null}
			</ErrorHandler>
		</>
	)
}
