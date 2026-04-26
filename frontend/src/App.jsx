import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('game'); 
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState('Medium');
  const [guess, setGuess] = useState('');

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.trim() !== '') {
      setFailedAttempts((prev) => prev + 1);
      setGuess('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-slate-200">
        <h1
          className="text-xl md:text-2xl font-bold text-indigo-600 cursor-pointer flex items-center gap-2"
          onClick={() => setView('game')}
        >
          The Movie Puzzler
        </h1>
        <nav className="space-x-4 flex items-center">
          <button
            onClick={() => setView('leaderboard')}
            className="text-sm md:text-base text-slate-600 hover:text-indigo-600 font-medium transition"
          >
            Leaderboard
          </button>
          <button
            onClick={() => setView('login')}
            className="text-sm md:text-base bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Login
          </button>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-6 mt-8">
        
        {view === 'game' && (
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 text-center">
            
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <span className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Current Puzzle
              </span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border border-slate-200 rounded-md text-sm text-slate-600 p-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <p className="text-xl md:text-3xl font-medium leading-relaxed mb-10 text-slate-700 italic">
              "A billionaire beats up the mentally ill while wearing a rubber suit."
            </p>

            <form onSubmit={handleGuess} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Type your guess here..."
                className="flex-1 max-w-md px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-sm transition"
              >
                Submit
              </button>
            </form>

            //hint logic

            <div className="h-12 flex items-center justify-center">
              {failedAttempts >= 3 ? (
                <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-lg border border-amber-200 text-sm animate-fade-in">
                  <span className="font-bold">Hint:</span> Directed by Christopher Nolan.
                </div>
              ) : failedAttempts > 0 ? (
                <p className="text-sm text-slate-400">
                  Incorrect. {3 - failedAttempts} more attempts until hint unlocks.
                </p>
              ) : null}
            </div>
            
          </div>
        )}

        {view === 'leaderboard' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Top Puzzlers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wide">
                    <th className="pb-3 px-2 font-semibold">Rank</th>
                    <th className="pb-3 px-2 font-semibold">Player</th>
                    <th className="pb-3 px-2 font-semibold text-right">Solved</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="py-4 px-2 font-bold text-amber-500">#1</td>
                    <td className="py-4 px-2 font-medium">Cinematrix</td>
                    <td className="py-4 px-2 text-right font-bold text-slate-900">42</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="py-4 px-2 font-bold text-slate-400">#2</td>
                    <td className="py-4 px-2 font-medium">PopcornKing</td>
                    <td className="py-4 px-2 text-right font-bold text-slate-900">38</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="py-4 px-2 font-bold text-amber-700">#3</td>
                    <td className="py-4 px-2 font-medium">ReelGenius</td>
                    <td className="py-4 px-2 text-right font-bold text-slate-900">31</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'login' && (
          <div className="max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Welcome Back</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
              />
              <button 
                type="submit"
                className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition shadow-sm mt-2"
              >
                Sign In
              </button>
              <p className="text-center text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
                Don't have an account? <span className="text-indigo-600 cursor-pointer font-semibold hover:underline">Sign up</span>
              </p>
            </form>
          </div>
        )}
        
      </main>
    </div>
  );
}