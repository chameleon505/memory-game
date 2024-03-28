import { useState, useEffect } from 'react'
import './App.css'
import Card from './Components/Card'

// Array of image objects with 'src' and 'matched' properties
const images = [
  { "src": "bycycle.png", matched: false },
  { "src": "cat.jpg", matched: false },
  { "src": "halloween.jpg", matched: false },
  { "src": "pumpkin-soup.png", matched: false },
  { "src": "sailing.png", matched: false },
  { "src": "table-lamp.jpg", matched: false },
  { "src": "tea.png", matched: false },
  { "src": "watermelon.png", matched: false }
];

function App() {
  // State variables for managing game logic
  const [cards, setCards] = useState([]);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [stopped, setStopped] = useState(false);

  // Function to create shuffled cards
  const createCards = () => {
    const randomizedCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(randomizedCards);
  }

  // Function to handle card clicks and set choices
  const handleCardClick = (card) => {
    // Set choice1 if it's null, otherwise set choice2
    choice1 ? setChoice2(card) : setChoice1(card);
  }
  
  // Effect to check for a match when both choices are made
  useEffect(() => {
    if (choice1 && choice2) {
      setStopped(true); // Stop further clicks while checking match
      checkMatch();
    }
  }, [choice1, choice2]);

  // Function to check if the chosen cards match
  const checkMatch = () => {
    if (choice1.src === choice2.src) {
      // Set matched property to true for matched cards
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choice1.src) {
            return { ...card, matched: true };
          }
          return card;
        });
      });
      setStopped(false); // Allow further clicks
      // Reset choices
      setChoice1(null);
      setChoice2(null);
    } else {
      // Cards do not match, reset choices after a short delay
      setTimeout(() => {
        setStopped(false); // Allow further clicks
        setChoice1(null);
        setChoice2(null);
      }, 500); // Adjust the delay as needed
    }
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {/* Render the cards with Card component */}
      <div className="card-container">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            card={card} 
            handleCardClick={handleCardClick} 
            front={choice1 === card || choice2 === card || card.matched} 
            stopped={stopped} 
          />
        ))}
      </div>
      {/* Button to start a new game */}
      <div className="button-container">
        <button onClick={createCards}>New Game</button>
      </div>
    </div>
  );
}

export default App;
