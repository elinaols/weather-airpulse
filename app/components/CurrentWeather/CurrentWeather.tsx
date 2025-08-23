'use client'
import React, { useEffect, useState } from "react";
import Background from "../Background/Background";

type Props = {
    city: string,
    userInput: string
}

type Weather = {
    location: {name: string},
    current: {
        temp_c: number,
        feelslike_c: number,
        condition: {text: string},
        wind_kph: number
    }
}

export default function CurrentWeather({city, userInput}: Props) {
    const [weather, setCurrentWeather] = useState<Weather | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    /*
        Using useEffect to observe changes in the 'city'-prop. This holds the sanitized value from the search input and
        is used in the API request to fetch data about the weather
    */
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Set loading to true until the request is completed
                setLoading(true)
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=e59095ee21d54915a00195257251501&q=${city}`)
                const data: Weather = await response.json()
                console.log(data)
                setCurrentWeather(data) 
            } catch (e) {
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        }
        fetchWeather()
        // Making a new request whenever city changes
    }, [city])

    // If an error occurs a message will be displayed for the user
    if (error) return <p>Error: {error?.message}</p>

    // Converting kph to meter per second and rounds the result to two decimals
    const meterPerSec = (kph: number) => (0.27778 * kph).toFixed(2)
    
    /*
        Displays a loading message while the request is pending to inform the user that data is being retrieved.
        The background and the fetched data will be displayed once the request is completed
    */
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
            <div className="w-full grid grid-cols-2 gap-y-2 sm:gap-y-10 gap-x-16 pb-8">
                <h1 className="col-span-2 text-center text-[1.8rem] md:text-[2.6rem] sm:text-4xl lg:text-5xl font-semibold pb-[0.5rem] sm:pb-[1.5rem]">Current weather in {userInput || weather?.location.name}</h1>
                <div className="text-[5rem] flex justify-center flex-col items-center sm:items-end col-span-2 sm:col-span-1">
                    <p className="temperature text-[4rem] sm:text-[4.5rem] md:text-[5rem]">{weather?.current.temp_c}°C</p>
                </div>
                <div className="flex justify-center items-center sm:items-start flex-col col-span-2 sm:col-span-1">
                    <p className="pb-[1rem]">Feels like {weather?.current.feelslike_c}°C</p>
                    <p className="pb-[1rem]">{weather?.current.condition.text}</p>
                    {weather && <p className="pb-[1rem]">Wind is {meterPerSec(weather?.current.wind_kph)} m/s</p>}
                </div>
                <Background weather={weather?.current.condition.text}/>
            </div>
            )}
        </>
    )
}