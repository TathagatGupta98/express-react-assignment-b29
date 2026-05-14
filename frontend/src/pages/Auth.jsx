import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send username and password to your Express API here
        console.log("Submitting:", { username, password, type: isLogin ? "Login" : "Signup" });

        // Simulate successful login and redirect to game
        navigate("/game");
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>

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

                <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 font-bold hover:underline"
                >
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
}