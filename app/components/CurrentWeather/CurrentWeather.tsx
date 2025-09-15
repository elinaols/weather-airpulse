"use client"
import React, {useEffect, useState} from "react"
import {Spinner} from "@heroui/spinner"
import { ErrorFallback } from "../ErrorHandler/ErrorHandler"

type Props = {
	city: string
	userInput: string
	lastCity: string | null
	setWeatherCondition: (condition: string) => void
}

type Weather = {
	location: {name: string}
	current: {
		temp_c: number
		feelslike_c: number
		condition: {text: string}
		wind_kph: number
	}
}

export default function CurrentWeather({city, userInput, lastCity, setWeatherCondition}: Props) {
	const [weather, setCurrentWeather] = useState<Weather | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	// Fetches weather data whenever the 'city' prop changes. The prop holds the sanitized value from the search input
	useEffect(() => {
		const fetchWeather = async () => {
			try {
				// Set loading to true until the request is completed
				setLoading(true)

				const cleanCityStr = city.replace(/[åäÅÄ]/g, "a").replace(/[ö]/g, "o")
				const response = await fetch(
					`https://api.weatherapi.com/v1/current.json?key=e59095ee21d54915a00195257251501&q=${cleanCityStr}`
				)

				const data: Weather | {error: {code: number; message: string}} = await response.json()
				console.log(data)

				if ("error" in data) throw new Error(data.error.message)

				setCurrentWeather(data)

				if (userInput.trim() && !error) {
					localStorage.setItem('lastCity', userInput)
					setWeatherCondition(data.current.condition.text)
					localStorage.setItem('lastWeather', data.current.condition.text)				
				}
			} catch (e) {
				setError(e as Error)
			} finally {
				setLoading(false)
			}
		}
		fetchWeather()
	}, [city, userInput, setWeatherCondition])

	// Displays an error message if the request fails
	if (error) return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)}/>

	// Converting kph to meter per second and rounds the result to two decimals
	const meterPerSec = (kph: number) => (0.27778 * kph).toFixed(2)

	// Shows a loading message while fetching data and displaying the content once the request completes
	return (
		<>
			{loading ? (
				<Spinner classNames={{label: "text-foreground mt-4"}} label="gradient" variant="gradient" />
			) : (
				<div className="w-full grid grid-cols-2 gap-y-2 sm:gap-y-10 gap-x-16 pb-8">
					<h1 className="col-span-2 text-center text-[1.8rem] md:text-[2.6rem] sm:text-4xl lg:text-5xl font-semibold pb-[0.5rem] sm:pb-[1.5rem]">
						Current weather in {lastCity ?? weather?.location.name}
					</h1>
					<div className="text-[5rem] flex justify-center flex-col items-center sm:items-end col-span-2 sm:col-span-1">
						<p className="temperature text-[4rem] sm:text-[4.5rem] md:text-[5rem]">
							{weather?.current.temp_c}°C
						</p>
					</div>
					<div className="flex justify-center items-center sm:items-start flex-col col-span-2 sm:col-span-1">
						<p className="pb-[1rem]">Feels like {weather?.current.feelslike_c}°C</p>
						<p className="pb-[1rem]">{weather?.current.condition.text}</p>
						{weather && <p className="pb-[1rem]">Wind is {meterPerSec(weather?.current.wind_kph)} m/s</p>}
					</div>
				</div>
			)}
		</>
	)
}
