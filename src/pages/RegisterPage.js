import React, { useState } from 'react';
import {usePostData} from '../hooks/UsePostData';

const Register = () => {
    const [user, setUser] = useState({
        login: '',
        hashPassword: '',
        isadmin: false,
        name: '',
        surname: '',
        dob: '',
    });

    const { postData, loading, error, success } = usePostData('/register', user);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        console.log("user", user);
        
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Register User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="login" className="block font-medium">Login:</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={user.login}
                        onChange={handleChange}
                        required
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="hashPassword" className="block font-medium">Password:</label>
                    <input
                        type="password"
                        id="hashPassword"
                        name="hashPassword"
                        value={user.hashPassword}
                        onChange={handleChange}
                        required
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block font-medium">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="surname" className="block font-medium">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                        required
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="block font-medium">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={user.dob}
                        onChange={handleChange}
                        required
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="isadmin" className="block font-medium">Admin:</label>
                    <input
                        type="checkbox"
                        id="isadmin"
                        name="isadmin"
                        checked={user.isadmin}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Is Admin
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className="error">
                    {error?.response?.data}
                </p>

                {success && <p className="text-green-500">User registered successfully!</p>}
            </form>
            <button onClick={() => window.location.href = '/'}>
                Back to dashboard
            </button>
        </div>
    );
};

export default Register;
