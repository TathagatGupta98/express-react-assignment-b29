import { useState, useEffect } from "react";

export default function Leaderboard() {
    const [users, setUsers] = useState([    ]);

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-3xl font-extrabold text-center mb-8">Top Puzzlers</h2>

            <div className="bg-white rounded shadow-md overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-800 text-white p-4 font-bold uppercase text-sm">
                    <span>Rank</span>
                    <span>Username</span>
                    <span className="text-right">Solved</span>
                </div>

                <div className="divide-y">
                    {users.map((user, index) => (
                        <div key={user.id} className="grid grid-cols-3 p-4 items-center hover:bg-gray-50 transition">
                            <span className="font-bold text-gray-500">#{index + 1}</span>
                            <span className="font-semibold text-gray-800">{user.username}</span>
                            <span className="text-right font-mono font-bold text-blue-600">{user.solvedCount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}