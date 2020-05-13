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
          name: "Покупки"
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
      ]} />
    </div>
    <div className="todo__tasks"></div>  
  </div>
  ;
}

export default App;
