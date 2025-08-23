import React, { useEffect, useState } from "react";

type Props = {
    weather?: string
}

export default function Background({weather}: Props) {
    // Sets a default value in case an error has occurred with the API request
    const [background, setBackground] = useState('#6991ff, #bbd3ff')
    
    /* 
        Using useEffect to detect changes in the 'weather'-prop, which holds values from two different API requests. 
        The switch function is used to compare the weather value with different cases to set the background.
    */
    useEffect(() => {
        const w = weather?.toLowerCase() ?? '#6991ff, #bbd3ff'
        switch (w) {
            case 'sunny':
                setBackground('#fffbd8,#fff6a0')
                break;
            case 'torrential rain shower':
            case 'heavy rain':
                setBackground('#c7c7c7,#a5a5a5')
                break;
            case 'clear':
                setBackground('#eff3ff,#90b9ff')
                break;
            case 'moderate snow':
            case 'light snow':
            case 'blizzard':
            case 'heavy snow':
            case 'snow':
                setBackground('#b9faff,#77f6ff')
                break;
            case 'moderate or heavy snow with thunder':
            case 'patchy light rain with thunder':
            case 'moderate or heavy rain with thunder':
            case 'thunder':
                setBackground('#b885b8, #a5a5a5')
                break;
            case 'partly cloudy':
                setBackground('#d7e7ff,#d8d8d8')
                break;
            default:
                setBackground('#e9e9e9,#cacaca')
        }
    // The background updates whenever any of the variables change
    }, [weather])
    // Sets the background to get a linear gradient background
    document.body.style.background = `linear-gradient(${background})`
    // Using an empty return to avoid displaying unnecessary elements
    return (<></>)
}