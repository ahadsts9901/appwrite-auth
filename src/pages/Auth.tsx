import { useState } from "react"
import Login from "../components/Login"
import Signup from "../components/Signup"

const Auth = () => {

    const [isLoginPage, setIsLoginPage]: any = useState(true)

    return (
        <>
            {
                isLoginPage ? <Login setIsLoginPage={setIsLoginPage} /> : <Signup setIsLoginPage={setIsLoginPage} />
            }
        </>
    )
}

export default Auth