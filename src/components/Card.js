import { useState } from 'react'
import './Card.css'

const Card = (props) => {



  const handleClick = () => {
    if (!props.disabled){
        props.handleChoice(props.card)
      }

  }



  return (
    <div className="card" key={props.id}>
      <div className={props.flipped ? "flipped": ""}>
        <img className='front' src={props.src} alt="card front" />
        <img 
          className='back' 
          src="img/cover.png" 
          alt="card back" 
          onClick={handleClick} 
        />
      </div>
    </div>
  );
}
export default Card