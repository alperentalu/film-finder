import React, { Component } from "react";
import FilmService from "../service/FilmService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
  TablePagination,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Dialog,
  Paper,
  Button,
  DialogContent
} from "@mui/material";
import { home } from "../style/page/Home";
import { Close } from "@mui/icons-material";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      shownDetail: false,
      selectedFilm: null,
      page: 1,
      totalPage: null,
      searchParams: {
        type: null,
        year: null,
        film: "pokemon",
      },
    };
  }
  componentDidMount() {
    this.getSearch();
  }
  getSearch = (page) => {
    FilmService.getFilms(this.state.searchParams, page).then((res) => {
      this.setState({ films: res.Search, totalPage: res.totalResults });
    });
  };
  handleChange = (e) => {
    let searchParams = this.state.searchParams;
    searchParams[e.target.name] = e.target.value;
    this.setState({ searchParams: searchParams });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage + 1 });
    this.getSearch(newPage + 1);
  };

  getDetail = (i) => {
    FilmService.getDetails(i).then((res) => {
      this.setState({ selectedFilm: res, shownDetail: true });
    });
  };

  handleCloseDialog = () => {
    this.setState({ shownDetail: false });
  };

  render() {
    const {
      films,
      film,
      year,
      selectedFilm,
      type,
      shownDetail,
      totalPage,
      page,
    } = this.state;
    return (
      <div style={home.container}>
        <div style={home.filterContainer}>
          <TextField
            name="film"
            value={film}
            onChange={this.handleChange}
            variant="outlined"
            label="Search Film"
          ></TextField>
          <TextField
            name="year"
            value={year}
            onChange={this.handleChange}
            variant="outlined"
            label="Year"
          ></TextField>
          <FormControl style={home.formEl}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="type"
              id="demo-simple-select"
              value={type}
              label="type"
              onChange={this.handleChange}
            >
              <MenuItem value={""}>Clear</MenuItem>
              <MenuItem value={"movie"}>Movie</MenuItem>
              <MenuItem value={"serie"}>Serie</MenuItem>
              <MenuItem value={"episode"}>Episode</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              this.getSearch(1);
            }}
            variant="outlined"
          >
            Search
          </Button>
        </div>
        <TableContainer style={home.tableContainer} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Film</TableCell>
                <TableCell align="center">Poster</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Imdb ID</TableCell>
                <TableCell align="center">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {films.map((row, index) => (
                <TableRow
                  onClick={() => this.getDetail(row.imdbID)}
                  key={index}
                  style={{cursor: 'pointer' }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0} }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.Title}
                  </TableCell>
                  <TableCell align="center">
                    <img style={home.poster} alt="poster" src={row.Poster} />
                  </TableCell>
                  <TableCell align="center">{row.Type}</TableCell>
                  <TableCell align="center">{row.imdbID}</TableCell>
                  <TableCell align="center">{row.Year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={false}
          component="div"
          count={totalPage}
          rowsPerPage={10}
          page={page - 1}
          onPageChange={this.handleChangePage}
        />

        <Dialog onClose={this.handleCloseDialog} open={shownDetail}>
          <Close onClick={() => {this.setState({shownDetail: false})}} style={home.closeIcon}/>
          <DialogTitle>{selectedFilm?.Title}</DialogTitle>
          <DialogContent>
          <div style={home.detailContainer}>
            <img alt="poster" style={home.detailPoster} src={selectedFilm?.Poster}/>
            <div style={home.detailColumn}>
              <span>{"Run Time"}</span>
              <span>{"Genre"}</span>
              <span>{"Director"}</span>
              <span>{"Box Office"}</span>
              <span>{"IMDB Rating"}</span>
              <span>{"Languages"}</span>
            </div>
            <div style={home.detailColumn}>
              <span style={home.detailCell}>{selectedFilm?.Runtime  || "N/A"}</span>
              <span style={home.detailCell}>{selectedFilm?.Genre  || "N/A"}</span>
              <span style={home.detailCell}>{selectedFilm?.Director  || "N/A"}</span>
              <span style={home.detailCell}>{selectedFilm?.BoxOffice || "N/A"}</span>
              <span style={home.detailCell}>{selectedFilm?.imdbRating  || "N/A"}</span>
              <span style={home.detailCell}>{selectedFilm?.Language  || "N/A"}</span>
            </div>
          </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Home;
