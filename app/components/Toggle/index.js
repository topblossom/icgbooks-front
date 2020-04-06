/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Border = styled.div`
  width: 30px;
  height: 30px;
  // border: 5px solid black;
  box-shadow: 0px 15px 30px 5px rgba(0, 0, 0, 0.1);
  float: right;
  &:hover {
    box-shadow: 0px 15px 30px 15px rgba(0, 0, 0, 0.3);
    color: white;
  }
`;
const LeftArrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  -webkit-transform: rotate(135deg);
  -webkit-transition: var(--transition-speed);
  transition: var(--transition-speed);
  margin-left: 12px;
  margin-top: 10px;
`;
const RigthArrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  -webkit-transform: rotate(-45deg);
  margin-left: 12px;
  margin-top: 10px;
`;
function Toggle(props) {
  return (
    <Border
      onClick={() => props.changeIsLanguageBarOpen(!props.isLanguageBarOpen)}
    >
      {props.isLanguageBarOpen ? <RigthArrow /> : <LeftArrow />}
    </Border>
  );
}

Toggle.propTypes = {
  changeIsLanguageBarOpen: PropTypes.func,
  isLanguageBarOpen: PropTypes.bool,
};

export default Toggle;
