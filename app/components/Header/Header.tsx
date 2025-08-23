'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Hamburger from "hamburger-react";

// The header is used to display the company name, logo and navigation menu. It's also reused across all routes.
export default function Header() {
    // Initializes the state to toggle the visibility of the links in the hamburger menu
    const [open, setOpen] = useState<boolean>(false)
    // Initializes a state variable to keep track if the screen size 
    const [screenSize, setScreenSize] = useState<boolean>(false)
        
    useEffect(() => {
        // Updates the state based on the width of the window. The state is set to true if the screen is less or equal to 1000px
        const handleResize = () => setScreenSize(window.innerWidth <= 1024)

        handleResize()

        // The event listener helps to update the state when the window is resized
        window.addEventListener('resize', handleResize)

        // Removes the event listener when it's no longer needed after the screen size has changed
        return () => window.removeEventListener('resize', handleResize)
        
    // Ensures that the effect only runs once when the component is mounted and not on each update
    }, [])

    return (
        <div className="header grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_4fr] lg:grid-cols-[1fr_auto_1fr] px-4 py-2 items-center sticky top-0 z-10">
            <div className="text-lg text-start">
                <Link href={'/'} className="p-[1rem] font-semibold hover:border-b hover:border-gray-400">Airpulse</Link>
            </div>
            <div className="flex lg:justify-center">
                <img src="/sun.webp" alt="Logotype" className="slow-rotation h-[60px] w-[60px]"/>
            </div>
            <div className="navbar">
                <div className="flex justify-end lg:hidden">
                    {/* Fetched code from https://hamburger-react.netlify.app/ */}
                    <Hamburger toggled={open} toggle={setOpen} easing="ease-in-out" label="Show menu"/>
                </div>
                <ul className={`${open && screenSize ? 'flex flex-col' : 'hidden'} justify-end list-none lg:flex`}>
                    <li className="self-end"><Link className="sm:p-[1rem] font-semibold hover:border-b hover:border-gray-400" href={'/forecast'}>Forcast</Link></li>
                    <li className="self-end"><Link className="sm:p-[1rem] font-semibold hover:border-b hover:border-gray-400" href={'/aboutUs'}>About us</Link></li>
                </ul>
            </div>
        </div>
    )
}