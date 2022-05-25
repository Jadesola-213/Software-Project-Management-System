import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getBoards, deleteBoards } from "../../actions/board";
import CreateBoard from "../other/CreateBoard";
import Navbar from "../other/Navbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | PMT";
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        backgroundColor: "#63d471",
        backgroundImage: "linear-gradient(315deg, #63d471 0%, #233329 74%)",
        minHeight: "100vh",
      }}
      className="dashboard-and-navbar"
    >
      <Navbar />
      <section className="dashboard">
        <h1 style={{ fontSize: "2rem", fontWeight: "bolder", color: '#fff' }}>
          Welcome {user && user.name}
        </h1>
        <h2
          style={{ fontSize: "1.5rem", margin: "1.5rem", fontWeight: "bold", color: '#fff' }}
        >
          Your Boards
        </h2>
        {loading && <CircularProgress className="dashboard-loading" />}
        <div className="boards">
          {boards.map((board) => (
            <div className="board-card" style={{ position: "relative" }}>
              <Link
                key={board._id}
                to={`/board/${board._id}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {board.title}
              </Link>
              <div
                onClick={() => {
                  dispatch(deleteBoards(board._id));
                }}
                style={{
                  float: "right",
                  bottom: "3px",
                  position: "absolute",
                  cursor: "pointer",
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          ))}
          <CreateBoard />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
