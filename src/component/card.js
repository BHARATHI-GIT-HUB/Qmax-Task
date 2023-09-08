import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const Cardcomp = ({ id, body, title, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          minWidth: 320,
          maxWidth: 350,
          height: 240,
          border: 1,
          borderColor: "grey.500",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <div>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: "text.secondary",
              }}
              gutterBottom
            >
              {body}
            </Typography>
          </div>
          <Button
            size="small"
            sx={{ alignSelf: "center", marginTop: "auto" }}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Cardcomp;
