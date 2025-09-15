'use client'
import React, { useEffect, useState } from "react";
import { WeatherForecast } from "@/app/types/types";
import WeatherCard from "../WeatherCard/WeatherCard";
import { ErrorFallback } from "../ErrorHandler/ErrorHandler";

type Props = {
    city: string,
    userInput: string
    lastCity: string | null
    setWeatherCondition: (condition: string) => void
}

export default function Forecast({city, userInput, lastCity, setWeatherCondition}: Props) {
    const [forecastWeather, setForecastWeather] = useState<WeatherForecast | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [validInput, setValidInput] = useState<string|null>(lastCity || null)

    // Fetches forecast data whenever the 'city'-prop changes. The prop contains the sanitized value from the search input
    useEffect(() => {
        const fetchForecastWeather = async () => {
            try {
                // Set loading to true until the request is completed
                setLoading(true)

                // cleans string (if it's from localStorage) for correct api request
                const cleanCityStr = city.replace(/[åäÅÄ]/g, "a").replace(/[ö]/g, "o")
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e59095ee21d54915a00195257251501&q=${cleanCityStr}&days=14`)
                
                const data: WeatherForecast | {error: {code: number; message: string} } = await response.json()
                console.log(data)
                
                if ("error" in data) throw new Error(data.error.message)

                setForecastWeather(data)

                if (userInput.trim()) {
                    setValidInput(userInput)
                    localStorage.setItem('lastCity', userInput)
                    localStorage.setItem('lastWeather', data.current.condition.text)
                    setWeatherCondition(data.current.condition.text)
                } 
            } catch (e) {
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        }
        fetchForecastWeather()
        // Triggers a new API request whenever 'city' changes
    }, [city, userInput, setWeatherCondition])
    
    // Displays error message if the API request fails
    if (error) return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)}/>

    const forecastDays = forecastWeather?.forecast.forecastday || []

    const displayCity = error 
    ? lastCity
    : validInput ?? forecastWeather?.location.name 

    /*
        Displays a loading message while the request is pending to inform the user that data is being retrieved.
    */
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-[95%] px-[0.4rem] grid grid-cols-1 md:grid-cols-3 gap-6">
                    <h2 className="md:col-span-3 lg:text-4xl sm:text-3xl text-2xl py-[1rem]">Next 3 days weather in {displayCity}</h2>
                    {/* 
                        Checks if the array exists and is not empty to ensure that the component doesn't attempt to iterate over an empty 
                        or non-existing array. Once the condition is fulfilled the map()-function will iterate over the fetched array.
                    */}
                    {forecastDays && forecastDays.length > 0 && (
                        forecastDays.map((day, index) => (
                            <WeatherCard key={index} day={day}/>
                        )
                    ))}
                </div>
            )}
        </>
    )
}
