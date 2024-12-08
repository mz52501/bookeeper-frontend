import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchData } from '../hooks/UseFetchData';

function Books() {

const {data: books, loading, error} = useFetchData("/books");

  if (loading) return <div>Loading...</div>;
  if (!books || books.length === 0) return <div>No book found</div>;
  if (error) return <div>Error : {error.message}</div>;

  return (
    <div>
      <h1>Book list</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {/* Link to book details */}
            <Link to={`/books/${book.id}`}>{book.title} - {book.author}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/'}>
        Back to dashboard
      </button>
    </div>
  );
}

export default Books;
