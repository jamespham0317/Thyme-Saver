import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className='flex shadow-3 justify-between'>
          <p className='f3 pa3 b'> Recipe Finder </p>
          <p onClick={() => onRouteChange('signout')} className='nav-right f3 link dim black pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav className='flex shadow-3 justify-between'>
        <p className='f3 pa3 b'> Recipe Finder </p>
          <div className='flex'>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim pa3 pointer'>Register</p>
          </div>
        </nav>
      );
    }
}

export default Navigation;