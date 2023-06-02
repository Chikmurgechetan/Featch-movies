import React, { useState } from "react";
import classes from './MoviForm.module.css'

const MoviForm = () =>{
  const[title,setTitle] = useState('');
  const[text,setText] = useState('');
  const[date, setDate] = useState('');

    const SubmitHandler = (event) =>{
        event.preventDefault();

        const NewMovieObj = {
            title:title,
            text:text,
            date:date
          }
          console.log(NewMovieObj);
    }

    const titleChange = (event)=>{
        setTitle(event.target.value);
    }
    const textChange = (event)=>{
        setText(event.target.value);
    }
    const dateChange = (event)=>{
        setDate(event.target.value);
    }


    return(
           <form onSubmit={SubmitHandler} className={classes.form}>
            <div className={classes.first}>
            <label htmlFor="title">Title</label><br/>
            </div>
            <input id="title" type="text" value={title} onChange={titleChange}/><br/>
           
            <label htmlFor="opening">Opening Text</label><br/>
            <input id="opening" type="text" value={text} onChange={textChange }/><br/>
            <label htmlFor="date">Relase Date</label><br/>
            <input id="date" type="text" value={date} onChange={dateChange}/><br/>
            <button type="submit">Add Movie</button>
           </form>
    )};
    export default MoviForm;