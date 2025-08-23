import React from "react";

type Props = {
    // Receives a react element or list of react elements
    content: React.ReactNode,
    title: string
}

// Renders a title and content inside a large box to display information for the user
export default function BoxLarge({content, title}: Props) {
    return (
        <>
            <div className="boxLarge h-auto p-[2rem]">
                <h2 className="pb-[1rem] lg:text-4xl sm:text-3xl text-2xl">{title}</h2>
                {content}
            </div>
        </>
    )
}