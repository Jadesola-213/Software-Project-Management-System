import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getBoard, moveCard, moveList } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import BoardTitle from "../board/BoardTitle";
import BoardDrawer from "../board/BoardDrawer";
import List from "../list/List";
import CreateList from "../board/CreateList";
import Members from "../board/Members";
import Navbar from "../other/Navbar";
import Modal from "../popup/modal";

const Board = ({ match }) => {
  const [open2, setOpen2] = useState(false);

  const board = useSelector((state) => state.board.board);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + " | PMT";
  }, [board?.title]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "card") {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      <Box className="board-loading">
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className="board-and-navbar"
      style={{
        backgroundColor: "#63d471",
        backgroundImage: "linear-gradient(315deg, #63d471 0%, #233329 74%)",
      }}
    >
      <Navbar />
      <section className="board">
        <div className="board-top">
          <div className="board-top-left">
            <BoardTitle board={board} />
            <Members />
          </div>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} open2={open2} setOpen2={setOpen2} />
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
      {open2 ? <Modal open2={true} setOpen2={setOpen2} /> : null}
    </div>
  );
};

export default Board;
