import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3 mt6'>
        {'Upload an image of a dish to find a recipe for it.'}
      </p>
      <div className='center'>
        <div className='w-700 center br3 shadow-5'>
          <input className='f4 pa2 w-70 center grey' type='file' onChange={onInputChange}/>
          <button
            className='w-30 f4 link ph3 pv2 dib brown button'
            onClick={onButtonSubmit}>
              Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;