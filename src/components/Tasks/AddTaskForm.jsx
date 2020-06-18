import React, {useState} from 'react';
import axios from 'axios';

import addSvg from "../../assets/img/add.svg";

import "./Tasks.scss";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toogleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
    return;
  };

  const addTask = () => {
    // axios.get('http://localhost:3001/lists/').then(({ data }) => {
    //   console.log(data);
    //   if (data.length >= 10) {
    //     return alert('Нельзя создавать больше 10 списков :(')
    //   }
    // });

    // Пробую создать проверку на невозможность создания больше 10 списков
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsLoading(true);
    axios
      .post(`http://localhost:3001/tasks`, obj)
      .then(({ data }) => {
        console.log(`Добавлен объект задачи: `, data);
        onAddTask(list.id, obj);
        toogleFormVisible();
        setInputValue('');
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!');
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toogleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input 
            className="field"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            type="text" 
            placeholder="Текст задачи" 
          />
          <button disabled={inputValue === '' || isLoading} onClick={addTask} className="button">
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toogleFormVisible} className="button button--grey">Отмена</button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;