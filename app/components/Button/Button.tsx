import React from "react"

type Props = {
	type: "button" | "submit" | "reset"
	text: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// Receives the different props to set the behavior and content of the button
export default function Button({type, text, onClick}: Props) {
	return (
		<>
			<button
				type={type}
				onClick={onClick}
				className="bg-(--black) text-(--text-white) hover:cursor-pointer hover:bg-[var(--hover-gray)] self-center mb-1 p-[0.5rem] sm:p-[0.6rem] rounded-sm button">
				{text}
			</button>
		</>
	)
}
