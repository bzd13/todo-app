import React from 'react';

import "./EditBtn.scss";

import editSvg from "../../assets/img/edit.svg";

const EditBtn = () => {
  return (
    <img src={editSvg} alt="Edit icon" className="edit-btn"></img>
  );
}

export default EditBtn;