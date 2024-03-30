import "../App.css"

import { useState, useEffect } from 'react';
import { account } from '../appwrite';
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser]: any = useState(null);
    const [isLoading, setIsLoading]: any = useState(false);

    useEffect(() => {
        async function checkLoggedInUser() {
            try {
                const user: any = await account.get();
                console.log(user);
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }

        checkLoggedInUser();

    }, []);

    const logout = async () => {
        try {
            setIsLoading(true);
            await account.deleteSession('current');
            setLoggedInUser(null);
            setIsLoading(false);
            navigate("/auth")
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="profile">
                <p>{loggedInUser ? loggedInUser.name :
                    <div className="guest">
                        <p className="one">Guest</p>
                        <p className="two" onClick={() => navigate("/auth")}>Login Now</p>
                    </div>
                }</p>
                <button onClick={logout}>
                    {
                        isLoading && <span className="loader"></span>
                    }
                    {
                        isLoading ? "Processing" : "Logout"
                    }
                </button>
            </div>
        </>
    );
};

export default Logout;