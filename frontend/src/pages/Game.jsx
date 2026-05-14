import { useState, useEffect } from "react";

export default function Game() {
    const [guess, setGuess] = useState("");
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState("");

    // Mock puzzle data (Replace with API call in useEffect)
    const puzzle = {
        id: 1,
        difficulty: "Medium",
        question: "A billionaire beats up the mentally ill while wearing a rubber suit.",
        hint: "It takes place in Gotham."
    };

    const handleGuess = (e) => {
        e.preventDefault();
        // TODO: Send guess to your API to check if it's correct

        // MOCK LOGIC for demonstration:
        if (guess.toLowerCase() === "the dark knight") {
            setFeedback("Correct! Progress saved.");
            setFailedAttempts(0); // reset on win
        } else {
            setFeedback("Incorrect. Try again.");
            setFailedAttempts(prev => prev + 1);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
            <div className="flex justify-between items-center mb-6 text-sm font-bold text-gray-500 uppercase tracking-wide">
                <span>Difficulty: {puzzle.difficulty}</span>
                <span>Attempts: {failedAttempts}</span>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                "{puzzle.question}"
            </h2>

            <form onSubmit={handleGuess} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Enter movie title..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded p-3 text-lg focus:outline-none focus:border-blue-500"
                />

                <button type="submit" className="bg-blue-600 text-white py-3 rounded font-bold text-lg hover:bg-blue-700">
                    Submit Guess
                </button>
            </form>

            {/* Feedback Message */}
            {feedback && (
                <p className={`mt-4 text-center font-bold ${feedback.includes("Correct") ? "text-green-600" : "text-red-500"}`}>
                    {feedback}
                </p>
            )}

            {/* Hint Logic: Only show button if 3 or more failed attempts */}
            {failedAttempts >= 3 && (
                <div className="mt-8 pt-6 border-t text-center">
                    {!showHint ? (
                        <button
                            onClick={() => setShowHint(true)}
                            className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded font-bold hover:bg-yellow-500"
                        >
                            Need a Hint?
                        </button>
                    ) : (
                        <p className="bg-yellow-100 p-4 rounded text-yellow-800 italic">
                            Hint: {puzzle.hint}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}