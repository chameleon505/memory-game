import React from 'react';

export default function Card({ card, handleCardClick, front, stopped }) {
    // Function to handle click action on the card
    const onClickAction = () => {
        // Check if the game is not stopped
        if (!stopped) {
            // If the game is not stopped, invoke the handleCardClick function passed as prop
            handleCardClick(card);
        }
    }

    return (
        <div className={`card ${front ? 'flipped' : ''}`} >
            <div className="card-inner">
                {/* Conditional rendering based on whether the card is facing front or back */}
                {front ? (
                    // If the card is facing front, render the front face with the image from the card object
                    <div className="card-front">
                        <img src={card.src} alt="Front" style={{ width: "110px", height: "110px" }}/>
                    </div>
                ) : (
                    // If the card is facing back, render the back face with a default image
                    <div className="card-back">
                        {/* Apply onClickAction function to handle click event on the back face */}
                        <img src="blue.jpg" alt="Back" onClick={onClickAction} style={{ width: "110px", height: "110px" }} />
                    </div>
                )}
            </div>
        </div>
    );
};
