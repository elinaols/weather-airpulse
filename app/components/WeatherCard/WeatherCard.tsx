import {WeatherHour, WeatherDay} from "@/app/types/types"

type Props = {
	day: WeatherDay
}

export default function WeatherCard({day}: Props) {
	// Converting kph to meter per second and rounds the result to two decimals
	const meterPerSec = (kph: number) => (0.27778 * kph).toFixed(2)

	// Using reduce to sum the values in the array and then divide that sum by the length of the array to get the average.
	const averageValue = (array: WeatherHour[], key: keyof WeatherHour) => {
		/* 
            Using reduce to calculate a single value by summarizing all values from the array
            Using bracket notation to access the correct property value for each element
            Code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        */
		const sum = array.reduce((accumilator, currentValue) => accumilator + currentValue[key], 0)
		const avg = sum / array.length
		return Math.round(avg)
	}

	return (
		<div className="weatherCard p-3 sm:p-4 md:p-6">
			<div className="flex justify-between pb-3">
				<h3 className="text-lg sm:text-xl">{day.date}</h3>
				{/* eslint-disable @next/next/no-img-element */}
				<img src={day.day.condition.icon} alt="Weather icon" width={"60"} height={"60"} />
			</div>
			<div className="pb-3">
				<p>Temp: {day.day.avgtemp_c}°C</p>
				<p>Precip: {day.day.totalprecip_mm} mm</p>
				<p>Wind: {meterPerSec(day.day.maxwind_mph)} m/s</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
				<p>Min temp: {day.day.mintemp_c}°C</p>
				<p>Max temp: {day.day.maxtemp_c}°C</p>
				<p className="pb-3 sm:pb-0 md:pb-3">Humidity: {day.day.avghumidity} %</p>
				<p>Pressure: {averageValue(day.hour, "pressure_mb")} hPa</p>
				<p>Cloud: {averageValue(day.hour, "cloud")} %</p>
				<p>Visibility: {day.day.avgvis_km} km</p>
			</div>
		</div>
	)
}
