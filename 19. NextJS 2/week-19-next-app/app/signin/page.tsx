"use client" 

export default function SignIn() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="border p-2">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button onClick={() => {

                }}>
                    Sign In
                </button>

            </div>
        </div>
    )
}
