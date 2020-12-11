import React,{useEffect, useState} from 'react'
import './User.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useStateValue} from './StateProvider';
function User({user, group}) {
  const [{members}, dispatch] = useStateValue();
  const [added, setAdded] = useState(false);
  const addMember = () => {
    dispatch({
      type:"ADD_MEMBER",
      item:{
        id: user.id,
        name: user.name,
        Image: user.Image
      }
    });
    setAdded(true);
  }
  const deleteMember = () => {
    dispatch({
      type: "REMOVE_MEMBER",
      id: user.id
    });
    setAdded(false);
  }
  useEffect (() => {
    console.log(members);
  },[members]);
  return (
    <div className = "user" style = {{opacity: added? 1: 0.5}}>
      <img src = {user.Image} alt = ""/>
      <div className="user__name">
        <h4 style = {{textAlign:"center"}}>{user.name}</h4>
      </div>
      {!group && <div className="user__icons">
      {!added && <IconButton onClick = {addMember}>
        <AddIcon fontSize = "large" style = {{color: "green", marginRight: "auto"}}/>
      </IconButton>}

      {added && <IconButton onClick = {deleteMember}>
        <DeleteIcon fontSize = "large" style = {{color: "red", marginLeft: "auto"}}/>
      </IconButton>}
      </div>}
    </div>
  )
}

export default User
