import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/UseFetchData';

function BookDetail() {
  const { id } = useParams();
  const { data: book, loading, error } = useFetchData(`/books/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author :</strong> {book.author}</p>
      <p><strong>Year :</strong> {book.year}</p>
      
      <button onClick={() => window.location.href = '/'}>
        Back to dashboard
      </button>
    </div>
  );
}

export default BookDetail;
