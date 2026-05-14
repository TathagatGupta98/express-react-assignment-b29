import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold tracking-wider">
                    The Movie Puzzler
                </Link>
                <div className="space-x-4">
                    <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
                    <Link to="/game" className="hover:underline">Play</Link>
                    <Link to="/auth" className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-200">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}