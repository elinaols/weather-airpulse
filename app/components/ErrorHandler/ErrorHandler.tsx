import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import Button from "../Button/Button"
/* 
    Creates a reset so the user can go back and put in a new value in the form,
    resetErrorBoundary resets the error to reloading the website so the user can try to type in a new city.
    Code from https://www.npmjs.com/package/react-error-boundary
*/
function ErrorFallback ({error, resetErrorBoundary}: FallbackProps) {
    return (
        <div>
            <p className="text-start">Something went wrong while submitting the form:</p>
            <p className="text-start pb-2">{error.message}</p>
            <Button type="submit" onClick={resetErrorBoundary} text="Try again" />
        </div>
    )
}

type Props = {
    children: React.ReactNode,
    reset?: () => void
}

/* 
    The component receives a 'children'-prop that represents the child components which might cause errors and a
    'reset'-prop which is a function that resets the error state when an error occurs.
*/
export default function ErrorHandler({children, reset}: Props) {
    return (
        <>
        <div className="flex items-center flex-col pb-[1rem] pt-[5rem]">
            {/*Code from https://www.npmjs.com/package/react-error-boundary */}
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                {children}
            </ErrorBoundary>
        </div>
        </>
    )
}