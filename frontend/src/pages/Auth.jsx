import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); 

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setIsLoading(true);

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            login(data.token);
            navigate("/game");
            setIsLoading(false);

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        } 
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded p-2 focus:outline-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded p-2 focus:outline-blue-500"
                        required
                    />
                </div>

                <button
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {isLoading ? "Please wait..." : (isLogin ? "Login" : "Sign Up")}
                </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError(""); 
                    }}
                    className="text-blue-600 font-bold hover:underline"
                >
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
}