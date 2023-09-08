// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import {
//   InputBase,
//   Button,
//   Dialog,
//   DialogContent,
//   Typography,
// } from "@mui/material";
// import Cardcomp from "./component/card";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";

// function App() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     // Load search query and results from session storage on initial render
//     const savedSearchQuery = sessionStorage.getItem("searchQuery");
//     const savedFilteredData = JSON.parse(
//       sessionStorage.getItem("filteredData")
//     );

//     if (savedSearchQuery && savedFilteredData) {
//       console.log(savedSearchQuery, savedFilteredData);
//       setSearchQuery(savedSearchQuery);
//       setFilteredData(savedFilteredData);
//       handleSearch(savedSearchQuery);
//       console.log(filteredData, "onload");
//     } else {
//       fetchData();
//     }
//   }, []);

//   useEffect(() => {
//     // Save search query and filtered results to session storage
//     sessionStorage.setItem("searchQuery", searchQuery);
//     sessionStorage.setItem("filteredData", JSON.stringify(filteredData));
//   }, [searchQuery, filteredData]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       const jsonData = await response.json();
//       setData(jsonData);
//       setFilteredData(jsonData);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (!query) {
//       setFilteredData(data);
//     } else {
//       const filtered = data.filter((post) => {
//         const title = post.title.toLowerCase();
//         const body = post.body.toLowerCase();
//         return (
//           title.includes(query.toLowerCase()) ||
//           body.includes(query.toLowerCase())
//         );
//       });
//       sessionStorage.setItem("filteredData", JSON.stringify(filteredData));
//       setFilteredData(filtered);

//       console.log(filtered, "fn");
//     }
//   };

//   const CenteredBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//   }));

//   const handleDeletePost = (idToDelete) => {
//     const updatedData = data.filter((post) => post.id !== idToDelete);
//     setData(updatedData);
//     setFilteredData(updatedData);
//     sessionStorage.setItem("filteredData", JSON.stringify(updatedData));
//   };

//   const handleOpenComments = (postId) => {
//     setSelectedPost(postId);
//   };

//   const handleCloseComments = () => {
//     setSelectedPost(null);
//   };

//   const handleReload = () => {
//     sessionStorage.clear();
//     fetchData();
//     setSearchQuery("");
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="search">
//             <SearchIcon />
//           </IconButton>
//           <InputBase
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//           />
//         </Toolbar>
//         <Button color="inherit" onClick={handleReload}>
//           Refresh State
//         </Button>
//       </AppBar>
//       <CenteredBox>
//         <Grid container spacing={2} justifyContent="center">
//           {filteredData.map((post, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Cardcomp
//                 id={post.id}
//                 title={post.title}
//                 body={post.body}
//                 onDelete={() => handleDeletePost(post.id)}
//                 onOpenComments={() => handleOpenComments(post.id)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </CenteredBox>
//       <Dialog open={selectedPost !== null} onClose={handleCloseComments}>
//         <DialogContent>
//           <Typography variant="h6">Comments</Typography>
//           {selectedPost !== null &&
//             data
//               .find((post) => post.id === selectedPost)
//               ?.comments.map((comment) => (
//                 <div key={comment.id}>
//                   <strong>{comment.name}</strong>
//                   <p>{comment.body}</p>
//                 </div>
//               ))}
//           <Button onClick={handleCloseComments}>Close</Button>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default App;

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

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    const savedFilteredData = JSON.parse(localStorage.getItem("filteredData"));

    if (savedSearchQuery && savedFilteredData) {
      setSearchQuery(savedSearchQuery);
      setFilteredData(savedFilteredData);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("filteredData", JSON.stringify(filteredData));
  }, [searchQuery, filteredData]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
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

  const handleOpenComments = (postId) => {
    setSelectedPost(postId);
  };

  const handleCloseComments = () => {
    setSelectedPost(null);
  };

  const handleReload = () => {
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("filteredData");
    fetchData();
    setSearchQuery("");
  };

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
      <CenteredBox>
        <Grid container spacing={2} justifyContent="center">
          {JSON.parse(localStorage.getItem("filteredData")) &&
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
                      onOpenComments={() => handleOpenComments(post.id)}
                    />
                  </Grid>
                )
              )}
            </>
          ) : (
            <>
              {filteredData.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Cardcomp
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    onDelete={() => handleDeletePost(post.id)}
                    onOpenComments={() => handleOpenComments(post.id)}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </CenteredBox>
      <Dialog open={selectedPost !== null} onClose={handleCloseComments}>
        <DialogContent>
          <Typography variant="h6">Comments</Typography>
          {selectedPost !== null &&
            data
              .find((post) => post.id === selectedPost)
              ?.comments.map((comment) => (
                <div key={comment.id}>
                  <strong>{comment.name}</strong>
                  <p>{comment.body}</p>
                </div>
              ))}
          <Button onClick={handleCloseComments}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
