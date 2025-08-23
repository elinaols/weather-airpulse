import type {Metadata} from "next"
import {Noto_Serif, Montserrat} from "next/font/google"
import "./globals.css"
import Header from "@/app/components/Header/Header"
import Footer from "@/app/components/Footer/Footer"

const noto = Noto_Serif({
	variable: "--font-title",
	subsets: ["latin"],
})

const mont = Montserrat({
	variable: "--font-body",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Airpulse",
	description: "Classic weather app where you can search for any city´s weather",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${noto.variable} ${mont.variable} antialiased`}>
				<Header />
				<main className="flex items-center flex-col flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
