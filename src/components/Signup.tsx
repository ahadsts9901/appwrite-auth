import "../App.css"
import { useState, useEffect } from 'react';
import { account, ID } from '../appwrite';
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsLoginPage }: any) => {

    const navigate = useNavigate()

    const [email, setEmail]: any = useState('');
    const [password, setPassword]: any = useState('');
    const [name, setName]: any = useState('');
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

    async function login(email: any, password: any) {
        try {
            await account.createEmailSession(email, password);
            const user: any = await account.get();
            if (user) {
                navigate("/")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const signup = async (e: any) => {

        e.preventDefault()

        if (password.length < 8) {
            setErrorMessage("password must be 8 characters long")
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500)
            return;
        }

        if (!email || email.trim() === "" || !password || password.trim() === "" || !name || name.trim() === "") {
            setErrorMessage("please fill all the fields")
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500)
            return;
        }

        try {
            setIsLoading(true)
            await account.create(ID.unique(), email, password, name);
            await login(email, password);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
            setErrorMessage("email already taken")
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500)
            return;
        }
    }

    return (
        <div className='login-form'>
            <form onSubmit={signup}>
                <h2>Signup</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input min={2} max={16} type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <p
                    onClick={() => setIsLoginPage(true)}
                >Already have an account ? Login</p>
                {
                    errorMessage && <p className="errorMessage">{errorMessage}</p>
                }
                <button type="submit">
                    {
                        isLoading && <span className="loader"></span>
                    }
                    {
                        isLoading ? "Processing" : "Signup"
                    }
                </button>
            </form>
        </div>
    );
};

export default Signup;