"use client"
import React, {useState, useEffect} from "react"
import SearchForm from "../SearchForm/SearchForm"
import CurrentWeather from "../CurrentWeather/CurrentWeather"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import Forecast from "../ForecastWeather/ForecastWeather"
import Background from "../Background/Background"

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
	const [lastCity, setLastCity] = useState<string | null>(null)
	const [weatherCondition, setWeatherCondition] = useState<string>('')
	
	// On initial render, retrieve the last searched city from localStorage and set it in state
	useEffect(() => {
		const city = localStorage.getItem('lastCity')

		if (city) {
			setLastCity(city)
			setNewCity(city)
		}
	}, [])

	return (
		<>
			<ErrorHandler
				reset={() => {
					setNewCity("stockholm")
					setUserInput("")
				}}>

				<Background weather={weatherCondition}/>

				{/* Conditionally renders CurrentWeather or ForecastWeather components based on props, passing down 'city' and 'userInput' dynamically */}
				{showCurrentWeather ? (
					<>
						<CurrentWeather city={newCity} userInput={userInput} lastCity={lastCity} setWeatherCondition={setWeatherCondition} />
						<div className="w-[95%] sm:w-full pb-8">
							<SearchForm setNewCity={setNewCity} setUserInput={setUserInput} />
						</div>
					</>
				) : showForecastWeather ? (
					<>
						<div className="w-[95%] sm:w-full pb-8">
							<SearchForm setNewCity={setNewCity} setUserInput={setUserInput} />
						</div>
						<Forecast city={newCity} userInput={userInput} lastCity={lastCity} setWeatherCondition={setWeatherCondition}/>
					</>
				) : null}
			</ErrorHandler>
		</>
	)
}
