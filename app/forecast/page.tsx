import React from "react";
import DataHandler from "../components/DataHandler/DataHandler";

// Renders the forecast page with the forecastWeather and searchForm component
export default function Forecast() {
    return (
        <>
            <div className="px-2 pb-[5rem] h-full flex flex-col w-full">
                <DataHandler showForecastWeather={true}/>
            </div>
        </>
    )
}