import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const { user, logout } = useAuth();

    // Si l'utilisateur n'est pas connecté
    if (!user) {
        return (
            <div>
                <h1>Error</h1>
                <p>No user data available. Please log in again.</p>
                <button onClick={() => window.location.href = '/login'}>
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
            <div className="bg-gray-100 p-4 rounded shadow-md w-full max-w-md">
                <p><strong>User ID:</strong> {user.userId}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Last Name:</strong> {user.surname}</p>
                <p><strong>Date of Birth:</strong> {user.dob}</p>
                <p><strong>Login:</strong> {user.login}</p>
            </div>
            <button
                onClick={logout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
