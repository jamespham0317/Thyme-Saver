import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='f3' style={{marginTop: '50px'}}>
        {`${name}, you have added ${entries} recipes to your cookbook!`}
      </div>
    </div>
  );
}

export default Rank;