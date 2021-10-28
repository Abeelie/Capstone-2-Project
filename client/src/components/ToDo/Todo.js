import React from "react";
import Modal from "../Modal/Modal";
import Button from '@material-ui/core/Button';
import { v4 as uuid } from "uuid";

const ToDo = (props) => {
    return (
        <Modal open={props.open} close={props.handleToDoClose} style={{}}>
            <div className="todo-container">
                <h2 style={{textAlign: "center"}}>To-Do List</h2>
                    <ol start="1">
                        {props.toDoList.map(item => ( 
                            <li key={uuid()} id={item} style={{lineHeight: "40px"}}>
                                {item} 
                                <Button variant="contained" 
                                        color="secondary"
                                        style={{float: "right", fontSize: "10px"}}
                                        onClick={() => props.removeTodo(item)}>
                                        Delete
                                </Button>
                            </li>
                        ))}
                    </ol>
            </div>
        </Modal>
    )
}


export default ToDo