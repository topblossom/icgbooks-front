import React from 'react';
import Facebook from './Facebook';
import Google from './Google';
import Twitter from './Twitter';

const Icon = props => {
  switch (props.name) {
    case 'facebook':
      return <Facebook {...props} />;
    case 'google':
      return <Google {...props} />;
    case 'twitter':
      return <Twitter {...props} />;

    default:
      return false;
  }
};

export default Icon;
