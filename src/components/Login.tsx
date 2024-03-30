import "../App.css"

import { useState, useEffect } from 'react';
import { account } from '../appwrite';
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = ({ setIsLoginPage }: any) => {

    const navigate = useNavigate()

    const [email, setEmail]: any = useState('');
    const [password, setPassword]: any = useState('');
    const [errorMessage, setErrorMessage]: any = useState(null);
    const [isLoading, setIsLoading]: any = useState(false);

    useEffect(() => {
        async function checkLoggedInUser() {
            try {
                const user: any = await account.get();
                if (user) {
                    navigate("/")
                }
            } catch (error) {
                console.error(error);
            }
        }
        checkLoggedInUser();
    }, []);

    async function login(e: any) {

        e.preventDefault()

        if (password.length < 8) {
            setErrorMessage("email or password incorrect")
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500)
            return;
        }

        if (!email || email.trim() === "" || !password || password.trim() === "") {
            setErrorMessage("email or password incorrect")
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500)
            return;
        }

        try {
            setIsLoading(true)
            await account.createEmailSession(email, password);
            const user: any = await account.get();
            setIsLoading(false)
            if (user) {
                navigate("/")
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false)
            setErrorMessage("email or password incorrect")
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500)
        }
    }

    const googleAuth = async (e: any) => {

        e.preventDefault()

        account.createOAuth2Session(
            "google",
            "https://appwrite-auth-sts.surge.sh/",
            "https://appwrite-auth-sts.surge.sh/"
        )

    }

    const facebookAuth = async (e: any) => {

        e.preventDefault()

        account.createOAuth2Session(
            "facebook",
            "https://appwrite-auth-sts.surge.sh/",
            "https://appwrite-auth-sts.surge.sh/"
        )

    }

    return (
        <div className='login-form'>
            <form onSubmit={login}>
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <p
                    onClick={() => setIsLoginPage(false)}
                >Dont have an account ? Signup</p>
                {
                    errorMessage && <p className="errorMessage">{errorMessage}</p>
                }
                <button type="submit">
                    {
                        isLoading && <span className="loader"></span>
                    }
                    {
                        isLoading ? "Processing" : "Login"
                    }
                </button>
                <div className="social">
                    <FaGoogle className="google" onClick={(e) => googleAuth(e)} />
                    <FaFacebook className="google" onClick={(e) => facebookAuth(e)} />
                </div>
            </form>
        </div>
    );
};

export default Login;