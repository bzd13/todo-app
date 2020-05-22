import React, { useState } from 'react';
import List from "./components/List/index"
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList';

import DB from './assets/db.json'

function App() {
  const [lists, setLists] = useState(
    DB.lists.map(item => {
      item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
      return item;
    })
  );

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    console.log(newList);
    return setLists(newList);
  }

  return <div className="todo">
    <div className="todo__sidebar">
      <List
        items={[
          {
            icon: (<img src={listSvg} alt="List icon" />),
            name: "Все задачи",
            active: true
          }
        ]} />
      <List items={lists}
      isRemovable={true}
      />
      <AddList onAdd={onAddList} colors={DB.colors} listLastId={lists[lists.length - 1].id}/>
    </div>
    <div className="todo__tasks"></div>  
  </div>
  ;
}

export default App;

      // в AddList - listLastId={lists[lists.length - 1].id}