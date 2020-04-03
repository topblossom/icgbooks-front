import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalWindow = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const CloseIcon = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;
function AddShelfWindow({
  onChangeIsOpenAddWindow,
  isOpenAddWindow,
  addShelf,
}) {
  return (
    <ModalWindow>
      <form onSubmit={addShelf}>
        <div>Repository name</div>
        <input type="text" name="newShelf" />
        <CloseIcon onClick={() => onChangeIsOpenAddWindow(!isOpenAddWindow)}>
          &times;
        </CloseIcon>
        <button type="submit">Add shelf</button>
      </form>
    </ModalWindow>
  );
}

AddShelfWindow.propTypes = {
  onChangeIsOpenAddWindow: PropTypes.func,
  addShelf: PropTypes.func,
  isOpenAddWindow: PropTypes.bool,
};

export default AddShelfWindow;
