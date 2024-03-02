import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import {firebase} from './firebase'
import {addDoc,collection} from '@firebase/firestore'
import Form from './component/Form';
function App() {
  const [transit,setTransit]=useState('');
  const handleChange=(e)=>{
    setTransit(e.target.value)
  }
  return (
    <div className="App">
     {/* <label>
      set time:
      <input
      type='text'
      value={transit}
      onChange={(e)=>handleChange(e)} />
     </label>
     <button>submit</button> */}
     <Form/>
    </div>
  );
}

export default App;
