import React from 'react';
import Facebook from './Facebook';
import Google from './Google';
import Twitter from './Twitter';
import Vertical3Dots from './Vertical3Dots';
import Horizontal3Dots from './Horizontal3Dots';

const Icon = props => {
  switch (props.name) {
    case 'facebook':
      return <Facebook {...props} />;
    case 'google':
      return <Google {...props} />;
    case 'twitter':
      return <Twitter {...props} />;
    case 'horizontal3dots':
      return <Horizontal3Dots {...props} />;
    case 'vertical3dots':
      return <Vertical3Dots {...props} />;

    default:
      return false;
  }
};

export default Icon;
