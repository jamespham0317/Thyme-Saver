import React from 'react';
import './Recipe.css';

const Recipe = ({ imageUrl }) => {
  return (
    <div className='box center shadow-5 pa4' >
      <img id='inputImage' alt = '' src={imageUrl} width='500px' height='auto'/>
    </div>
    );
}

export default Recipe;