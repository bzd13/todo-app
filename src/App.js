import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import listSvg from './assets/img/list.svg';
import { AddList, List, Tasks } from './components';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
    // axios.get('http://localhost:3001/lists/').then(({ data }) => {
    //   setActiveItem(data);
    // });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    return setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    // console.log(listId, taskObj);
    // console.log(taskObj.id);
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text)
    
    if (!newTaskText) {
      return alert('Введите текст задачи!');
    } 

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.filter(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios.patch('http://localhost:3001/tasks/' + taskObj.id, { text: newTaskText }).catch(e => {
      console.log(e);
      alert('Не удалось изменить текст задачи');
    });
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList)
      axios
        .delete('http://localhost:3001/tasks/' + taskId)
        .catch(e => {
        console.log(e);
        alert('Не удалось удалить задачу');
      });
    }
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks.map(task => {
          console.log(task.id, taskId);
          if (task.id === taskId) {
            task.completed = completed;
          };
          return task;
        });
      };
      return list;
    });
    // const newList = lists.map(list => {
    //   if (list.id === listId) {
    //     list.tasks = list.tasks.filter(task => {
    //       if (task.id === taskId) {
    //         task.completed = completed;
    //       }
    //       return task;
    //     });
    //   }
    //   return list;
    // });
    // другой способ
    setLists(newList);
    axios.patch('http://localhost:3001/tasks/' + taskId, { completed: completed }).catch(e => {
      console.log(e);
      alert('Не удалось обновить задачу');
    });
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    return setLists(newList);
  };

  const setNewActiveItem = (id) => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      const list = data.find(list => list.id === Number(id));
      history.push(`/lists/${list.id}`);
      setActiveItem(list);
    });
  };

  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={list => {
            history.push(`/`);
            setActiveItem(list);
          }}
          items={[
            {
              active: history.location.pathname === '/',
              icon: (<img src={listSvg} alt="List icon" />),
              name: "Все задачи"
            }
          ]} 
        />
        {lists ? (
          <List 
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            onClickItem={list => {
              history.push(`/lists/${list.id}`);
              setActiveItem(list);
            }}
            activeItem={activeItem}
            isRemovable={true}
            setNewActiveItem={setNewActiveItem}
          />
        ) : (
          'Загрузка...'
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists && lists.map(list => (
            <Tasks 
              key={list.id}
              list={list} 
              onAddTask={onAddTask} 
              onEditTitle={onEditListTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              withoutEmpty
            />
          ))}
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem && (
            <Tasks
              list={activeItem} 
              onAddTask={onAddTask} 
              onEditTitle={onEditListTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
            />
          )}
        </Route>
      </div>  
    </div>
  );
}

export default App;