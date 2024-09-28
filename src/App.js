import {useEffect, useState} from 'react';
import Card from './components/Card';
import './App.css';


const cardImages = [
  { "src": "img/helmet-1.png", matched: false ,},
  { "src": "img/potion-1.png", matched: false ,},
  { "src": "img/ring-1.png" , matched: false,},
  { "src": "img/scroll-1.png" , matched: false,},
  { "src": "img/shield-1.png", matched: false ,},
  { "src": "img/sword-1.png", matched: false ,},
];

function App() {
  const [cards, setcards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [disabled, setdisabled] = useState(false)
  const [hintCard, sethintCard] = useState(false)
  const [hints, sethints] = useState(0)


  // We need to shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card)=>({...card, id: Math.random()}))
      setcards(shuffledCards)
      setTurns(0)
      sethints(0)
      

  }
  const handleChoice = (card) =>{
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setdisabled(true)
      if(firstCard.src === secondCard.src){
        setcards(PrevCards => {
          return PrevCards.map(card=>{
            if (card.src === firstCard.src) {
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else {

        setTimeout(()=>resetTurn(),1000)
        
      }
    }

  }, [firstCard,secondCard]);
  
  const resetTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setdisabled(false)
    setTurns(turns + 1);
  }

  const hintCards = ()=>{

    sethintCard(true);
    setTimeout(()=>sethintCard(false),1000)
    sethints(prevhints => prevhints + 1)


  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>
        NEW GAME
      </button>
      <button onClick={hintCards}>Hint</button>
      <div className='game-desc'>
        <h3>Turns: {turns}</h3>
        <h3>Hints used: {hints}</h3>
      </div>
      <div className='card-grid'>
        {cards.map((card)=>(
          <Card src={card.src} key={card.id} card={card} handleChoice={handleChoice} flipped={card == firstCard || card == secondCard || card.matched || hintCard} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}

export default App;
