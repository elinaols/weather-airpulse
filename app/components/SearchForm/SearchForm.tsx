'use client'
import React, { useState } from "react"
import Button from "../Button/Button"

type Props = {
    setNewCity: (city: string) => void,
    setUserInput: (input: string) => void,
}

// TODO: Create a global state with React Context that holds the city, to be able to have the same background while navigating

export default function SearchForm({setNewCity, setUserInput}: Props) {
    // Holds the active value of the user's input to allow React to control and track the input
    const [city, setCity] = useState('')
    // If error occurs will an error message be displayed to inform the user
    const [error, setError] = useState('')

    // Capitalizes the first letter of a string
    const capatilize = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    
    const handleSearch = (submit: React.FormEvent<HTMLFormElement>) => {
        // Prevent submitting the form to have the possibility to check the user input first
        submit.preventDefault()

        // Checks if city is empty to prevent errors from the API request
        if (!city) return setError('Enter value in the input field')
        
        // Replaces special characters to prevent error and potential harmful code
        const cleanedStr = city.replace(/[&\/\\#,+()$~%.!'":*?<>{}]/g, '')
        setUserInput(capatilize(cleanedStr))
        
        // Replaces characters to prevent error when making the API request
        const cleanCityStr = city.replace(/[åäÅÄ]/g, 'a').replace(/[ö]/g, 'o')
        setNewCity(capatilize(cleanCityStr))
        
        // Resets the states to allow the user to input a new value
        setCity('')
        setError('')
    }
    
    return (
        <div className="flex justify-center">
            {/* Form that allows users to search for a city's weather, handling the input and submission process to fetch weather data */}
            <form onSubmit={handleSearch} className="searchForm inline-flex flex-col py-[2.9rem] sm:py-[3.3rem] px-8 sm:px-10 md:px-15 lg:px-20 gap-7 h-auto">
                <h2 className="text-center lg:text-4xl font-medium pb-0.5 sm:text-3xl text-2xl">Search for a city´s weather</h2>
                <div className="w-full flex justify-center flex-col sm:flex-row gap-2">
                    {/* Updates the state with the users input, which later will be used for the API request */}
                    <input type="text" value={city} onChange={(city) => setCity(city.target.value)} name="cityName" placeholder="Enter a city" className="w-full sm:w-[78%] p-[0.4rem] sm:p-[0.6rem] mb-2 sm:mb-1 self-center rounded-sm border border-gray-500"/>
                    <Button type="submit" text="Search"/>
                </div>
                {/* Displays an error message to inform the user about the error */}
                {error && <p className="text-red-600 italic">{error}</p>}
            </form>
        </div>
    )
}