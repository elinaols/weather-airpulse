'use client'
import React, { useEffect, useState } from "react";
import Background from "../Background/Background";
import { WeatherForecast } from "@/app/types/types";
import WeatherCard from "../WeatherCard/WeatherCard";

type Props = {
    city: string,
    userInput: string
}

export default function Forecast({city, userInput}: Props) {
    const [forecastWeather, setForecastWeather] = useState<WeatherForecast | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    /*
        Using useEffect to observe changes in the 'city'-prop. This holds the sanitized value from the search input and
        is used in the API request to fetch data about the weather
    */
    useEffect(() => {
        const fetchForecastWeather = async () => {
            try {
                // Set loading to true until the request is completed
                setLoading(true)
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e59095ee21d54915a00195257251501&q=${city}&days=14`)
                const data: WeatherForecast = await response.json()
                console.log(data)
                setForecastWeather(data)
            } catch (e) {
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        }
        fetchForecastWeather()
        // When city updates a new request will be made to the API 
    }, [city])
    
    // Displays error message if an error occurs
    if (error) return <p>Error: {error?.message}</p>

    const forecastDays = forecastWeather?.forecast.forecastday || []

    /*
        Displays a loading message while the request is pending to inform the user that data is being retrieved.
        The background and the fetched data will be displayed once the request is completed
    */
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-[95%] px-[0.4rem] grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Background weather={forecastWeather?.current.condition.text}/>
                    <h2 className="md:col-span-3 lg:text-4xl sm:text-3xl text-2xl py-[1rem]">Next 3 days weather in {userInput || forecastWeather?.location.name}</h2>
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
