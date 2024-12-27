import { useState } from "react";
import { usePostData } from "../hooks/UsePostData";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({ login: '', hash_password: '' });
    const { postData, responseData, error, loading } = usePostData('/login', formData);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        postData(); // Attendre que postData envoie les données et reçoive une réponse
    
        if (responseData) {
            console.log("response",responseData);
            
            console.log("Login successful:", responseData); // Log des données utilisateur
            login(responseData); // Met à jour le contexte avec les données utilisateur
            window.location.href = '/profile';
        } else {
            console.error("Login failed or no data received.");
        }
    };
    
    
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mt-10">
                <p className="text-3xl font-semibold">Login</p>
            </div>
            <form className="flex flex-col items-center space-y-6 p-6"
                  onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    placeholder="Enter your login"
                    className="w-72 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                />
                <input
                    type="password"
                    name="hash_password"
                    value={formData.hash_password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-72 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                />
                <button
                    type="submit"
                    className="w-72 p-3 bg-gray-200 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-md"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Affichage des erreurs */}
            {error && (
                <p className="text-red-500">
                    {error.response?.data || "An unexpected error occurred"}
                </p>
            )}
        </div>
    );
}
