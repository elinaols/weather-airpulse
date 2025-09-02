'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Hamburger from "hamburger-react";

// Header component that provides consistent navigation and branding across all pages
export default function Header() {
    // Tracks the screen width to be able to control the hamburger menu layout
    const [open, setOpen] = useState<boolean>(false)
    // Tracks whether the screen width is below breakpoint to switch the navigation layout
    const [screenSize, setScreenSize] = useState<boolean>(false)
        
    useEffect(() => {
        // Dynamically updates screenSize so the navigation adapts to window resizing
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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