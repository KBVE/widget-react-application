//*       [React]:[Application]
//!       [IMPORTS]
import React, { useEffect, useState } from "react";
// import * as ReactDOM from 'react-dom';

//*       Import @mui
//*       @mui/material
import Grid from "@mui/material/Grid";
// import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
//import Chip from "@mui/material/Chip";
//import Switch from "@mui/material/Switch";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Masonry } from "@mui/lab";
//*       @mui Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import useMediaQuery from '@mui/material/useMediaQuery';

function renderPost(post) {
  const {
    slug,
    data: { title, id, description, img },
  } = post;

  return (
    <Paper item xs={4} key={id}>
      <Card>
        <CardMedia sx={{ height: 140 }} image={img} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link
              href={`https://kbve.com/application/${slug}/`}
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Paper>
  );
}

function App({ kbve_dom_element }) {
  const _limit = kbve_dom_element.getAttribute("data-limit");
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = true;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://kbve.com/application/application.json")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data.slice(0, _limit));
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError("error fetching from KBVE");
      });
  }, [_limit]);



  function noDraft(post) {
    return !post.data.draft;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container>
          {loading && "Loading..."}
          {error && error}
          {!!data.length && (
            <Masonry columns={2} spacing={2}>
              {data.filter(noDraft).map(renderPost)}
            </Masonry>
          )}
        </Grid>

        <Card>
          <Box sx={{ p: 1 }}>
            <Stack 
            alignItems="center"
            justifyContent="center"
            spacing={0.5}>
            ◈
            </Stack>
          </Box>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ px: 2, py: 1, bgcolor: "background.default" }}
          >
            <Link
              href="https://kbve.com/"
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              color="text.primary"
            >
              Widget by KBVE
            </Link>
          </Stack>
        </Card>
      </ThemeProvider>
    </>
  );
}

export default App;
