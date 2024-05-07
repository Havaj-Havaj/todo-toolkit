import { useEffect, useState } from "react";


function App() {
  const [text, setText] = useState('') //значение инпут
  const [todo, setTodo] = useState([]) // массив списка дел
  const [formvalid, setFormvalid] = useState(false) //валидность кнопки add

 const url = "http://localhost:3001/data"

 const getTodo = async () => {
  try{
    let response = await fetch(url)
    let data = await response.json()
    setTodo(data)
  }
 }


  useEffect(()=>{
    if(text==''){
      setFormvalid(false)
    }else setFormvalid(true)
  }, [text])



  const removeTodo =(todoId)=>{
    setTodo(todo.filter(el => el.id !== todoId))
    console.log(todo);
  }
  
  const addtodo =() =>{
    if (text.trim().length){
      setTodo([
        ... todo,
        {
          id: new Date(),
          text,
          comleted: false

        }
      ])
      setText('')
    
    }
   
  }

  return (
    <div >
      <form onSubmit={(e)=>e.preventDefault()}>
        <input value={text} type="text" onChange={(e)=> setText(e.target. value)}/>
        <button disabled={!formvalid} onClick={addtodo}>add</button>
      </form>
      <ul>
      {todo.map(el => 
      <li key={el.id}>
        <input type='checkbox'/>
        <span>{el.text}</span>
        <button onClick={()=>removeTodo(el.id)}>&times;</button>
      </li>)}
     
      </ul>
      
    </div>
  );
}

export default App;
