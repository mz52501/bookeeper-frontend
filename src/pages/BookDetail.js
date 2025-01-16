import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetchData} from '../hooks/UseFetchData';
import {useAuth} from "../context/AuthContext";
import {usePostData} from "../hooks/UsePostData";
import {FaStar} from "react-icons/fa6";
import StarRating from "./StarRating";

function BookDetail() {
    const {id} = useParams();
    const {user} = useAuth();
    const {data: book, loading, error} = useFetchData(`/books/${id}`);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [hoveredRating, setHoveredRating] = useState(0); // State for hovering over stars
    const [averageRating, setAverageRating] = useState(0);
    const [formData, setFormData] = useState({
        bookId: id,
        userId: user.id,
        rating: 1,
        comment: '',
        created: new Date().toISOString()
    });
    const {responseData, loading: postLoading, error: postError, postData} = usePostData("/review", formData);

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0; // No reviews, average is 0
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / reviews.length).toFixed(1); // Average rounded to 1 decimal
    };

    // Calculate average rating after book data is loaded
    useEffect(() => {
        if (book?.reviews) {
            setAverageRating(calculateAverageRating(book.reviews));
        }
    }, [book]);

    if (loading || postLoading) return <div>Loading...</div>;
    if (error) return <div>Error : {error.message}</div>;
    if (postError) return <div>Error : {postError.message}</div>;
    if (!book) return <div>Book not found</div>;

    // Function to toggle modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to handle review submission (you can extend this to send data to backend)
    const handleReviewSubmit = () => {
        if (formData.comment.trim()) {
            postData();
            closeModal(); // Close the modal after submission
            window.location.reload();
        } else {
            alert('Please write a review!');
        }
    };

    // Function to handle star click (set rating)
    const handleStarClick = (starIndex) => {
        setFormData((prevState => ({
            ...prevState,
            rating: starIndex
        })));
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div
                className="flex flex-col justify-evenly h-2/3 items-center shadow-md rounded-md w-1/3 px-14 bg-gray-50">
                <div className="shadow-md rounded-md bg-gray-700">
                    <p className="text-3xl text-white px-8 py-4 font-bold">{book.title}</p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5"><strong>Author :</strong> {book.author}</p>
                    <p className="text-xl font-medium mb-5"><strong>Year :</strong> {book.year}</p>
                    <div className="flex items-center">
                        <StarRating rating={averageRating}/>
                    </div>
                </div>
                <div>
                    <button
                        className="mt-6 rounded-md shadow-md bg-orange-500 mr-6"
                        onClick={openModal} // Open the modal on click
                    >
                        <p className="px-6 py-2 text-lg font-medium text-white">Leave a review</p>
                    </button>
                    <button
                        className="rounded-md shadow-md bg-red-500"
                        onClick={() => window.location.href = '/'}
                    >
                        <p className="px-6 py-2 text-lg font-medium text-white">Back to dashboard</p>
                    </button>
                </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
                        <h2 className="text-2xl mb-4 font-semibold">Leave a Review</h2>

                        {/* Star Rating System */}
                        <div className="flex mb-4">
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <svg
                                    key={starIndex}
                                    className={`h-8 w-8 cursor-pointer mr-1 ${
                                        starIndex <= (hoveredRating || formData.rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                    onMouseEnter={() => setHoveredRating(starIndex)} // Hover effect
                                    onMouseLeave={() => setHoveredRating(0)} // Remove hover effect
                                    onClick={() => handleStarClick(starIndex)} // Set rating on click
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                            ))}
                        </div>

                        {/* Review textarea */}
                        <textarea
                            className="w-full h-32 p-4 border rounded-md mb-4"
                            value={formData.comment}
                            onChange={(e) => setFormData((prevState) => ({
                                ...prevState,
                                comment: e.target.value
                            }))} // Update review state
                            placeholder="Write your review here..."
                        />

                        <div className="flex justify-end">
                            <button
                                className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={closeModal} // Close the modal
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-orange-500 text-white px-6 py-2 rounded-md"
                                onClick={handleReviewSubmit} // Submit the review
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookDetail;
