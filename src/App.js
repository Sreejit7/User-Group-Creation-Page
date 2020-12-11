
import React,{useState,useEffect} from 'react';
import './App.css';
import { useStateValue } from './StateProvider';
import User from './User';
function App() {
  const [{name, desc, members}, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json";
  const [groupCreated, setGroupCreated] = useState(false);
  const sortData = (data) => {
    let sortedData = [...data];
    return sortedData.sort((a,b) => (a.name < b.name? -1 : 1));
  }
  useEffect (() => {
    fetch(proxyurl + url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUsers(data);
    });
  },[]);
  const setName = (value) => {
    dispatch({
      type: "SET_NAME",
      name: value
    })
  };
  const setDesc = (value) => {
    dispatch({
      type: "SET_DESC",
      desc: value
    })
  }
  return (
    <div className="app">
      
      {!groupCreated && <div className="app__body">
      <h1 className = "app__header">Who will you take in your group?</h1>
      <div className="group__input">
        <input type = "text" placeholder = "Enter group name" onChange = {e => setName(e.target.value)}/>
        <input type = "text" placeholder = "Enter group description" onChange = {e => setDesc(e.target.value)} />
      </div>
      <button onClick = {() => setUsers(sortData(users))}>Sort Users By Name</button>
      <div className="users__container">
        {
          users.map((item) => (
            <User 
              user = {item}
              group = {false}
            />
          ))
        }
      </div>
      <button className = "create__group" onClick = {() => setGroupCreated(true)}>Create Group</button>
      </div>}
      {groupCreated && <div className = "app__body">
        <h1 className = "app__header">Here's your group!</h1>
          <h1>{name}</h1>
          <h4>{desc}</h4>
          <div className = "users__container">
          {members.map((member) => (
            <User 
              user = {member}
              group = {true}
            />
          ))}
          </div>
      </div>}
    </div> 
  );
}

export default App;
