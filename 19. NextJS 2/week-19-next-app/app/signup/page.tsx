"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    /* Import the router from the useRouter() */
    const router = useRouter();

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="border p-2">

                {/* 1. Fill the username and password with the help of the state variable */}
                {/* Input Boxes controlled by the state variables */}
                <input type="text" placeholder="username" onChange={e => {
                    setUserName(e.target.value);
                }} />

                {/* Input Boxes controlled by the state variables */}
                <input type="password" placeholder="password" onChange={e => {
                    setPassword(e.target.value);
                }} />


                {/* 2. Make the API Call when the Button is clicked */}
                <button onClick={async () => {
                    await axios.post("http://localhost:3000/api/v1/signup", {
                        username,
                        password
                    })

                    /* Move to the sign in page after the sign up is successful */
                    router.push("/signin");
                }}>
                    Sign In
                </button>

            </div>
        </div>
    )
}