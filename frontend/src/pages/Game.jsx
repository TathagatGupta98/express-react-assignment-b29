import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Game() {
    const { token } = useContext(AuthContext);

    const [difficulty, setDifficulty] = useState("Easy");
    const [puzzle, setPuzzle] = useState(null);
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const userData = await res.json();
                    setScore(userData.score || 0);
                }
            } catch (err) {
                console.error("Failed to load user profile", err);
            }
        };

        if (token) fetchUserProfile();
    }, [token]);

    const fetchPuzzle = async (level) => {
        setPuzzle(null);
        setGuess(""); setAttempts(0); setIsCorrect(false); setShowHint(false);

        const res = await fetch(`http://localhost:3000/api/puzzles/${level}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setPuzzle(res.ok ? await res.json() : false);
    };

    useEffect(() => { fetchPuzzle(difficulty); }, [difficulty]);

    const handleGuess = async (e) => {
        e.preventDefault();

        if (guess.toLowerCase() === puzzle.answer.toLowerCase()) {
            setIsCorrect(true);

            try {
                const res = await fetch(`http://localhost:3000/api/puzzles/${puzzle._id}/solve`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setScore(data.score);
                }
            } catch (err) {
                console.error("Failed to save progress", err);
            }
        } else {
            setAttempts(a => a + 1);
        }
    };

    if (puzzle === null) return <p className="text-center mt-20 text-xl font-bold animate-pulse">Loading...</p>;
    if (puzzle === false) return <p className="text-center mt-20 text-red-500 font-bold">No puzzles found.</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow-md text-center">

            <div className="flex justify-between items-center mb-8 border-b-2 pb-4">
                <span className="text-xl font-extrabold text-blue-600 bg-blue-100 px-4 py-1 rounded-full">
                    Score: {score}
                </span>
                <div className="space-x-2">
                    {["Easy", "Medium", "Hard"].map((lvl) => (
                        <button key={lvl} onClick={() => setDifficulty(lvl)} className={`px-3 py-1 font-bold rounded text-sm ${difficulty === lvl ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
                            {lvl}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-gray-500 font-bold mb-4 uppercase text-sm tracking-widest">Attempts: {attempts}</p>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">"{puzzle.question}"</h2>

            {/* Input Form */}
            <form onSubmit={handleGuess} className="flex flex-col space-y-4">
                <input
                    type="text" value={guess} onChange={(e) => setGuess(e.target.value)}
                    className="border-2 p-3 rounded text-lg border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Movie title..."
                />
                <button className="bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition">Submit</button>
            </form>

            {isCorrect && (
                <div className="mt-6">
                    <p className="text-green-600 font-bold text-xl mb-4">Correct!</p>
                    <button onClick={() => fetchPuzzle(difficulty)} className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600">Next Puzzle ➔</button>
                </div>
            )}

            {attempts > 0 && !isCorrect && <p className="text-red-500 font-bold mt-4">Incorrect. Try again.</p>}

            {attempts >= 3 && !isCorrect && (
                <div className="mt-6 pt-4 border-t">
                    {!showHint ? (
                        <button onClick={() => setShowHint(true)} className="bg-yellow-400 font-bold px-4 py-2 rounded hover:bg-yellow-500">Need a Hint?</button>
                    ) : (
                        <p className="bg-yellow-100 text-yellow-800 p-3 rounded italic">Hint: {puzzle.hint}</p>
                    )}
                </div>
            )}
        </div>
    );
}