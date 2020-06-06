import React, { useState, useEffect } from 'react';
import listSvg from './assets/img/list.svg';
import axios from 'axios';

import { List, AddList, Tasks } from './components';

// import DB from './assets/db.json';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // const [lists, setLists] = useState(
  //   DB.lists.map(item => {
  //     item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
  //     return item;
  //   })
  // );

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    return setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    console.log(listId, taskObj);
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    return setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    return setLists(newList);
  };

  return <div className="todo">
    <div className="todo__sidebar">
      <List
        items={[
          {
            active: true,
            icon: (<img src={listSvg} alt="List icon" />),
            name: "Все задачи"
          }
        ]} />
        {lists ? (
          <List 
            items={lists}
            isRemovable={true}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            onClickItem={item => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
          />
        ) : (
          'Загрузка...'
        )}
      <AddList onAdd={onAddList} colors={colors} />
    </div>
    <div className="todo__tasks">
      {lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} />}
    </div>  
  </div>
  ;
}

export default App;

      // listLastId={Array.isArray(lists) && lists[lists.length - 1].id
      // в AddList - listLastId={lists[lists.length - 1].id}
      // <AddList onAdd={onAddList} colors={DB.colors} listLastId={lists[lists.length - 1].id}/>