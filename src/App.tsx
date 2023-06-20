import { ChangeEvent, MouseEventHandler, useState } from "react";
import './styles.css';
import TodoItem from "./todo";
import Navbar from "./assets/components/Navbar";

function App() {
  let todoItems:
    TodoItem[] = [

      {
        name: 'Do coding',
        time: '3:54am'
      },
      {
        name: 'Something else',
        time: '12:54am'
      },
      {
        name: 'Walk around',
        time: '8:00pm'
      },
    ];


  const [items, setItems] = useState(todoItems)
  const [inputText, setInputText] = useState('')

  let datas = Object.values(items);
  let todos = datas.map(function (todo) {
    return <TodoCard
      {...todo}
      fxn={handleRemove}
    />
  });

  function handleRemove(e: any) {
    let name = e.target.parentElement.children[0].textContent;
    let time = e.target.parentElement.children[1].textContent;
    setItems(function (prevItems) {
      const index = prevItems.findIndex((item) => {
        return item.name == name && item.time == time
      })
      let newData: TodoItem[] = [];
      for (let i = 0; i < prevItems.length; i++) {
        if (i != index) newData.push(prevItems[i])
      }
      return newData;
    })
  }


  function getAmPm() {
    const hour = new Date().getHours();
    if (hour > 11) return 'pm';
    return 'am';
  }

  function addItemToList() {
    let text = inputText
    let data = new Date();
    const time = `${data.getHours()}:${data.getMinutes()}${getAmPm()}`
    const newData: TodoItem = {
      name: text,
      time: time,
    }
    setItems(function (previous) {
      const newList = [...previous, newData]
      return newList;
    })
    setInputText('')
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputText(value)
  }




  return (
    <>
      <Navbar />
      <div className="list-body">
        <div className="todo-list">
          <p>List</p>
          {...todos}
        </div>
        <div className="input-area">
          <input type="text" className="input-field" value={inputText}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={addItemToList}
          >Add to list</button>
        </div>
      </div>
    </>

  )
}



function TodoCard(props: { name: string, time: string, fxn: MouseEventHandler }) {
  return (
    <div className="todo-card"   >
      <div className="todo-title">{props.name}</div>
      <div className="todo-time">{props.time}</div>
      <p className="remove"
        onClick={props.fxn}
      >remove</p>
    </div>
  )

}

export default App
