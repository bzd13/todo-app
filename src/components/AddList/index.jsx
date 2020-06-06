import React, {useState, useEffect} from 'react';
import axios from 'axios';

import List from '../List/index.jsx';
import Badge from '../Badge';

import closeSvg from '../../assets/img/close.svg'

import './AddList.scss';

const AddList = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    selectColor(colors[0].id);
    setInputValue('');
  }

  const addList = () => {
    if (!inputValue) {
      alert("Дядя, ты шо, введи значение");
      return;
    }
    // const color = colors.filter(color => color.id === selectedColor)[0].name;
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', { 
        name: inputValue, 
        colorId: selectedColor 
      })
      .then(({ data }) => {
        const color = colors.filter(color => color.id === selectedColor)[0].name;
        const listObj = {...data, color: { name: color} };
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!');
      })
      .finally(() => {
        setIsLoading(false);
        return;
      });
    // onAdd({"id": listLastId + 1, "name": inputValue, "color": color});
  };
  // или "id": Math.random(), убрать из пропсов listLastId, из App убрать из параметров AddList listLastId 

  return (
    <div className="add-list">
      <List 
      onClick={() => setVisiblePopup(true)}
      items={[
        {
          className: "list__add-button",
          icon: (
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
            <path 
              d="M8 1V15" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M1 8H15" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            </svg>),
          name: "Добавить список",
        }
      ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img src={closeSvg} alt="Close button" onClick={onClose} className="add-list__popup-close-btn" />
          <input 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            className="field" 
            type="text" 
            placeholder="Название списка">
          </input>
          <div className="add-list__popup-colors">
            {colors.map(color => (
              <Badge 
                onClick={() => selectColor(color.id)} 
                key={color.id} 
                color={color.name} 
                className={selectedColor === color.id && 'active'}/>
              ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  )
};

export default AddList;