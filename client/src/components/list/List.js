import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getList, editList, editList2 } from "../../actions/board";
import ListTitle from "./ListTitle";
import ListMenu from "./ListMenu";
import Card from "../card/Card";
import CreateCardForm from "./CreateCardForm";
import Button from "@material-ui/core/Button";
import { storage } from "../../firebase/firebase";
import { styled } from "@mui/material/styles";
import { Redirect, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const List = ({ listId, index, open2, setOpen2 }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [data, setData] = useState("");

  const Input = styled("input")({
    display: "none",
  });

  const attachFiles = async (file) => {
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      const uploadTask = storage.ref(`uploads/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("uploads")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              dispatch(editList(list._id, { title: url }));
              console.log(url);
              setData(url);
            })
            .catch((err) => console.log(err));
        }
      );
    }
  };

  const [addingCard, setAddingCard] = useState(false);

  const list = useSelector((state) =>
    state.board.board.listObjects.find((object) => object._id === listId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId, data]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !list || (list && list.archived) ? (
    ""
  ) : (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className="list-wrapper"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-top">
            <ListTitle list={list} />
            <ListMenu listId={listId} />
          </div>
          <Droppable droppableId={listId} type="card">
            {(provided) => (
              <div
                className={`list ${
                  addingCard ? "adding-card" : "not-adding-card"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="cards">
                  {list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      list={list}
                      index={index}
                    />
                  ))}
                  {list.files
                    ? list.files.map((data, i) => {
                        return (
                          <div>
                            <br />
                            <div><h3>Attached Files :</h3></div>
                            <br />
                            <span>
                              <a style={{ textDecoration: "none" }} href={data}>
                                Attachment {i + 1}
                              </a>
                              <Button
                                onClick={() => {
                                  // Create a reference to the file to delete
                                  var fileRef = storage.refFromURL(data);

                                  // Delete the file using the delete() method
                                  fileRef
                                    .delete()
                                    .then(function () {
                                      // File deleted successfully
                                      console.log("File Deleted");
                                    })
                                    .catch(function (error) {
                                      // Some Error occurred
                                    });
                                  dispatch(editList2(list._id, { title: i }));
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </span>
                          </div>
                        );
                      })
                    : null}
                </div>
                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm listId={listId} setAdding={setAddingCard} open2={open2} setOpen2={setOpen2} />
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingCard && (
            <div className="create-card-button">
              <Button
                style={{ margin: "0.25rem" }}
                variant="contained"
                onClick={() => setAddingCard(true)}
              >
                + Add a card
              </Button>
              <label htmlFor="contained-button-file">
                <Input
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    attachFiles(e.target.files[0]);
                  }}
                />
                <Button
                  style={{ margin: "0.25rem" }}
                  variant="contained"
                  component="span"
                >
                  Attach 📎
                </Button>
              </label>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
