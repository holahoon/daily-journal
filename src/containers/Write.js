import { useState } from "react";
import { makeStyles } from "@material-ui/core";

export default function Write() {
  const [messageInputValue, setMessageInputValue] = useState(
    "this is a sample"
  );

  const classes = useStyles();

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;

    setMessageInputValue(value);
  };

  const onSaveHandler = () => {
    console.log("save");
  };

  const onCancelHandler = () => {
    console.log("cancel");
  };

  return (
    <div>
      <div>
        <button onClick={onSaveHandler}>save</button>
        <button onClick={onCancelHandler}>cancel</button>
      </div>

      <form className={classes.form}>
        <textarea
          className={classes.textArea}
          rows='1'
          placeholder='Write your thoughts here...'
          name='messageText'
          value={messageInputValue}
          onChange={onChangeHandler}
        />
      </form>
    </div>
  );
}

const useStyles = makeStyles({
  form: {
    marginTop: "50px",
  },
  textArea: {
    width: "100%",
    height: "700px",
    border: "none",
  },
});
