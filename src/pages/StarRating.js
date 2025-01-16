import React from 'react';
import {FaStar} from 'react-icons/fa';

const StarRating = ({rating, maxRating = 5}) => {
    // Calculate the whole number and fractional part of the rating
    const filledStars = Math.floor(rating);  // Number of fully filled stars
    const fraction = rating % 1;            // Decimal part of the rating (0.32 for 4.32)

    return (
        <div className="flex items-center">
            {/* Render stars */}
            {[...Array(maxRating)].map((_, index) => {
                if (index < filledStars) {
                    // Fully filled stars
                    return (
                        <FaStar
                            key={index}
                            size={36}
                            className="text-yellow-300 mr-1"
                        />
                    );
                } else if (index === filledStars) {
                    // Partially filled star
                    return (
                        <div
                            key={index}
                            className="relative inline-block mr-1"
                            style={{width: '36px', height: '36px'}}
                        >
                            {/* Background (empty star) */}
                            <FaStar
                                size={36}
                                className="text-gray-300 absolute top-0 left-0"
                            />
                            {/* Foreground (filled star with percentage clip) */}
                            <FaStar
                                size={36}
                                className="text-yellow-300 absolute top-0 left-0"
                                style={{
                                    clipPath: `inset(0 ${100 - fraction * 100}% 0 0)`
                                }}
                            />
                        </div>
                    );
                } else {
                    // Empty stars
                    return (
                        <FaStar
                            key={index}
                            size={36}
                            className="text-gray-300 mr-1"
                        />
                    );
                }
            })}

            {/* Display rating text */}
            <p className="font-semibold text-xl ml-1">{rating}</p>
        </div>
    );
};

export default StarRating;
