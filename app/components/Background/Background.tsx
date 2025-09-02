'use client'
import React, {useEffect, useState} from "react"

type Props = {
	weather?: string
}

export default function Background({weather}: Props) {
	// Initialize background state with the last saved gradient from localStorage or use a default gradient if none is found
	const [background, setBackground] = useState<string>(localStorage.getItem('lastWeather') || "#6991ff, #bbd3ff")

	/* 
        Using useEffect to detect changes in the 'weather'-prop, which holds values from two different API requests. 
        The switch statement compares the weather value with different cases to set the background gradient accordingly
    */
	useEffect(() => {
		if (!weather) return

		const w = weather.toLowerCase()
		let newBg = background

		switch (w) {
			case "sunny":
				newBg = "#fffbd8,#fff6a0"
				break
			case "torrential rain shower":
			case "heavy rain":
				newBg = "#c7c7c7,#a5a5a5"
				break
			case "clear":
				newBg = "#eff3ff,#90b9ff"
				break
			case "moderate snow":
			case "light snow":
			case "blizzard":
			case "heavy snow":
			case "snow":
				newBg = "#b9faff,#77f6ff"
				break
			case "moderate or heavy snow with thunder":
			case "patchy light rain with thunder":
			case "moderate or heavy rain with thunder":
			case "thunder":
				newBg = "#b885b8,#a5a5a5"
				break
			case "partly cloudy":
				newBg = "#d7e7ff,#d8d8d8"
				break
			default:
				newBg = "#e9e9e9,#cacaca"
		}

		setBackground(newBg)
		localStorage.setItem('lastWeather', newBg)
		// Updates the background gradient whenever the 'weather'-prop changes
	}, [weather])
	
	// Sets the background to get a linear gradient background
	useEffect(() => {
		document.body.style.background = `linear-gradient(${background})`
	}, [background])
	
	// Doesn't render anything, only updates the background
	return null
}
