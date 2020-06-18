import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import editSvg from "../../assets/img/edit.svg";

import './Tasks.scss'
import AddTaskForm from './AddTaskForm';
import Task from './Task';

const Tasks = ({ list, onAddTask, onEditTitle, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {

  const editTitle = () => {
    let newTitle = window.prompt('Введите название', list.name);
    if (newTitle === '') {
      return alert('Название не может быть пустым!');      
    } else {
      if (newTitle === null) {
        newTitle = list.name;
      }
      onEditTitle(list.id, newTitle);
      axios.patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось обновить название списка.');
      });
    };
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title"> 
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </Link>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks && list.tasks.map((task, index) => (
          <Task 
            key={index} 
            list={list} 
            onEdit={onEditTask} 
            onRemove={onRemoveTask}
            onComplete={onCompleteTask}
            {...task}
          />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;

/* <h2 className={classNames("tasks__title", {[`tasks__title--${colors[list.colorId].name}`]: colors})}>  */