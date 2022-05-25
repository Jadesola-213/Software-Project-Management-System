import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addCard } from "../../actions/board";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const CreateCardForm = ({ listId, setAdding, setOpen2, open2 }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle("");
  };

  return (
    <form
      ref={formRef}
      className="create-card-form"
      onSubmit={(e) => onSubmit(e)}
    >
      <Card>
        <CardContent className="card-edit-content">
          <TextField
            margin="normal"
            fullWidth
            multiline
            required
            label="Enter a title for this card"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
          />
        </CardContent>
      </Card>
      <div className="card-actions">
          <Button
            style={{ margin: "0.25rem 0.25rem 0 0" }}
            variant="contained"
            color="primary"
            onClick={()=>setOpen2(true)}
          >
            Free Trial
          </Button>
        <Button
          style={{ margin: "0.25rem 0 0 0.25rem" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Card
        </Button>
        <Button
          onClick={() => {
            setAdding(false);
            setTitle("");
          }}
        >
          <CloseIcon />
        </Button>
      </div>
    </form>
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
