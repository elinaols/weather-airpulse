export type WeatherForecast = {
    location: {name: string},
    current: {
        condition: {text: string}
    },
    forecast: {
        forecastday: WeatherDay[]
    }
}

export type WeatherDay = {
    date: string,
    day: {
        avgtemp_c: number,
        mintemp_c: number,
        maxtemp_c: number,
        totalprecip_mm: number,
        maxwind_mph: number,
        avghumidity: number,
        avgvis_km: number,
        condition: {
            icon: string,
            text: string
        }
    }
    hour: WeatherHour[]
}

export type WeatherHour = {
    pressure_mb: number,
    cloud: number
}