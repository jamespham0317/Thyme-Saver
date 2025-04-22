import React from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const Recipe = ({ recipe }) => {
  return (
    <div className='box flex-column center shadow-5 pa4 white ma4 tl w-80'>
      <div dangerouslySetInnerHTML={{ __html: md.render(recipe) }} />
    </div>
  );
}

export default Recipe;