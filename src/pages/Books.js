import React from 'react';
import {Link} from 'react-router-dom';
import {useFetchData} from '../hooks/UseFetchData';

function Books() {

    const {data: books, loading, error} = useFetchData("/books");

    if (loading) return <div>Loading...</div>;
    if (!books || books.length === 0) return <div>No book found</div>;
    if (error) return <div>Error : {error.message}</div>;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="my-8 rounded-md shadow-md bg-gray-700">
                <p className="px-10 py-2 text-3xl text-white font-semibold">Book list</p>
            </div>
            {books.map(book => (
                <Link
                    className="flex justify-center items-center rounded-md shadow-md w-2/3 mt-5 py-5 bg-gray-200 hover:bg-gray-300"
                    key={book.id}
                    to={`/books/${book.id}`}>
                    <p className="text-lg font-medium">{book.title} - {book.author}</p>
                </Link>
            ))}
            <button className="mt-10 rounded-md shadow-md bg-red-500" onClick={() => window.location.href = '/'}>
                <p className="px-6 py-2 text-lg font-medium text-white">Back to dashboard</p>
            </button>
        </div>
    );
}

export default Books;
