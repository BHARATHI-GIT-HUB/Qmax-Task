import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  InputBase,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import Cardcomp from "./component/card";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [dialogPop, setdialogPop] = useState(false);
  const [dialogData, setdialogData] = useState([]);
  const [postId, setpostId] = useState(1);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    const savedFilteredData = JSON.parse(localStorage.getItem("filteredData"));

    if (savedSearchQuery && savedFilteredData) {
      setSearchQuery(savedSearchQuery);
      setFilteredData(savedFilteredData);
    } else {
      fetchData("https://jsonplaceholder.typicode.com/posts", "postData");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("filteredData", JSON.stringify(filteredData));
  }, [searchQuery, filteredData]);

  useEffect(() => {
    fetchData(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      "dialogData"
    );
  }, [dialogPop]);

  useEffect(() => {
    console.log(postId, dialogPop, dialogData);
  }, [postId, dialogPop]);

  const fetchData = async (url, dataFor) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      if (dataFor === "postData") {
        setData(jsonData);
        setFilteredData(jsonData);
      } else {
        setdialogData(jsonData);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((post) => {
        const title = post.title.toLowerCase();
        const body = post.body.toLowerCase();
        return (
          title.includes(query.toLowerCase()) ||
          body.includes(query.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  const CenteredBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100vw",
  }));

  const handleDeletePost = (idToDelete) => {
    const updatedData = data.filter((post) => post.id !== idToDelete);
    setData(updatedData);
    setFilteredData(updatedData);
    localStorage.setItem("filteredData", JSON.stringify(updatedData));
  };

  const handleOpenComments = (currPostId) => {
    setSelectedPost(currPostId);
  };

  const handleCloseComments = () => {
    setdialogPop(false);
  };

  const handleReload = () => {
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("filteredData");
    fetchData();
    setSearchQuery("");
  };

  const filteredDataFromLocalStorage = JSON.parse(
    localStorage.getItem("filteredData")
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Toolbar>
        <Button color="inherit" onClick={handleReload}>
          Refresh State
        </Button>
      </AppBar>
      <CenteredBox style={{ marginLeft: "5px", marginTop: "10px" }}>
        <Grid container spacing={2} justifyContent="center">
          {filteredDataFromLocalStorage &&
          localStorage.getItem("searchQuery") ? (
            <>
              {JSON.parse(localStorage.getItem("filteredData")).map(
                (post, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Cardcomp
                      id={post.id}
                      title={post.title}
                      body={post.body}
                      onDelete={() => handleDeletePost(post.id)}
                      postId={postId}
                      setpostId={setpostId}
                      setdialogPop={setdialogPop}
                      onOpenComments={() => handleOpenComments(post.id)}
                    />
                  </Grid>
                )
              )}
            </>
          ) : (
            <>
              {filteredData.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Cardcomp
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    onDelete={() => handleDeletePost(post.id)}
                    postId={postId}
                    setpostId={setpostId}
                    setdialogPop={setdialogPop}
                    onOpenComments={() => handleOpenComments(post.id)}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </CenteredBox>
      <Dialog open={dialogPop} onClose={handleCloseComments}>
        <DialogContent>
          <Typography variant="h6">Comments</Typography>
          {dialogPop &&
            dialogData.map((Comment, index) => (
              <Box
                sx={{
                  minWidth: 320,
                  maxWidth: 350,
                  height: 240,
                  border: 1,
                  borderColor: "grey.500",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
                style={{ border: "1x solid black" }}
              >
                <p>{Comment.name}</p>
                <p>{Comment.email}</p>
                <p>{Comment.body}</p>
              </Box>
            ))}
          <Button onClick={handleCloseComments}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
