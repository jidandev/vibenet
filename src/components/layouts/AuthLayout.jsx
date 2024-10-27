import Link from "next/link"

export const AuthLayout = ({children, title}) => {
    return (
        <div className="flex min-h-screen justify-center items-center bg-white dark:bg-black overflow-hidden">
            <div className=" flex flex-col h-full w-80 md:w-96 items-center justify-center my-4">
                <h1 className="playfair text-black dark:text-white font-medium text-3xl">{title}</h1>
                <h1 className="text-gray-600 dark:text-white text-sm mt-2 mb-4 text-center">Welcome, please enter your detail account!</h1>
                {children}
                {title == "Login" && <h1 className="text-gray-600 dark:text-white text-sm mt-2 mb-4">Dont have an account?<Link href="/register" className="ml-1"><strong>Sign Up</strong></Link></h1>}
                {title == "Register" && <h1 className="text-gray-600 dark:text-white text-sm mt-2 mb-4">Already have an account?<Link href="/login" className="ml-1"><strong>Sign In</strong></Link></h1>}
            </div>
        </div>
    )
}