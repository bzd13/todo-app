import React from 'react';
import List from "./components/List/index"
import listSvg from './assets/img/list.svg';

function App() {
  return <div className="todo">
    <div className="todo__sidebar">
      <List items={[
        {
          icon: (<img src={listSvg} alt="List icon" />),
          name: "Все задачи",
          active: true
        }
      ]} />
      <List items={[
        {
          color: "blue",
          name: "Покупки",
        },
        {
          color: "pink",
          name: "Фронтенд"
        },
        {
          color: "lightGreen",
          name: "Фильмы и сериалы"
        },
        {
          color: "grey",
          name: "Фронтенд"
        },
        {
          color: "black",
          name: "Фронтенд"
        },
      ]}
      isRemovable={true}
      />
      <List items={[
        {
          icon: (
          <svg 
          width="12" 
          height="12" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="list__add-button"
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
      isRemovable={true}
      />
    </div>
    <div className="todo__tasks"></div>  
  </div>
  ;
}

export default App;
