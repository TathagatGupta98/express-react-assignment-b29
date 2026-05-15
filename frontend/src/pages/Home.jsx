import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const navigate = useNavigate();
    
    const { token } = useContext(AuthContext); 

    const handlePlayClick = () => {
        if (token) {
            navigate("/game"); 
        } else {
            navigate("/auth"); 
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-20 text-center space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900">
                Can you guess the movie?
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
                We give you extremely literal (and cynical) descriptions of famous movies.
                Your job is to guess the title.
            </p>

            <div className="bg-white p-6 rounded shadow-md italic text-gray-500 w-full max-w-md border-l-4 border-blue-500">
                "A billionaire beats up the mentally ill while wearing a rubber suit." <br />
                <span className="font-bold text-gray-800 mt-2 block">The Dark Knight</span>
            </div>

            <div className="space-x-4 mt-8">
                <button
                    onClick={handlePlayClick} 
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                >
                    Play Now
                </button>
                <button
                    onClick={() => navigate("/leaderboard")}
                    className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-400 transition"
                >
                    Leaderboard
                </button>
            </div>
        </div>
    );
}