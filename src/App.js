//*       [React]:[Application]
//!       [IMPORTS]
import React, { useEffect, useState } from "react";
// import * as ReactDOM from 'react-dom';

//*       Import @mui
//*       @mui/material
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
//import Modal from '@mui/material/Modal';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
//import Masonry from "@mui/lab/Masonry";
//*       @mui Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import useMediaQuery from '@mui/material/useMediaQuery';

//*       Carousel
import Carousel from 'react-material-ui-carousel'


function App({ kbve_dom_element }) {
  const _limit = kbve_dom_element.getAttribute("data-limit");
  const _dataJSON = kbve_dom_element.getAttribute("data-json");
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
    fetch(`https://kbve.com/${_dataJSON}/${_dataJSON}.json`)
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
  }, [_dataJSON, _limit]);

  function renderPost(post) {
    const {
      slug,
      data: { title, id, description, img },
    } = post;
  
    return (
      <Paper item xs={4} key={id}>
        <Card>
          <CardMedia sx={{ height: 140 }} image={img} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Link
                href={`https://kbve.com/${_dataJSON}/${slug}/`}
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
          <Box
            m={1}
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="center"
           
          >
            <Button variant="contained" sx={{m: 1}} size="small">KBVE</Button>
            <Button variant="contained" sx={{m: 1}} size="small">Share</Button>
            <Button variant="contained" sx={{m: 1}} size="small">Learn More</Button>
            </Box>
          </CardActions>
        </Card>
      </Paper>
    );
  }
  

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
            <Carousel>
              {data.filter(noDraft).map(renderPost)}
            </Carousel>
          )}
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
