import React from 'react';
import A from './A';
import Img from './Img';
import Marvel from './marvel.png';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <A href="https://marvel.com">
          <Img src={Marvel} alt="Marvel - Logo" />
        </A>
      </div>
    );
  }
}

export default Header;
