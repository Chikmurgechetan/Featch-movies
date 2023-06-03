import  { useState } from "react";
import classes from "./MoviForm.module.css";

const MoviForm = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const newMovieObj = {
      title: title,
      text: text,
      date: date,
    };

    props.onAddMovie(newMovieObj);
    setTitle("");
    setText("");
    setDate("");
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const textChange = (event) => {
    setText(event.target.value);
  };

  const dateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.first}>
        <label htmlFor="title">Title</label>
        <br />
      </div>
      <input id="title" type="text" value={title} onChange={titleChange} />
      <br />
      <label htmlFor="opening">Opening Text</label>
      <br />
      <input id="opening" type="text" value={text} onChange={textChange} />
      <br />
      <label htmlFor="date">Release Date</label>
      <br />
      <input id="date" type="text" value={date} onChange={dateChange} />
      <br />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MoviForm;