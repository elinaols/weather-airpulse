import React from "react"

type Props = {
	// Receives a react element or list of react elements
	content: React.ReactNode
	title: string
}

export default function InfoboxSmall({content, title}: Props) {
	return (
		<div className="h-auto p-[2rem] boxSmall">
			<h3 className="pb-[0.5rem] text-lg sm:text-xl">{title}</h3>
			{content}
		</div>
	)
}
