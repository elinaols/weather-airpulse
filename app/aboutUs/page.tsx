import React, { useEffect, useState } from "react"
import BoxLarge from "../components/BoxLarge/BoxLarge"
import BoxSmall from "../components/BoxSmall/BoxSmall"
import {aboutContent} from "../content/aboutContent"
import Background from "../components/Background/Background"

export default function AboutUs() {
	const [weather, setWeather] = useState<string | null>(null)
	
	useEffect(() => {
		setWeather(localStorage.getItem('lastWeather') || null)
	}, [])

	/*
        Mapping over the text array of each section and rendering each line as a separate <p>-element with padding
    */
	return (
		<>
			<div className="py-[5rem] px-2 h-full w-full flex items-center justify-center flex-col lg:flex-row gap-[3rem]">
				<div className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[55%] rounded-sm">
					<BoxLarge
						content={aboutContent.main.text.map((line, index) => (
							<p className="pb-[0.6rem]" key={index}>
								{line}
							</p>
						))}
						title={aboutContent.main.title}
					/>
				</div>
				<div className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[28%] flex justify-between flex-col sm:flex-row lg:flex-col rounded-sm gap-[3rem] sm:gap-8 lg:gap-3">
					<BoxSmall
						content={aboutContent.job.text.map((line, index) => (
							<p className="pb-[0.6rem]" key={index}>
								{line}
							</p>
						))}
						title={aboutContent.job.title}
					/>
					<BoxSmall
						content={aboutContent.contact.text.map((line, index) => (
							<p className="pb-[0.6rem]" key={index}>
								{line}
							</p>
						))}
						title={aboutContent.contact.title}
					/>
				</div>
				<Background weather={weather}/>
			</div>
		</>
	)
}
