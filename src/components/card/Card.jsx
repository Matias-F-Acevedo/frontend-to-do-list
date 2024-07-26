import React from "react";
import "./card.css";

function Card({id, title, description,status,onDelete, onCompleted}) {

  function handleDelete() {
    onDelete(id);
  }

  function handleCompleted() {
    onCompleted(id);
  }

  return (
    <div className="card">
    <ul>
        <li className="li-title">{title}</li>
        <li className="li-description">{description}</li>
        <li className="li-status">
          {status ? 
            <span className="status completed">Completed</span> : 
            <span className="status pending">Pending</span>
          }
        </li>
    </ul> 
    <div className="buttons">

      <button className="btn-completed" onClick={()=> handleCompleted()}>Completed</button>
      <button  className="btn-delete" onClick={()=> handleDelete()}>Delete</button>
    </div>
    </div>
   
  );
}

export default Card;