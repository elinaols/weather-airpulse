import {ErrorBoundary, FallbackProps} from "react-error-boundary"
import Button from "../Button/Button"
/* 
    Provides a fallback UI with a button to reset the error state.
    Clicking the button allows the user to try submitting a new 'city' value
    Code adapted from https://www.npmjs.com/package/react-error-boundary
*/
export function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
	return (
		<div>
			<p className="text-start">Something went wrong while submitting the form:</p>
			<p className="text-start pb-2">{error.message}</p>
			<Button type="submit" onClick={resetErrorBoundary} text="Try again" />
		</div>
	)
}

type Props = {
	children: React.ReactNode
	reset?: () => void
}

/* 
    Wraps child components in an ErrorBoundary to catch runtime errors. 
    Accepts children (components that may throw errors) and an optional 'reset' function to reset the error state
*/
export default function ErrorHandler({children, reset}: Props) {
	return (
		<>
			<div className="flex items-center flex-col pb-[1rem] pt-[5rem]">
				{/*Code adapted from https://www.npmjs.com/package/react-error-boundary */}
				<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
					{children}
				</ErrorBoundary>
			</div>
		</>
	)
}
