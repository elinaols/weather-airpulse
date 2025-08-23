"use client"
import React, { useEffect } from "react";
import BoxLarge from "../components/BoxLarge/BoxLarge";
import BoxSmall from "../components/BoxSmall/BoxSmall";
import { aboutContent } from "../content/aboutContent";

// Renders the forecast page with the forecastWeather and searchForm component
export default function AboutUs() {
    useEffect(() => {
        // Sets default background if none is applied when the page reloads
        if (!document.body.style.background) {
            document.body.style.background = `linear-gradient(#eff3ff,#90b9ff)`
        }
    }, [])

    /*
        Using map to iterate over the lines in each object and render them as separate <p>-tags
    */
    return (
        <>
            <div className="py-[5rem] px-2 h-full w-full flex items-center justify-center flex-col lg:flex-row gap-[3rem]">
                <div className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[55%] rounded-sm">
                    <BoxLarge content={aboutContent.main.text.map((line, index) => <p className="pb-[0.6rem]" key={index}>{line}</p>)} title={aboutContent.main.title} />
                </div>
                <div className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[28%] flex justify-between flex-col sm:flex-row lg:flex-col rounded-sm gap-[3rem] sm:gap-8 lg:gap-3">
                    <BoxSmall content={aboutContent.job.text.map((line, index) => <p className="pb-[0.6rem]" key={index}>{line}</p>)} title={aboutContent.job.title} />
                    <BoxSmall content={aboutContent.contact.text.map((line, index) => <p className="pb-[0.6rem]" key={index}>{line}</p>)} title={aboutContent.contact.title} />
                </div>
            </div>
        </>
    )
}