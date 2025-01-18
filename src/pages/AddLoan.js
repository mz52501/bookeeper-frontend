import React, { useState, useEffect } from "react";
import { usePostData } from "../hooks/UsePostData";
import { useFetchData } from "../hooks/UseFetchData";

const AddLoan = () => {
    const [formData, setFormData] = useState({
        userId: "",
        bookId: "",
        returnDate: "",
    });

    const { data: users, loading: loadingUsers, error: errorUsers } = useFetchData("/users");
    const { data: books, loading: loadingBooks, error: errorBooks } = useFetchData("/books");
    const { postData, responseData, loading, error } = usePostData("/addLoan", formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    return (
        <div>
            <h1>Add Loan</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    User:
                    <select name="userId" value={formData.userId} onChange={handleInputChange} required>
                        <option value="">Select a user</option>
                        {loadingUsers && <option>Loading users...</option>}
                        {errorUsers && <option>Error loading users</option>}
                        {users && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} {user.surname}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Book:
                    <select name="bookId" value={formData.bookId} onChange={handleInputChange} required>
                        <option value="">Select a book</option>
                        {loadingBooks && <option>Loading books...</option>}
                        {errorBooks && <option>Error loading books</option>}
                        {books && books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Return Date:
                    <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Loan"}
                </button>
                {error && <p className="text-red-500">Error: {error.response?.data}</p>}
                {responseData && <p className="text-green-500">Loan added successfully!</p>}
            </form>
        </div>
    );
};

export default AddLoan;

