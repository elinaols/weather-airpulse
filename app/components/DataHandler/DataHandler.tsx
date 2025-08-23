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
    The component uses a ErrorHandler-component to display an error message if any errors occur during the API request
    and it also provides the components with the new city and users input.
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
				{/* 
					The component receives two props that control the visibility of the components and each component
					dynamically receives values from the 'city' and 'userInput' variables. 
				*/}
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
