import React from "react"
import Link from "next/link"
import appStore from "../../../public/appStore.webp"
import googlePlay from "../../../public/googlePlay.webp"
import linkedin from "../../../public/linkedin.webp"
import Image from "next/image"

/*
    This footer displays navigation links, copyright text and icons for Linkedin, App Store and Google Play. 
    It's also reused across all routes.
*/
export default function Footer() {
	return (
		<>
			<div className="w-full grid grid-cols-3 items-center py-16 px-10 sm:px-16 gap-y-8 footer">
				<div className="flex gap-8 col-span-3 font-semibold justify-center sm:justify-start">
					<Link href={"/"} className="transform scale-100 hover:scale-105 transition-transform duration-200">
						Airpulse
					</Link>
					<Link
						href={"/forecastWeather"}
						className="transform scale-100 hover:scale-105 transition-transform duration-200">
						Forecast
					</Link>
					<Link
						href={"/aboutUs"}
						className="transform scale-100 hover:scale-105 transition-transform duration-200">
						About us
					</Link>
				</div>
				<div className="col-span-3 w-[95%] mx-auto border-b-1 border-solid border-gray-600 flex self-center"></div>
				<div className="col-span-3 sm:col-span-2 text-center sm:text-start">
					<p>©2025 Airpulse. All rights reserved.</p>
				</div>
				<div className="flex justify-center sm:justify-end gap-8 col-span-3 sm:col-span-1">
					<Link
						href="https://www.flaticon.com/free-icons/linkedin"
						title="linkedin icons"
						className="transform scale-100 hover:scale-105 transition-transform duration-200">
						<Image
							src={linkedin}
							alt="Social icon for the companys linkedin page"
							width={"30"}
							height={"30"}
						/>
					</Link>
					<Link
						href="https://www.flaticon.com/free-icons/app"
						title="app icons"
						className="transform scale-100 hover:scale-110 transition-transform duration-200">
						<Image src={appStore} alt="Icon for App Store" width={"30"} height={"30"} />
					</Link>
					<Link
						href="https://www.flaticon.com/free-icons/google-play"
						title="google play icons"
						className="transform scale-100 hover:scale-110 transition-transform duration-200">
						<Image src={googlePlay} alt="Icon for Google Play" width={"30"} height={"30"} />
					</Link>
				</div>
			</div>
		</>
	)
}
