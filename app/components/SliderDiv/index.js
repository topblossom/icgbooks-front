import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

const Menu = styled.ul`
  display: table-cell;
  padding-inline-start: 0px;
  box-shadow: 0px 15px 30px 5px rgba(0, 0, 0, 0.4);
  height: 30px;
  max-width: 100%;
  -webkit-transition: max-width 0.5s ease;
  transition: max-width 0.5s ease;
`;
const Element = styled.li`
  display: inline;
  padding: 0 10px 7px 10px;
  &:hover {
    box-shadow: 0px 15px 30px 5px rgba(0, 0, 0, 0.1);
  }
`;
const ChooseLanguage = styled(ButtonBase)`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
const OuterSlider = styled.div`
  // position: absolute;
  float: left;
  margin-right: 3px;
`;
function SliderDiv(props) {
  let content;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <Element key={value}>
        <ChooseLanguage type="submit" onClick={props.onToggle}>
          {value}
        </ChooseLanguage>
      </Element>
    ));
  }
  return (
    <OuterSlider>
      {props.isLanguageBarOpen ? (
        <Menu value={props.value} onChange={props.onToggle}>
          {content}
        </Menu>
      ) : (
        <div />
      )}
    </OuterSlider>
  );
}

SliderDiv.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  isLanguageBarOpen: PropTypes.bool,
};

export default SliderDiv;
