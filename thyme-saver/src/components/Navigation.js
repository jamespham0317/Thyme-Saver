import React from 'react';
import herb from './herb.png';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className='flex shadow-3 justify-between brown'>
          <div className='flex items-end'>
            <img src={herb} alt="icon" style={{ width: '60px', height: '60px', marginBottom: '30px', marginLeft: '20px', marginRight: '-15px'}}/>
            <p className='f3 pa3 b'> Thyme Saver </p>
          </div>
          <p onClick={() => onRouteChange('signout')} className='nav-right f3 link dim black pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav className='flex shadow-3 justify-between brown'>
          <div className='flex items-end'>
            <img src={herb} alt="icon" style={{ width: '60px', height: '60px', marginBottom: '30px', marginLeft: '20px', marginRight: '-15px'}}/>
            <p className='f3 pa3 b'> Thyme Saver </p>
          </div>
          <div className='flex'>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim pa3 pointer'>Register</p>
          </div>
        </nav>
      );
    }
}

export default Navigation;