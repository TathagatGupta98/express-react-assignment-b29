import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth/leaderboard");
                if (!response.ok) throw new Error("Could not load leaderboard data");
                
                const data = await response.json();
                setLeaders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow-sm border">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
                <button 
                    onClick={() => navigate("/game")}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    Back to Game
                </button>
            </div>

            {isLoading && <p className="text-center py-10 text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500 py-10">{error}</p>}

            {!isLoading && !error && (
                <div className="divide-y border-t border-b">
                    {leaders.length === 0 ? (
                        <p className="text-center py-10 text-gray-400">No entries found.</p>
                    ) : (
                        leaders.map((user, index) => (
                            <div 
                                key={user._id} 
                                className="flex justify-between items-center py-4 px-2 hover:bg-gray-50 transition"
                            >
                                <div className="flex items-center space-x-6">
                                    <span className="text-gray-400 font-mono w-6 text-right">
                                        {index + 1}.
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {user.username}
                                    </span>
                                </div>
                                <div className="text-gray-900 font-semibold">
                                    {user.score} pts
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}