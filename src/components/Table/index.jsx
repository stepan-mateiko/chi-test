import React, { useState } from "react";
import propTypes from "prop-types";
import {
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { StyledTable, Heading, Pagination, StyledHeader, TableHead, TableRow, TableHeaderCell, TableDataCell } from "./styles";

const Table = ({
  handleEditModalOpen,
  handleDeleteModalOpen,
  cars,
  error,
  isLoading,
  handleAddModalOpen,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCars = cars.filter((item) => {
    const searchTerm = searchQuery.toLowerCase();
    const {
      car,
      car_model,
      car_vin,
      car_color,
      car_model_year,
      price,
      availability,
    } = item;

    return (
      car.toLowerCase().includes(searchTerm) ||
      car_model.toLowerCase().includes(searchTerm) ||
      car_vin.toLowerCase().includes(searchTerm) ||
      car_color.toLowerCase().includes(searchTerm) ||
      car_model_year.toString().includes(searchTerm) ||
      price.toString().includes(searchTerm) ||
      availability.toLowerCase().includes(searchTerm)
    );
  });

  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars =
    searchQuery === ""
      ? filteredCars.slice(indexOfFirstItem, indexOfLastItem)
      : filteredCars.slice(0, 50);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <StyledHeader>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search cars..."
          name="search"
        />
        <Button variant="contained" onClick={() => handleAddModalOpen({})}>
          Add Car
        </Button>
      </StyledHeader>
      <StyledTable>
        <Heading>Our Cars</Heading>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Company</TableHeaderCell>
            <TableHeaderCell>Model</TableHeaderCell>
            <TableHeaderCell>VIN</TableHeaderCell>
            <TableHeaderCell>Color</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Availability</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        {isLoading && <CircularProgress />}
        {error && <div>{error}</div>}
        <tbody>
          {currentCars.map((item) => (
            <TableRow key={item.id}>
              <TableDataCell>{item.car}</TableDataCell>
              <TableDataCell>{item.car_model}</TableDataCell>
              <TableDataCell>{item.car_vin}</TableDataCell>
              <TableDataCell>{item.car_color}</TableDataCell>
              <TableDataCell>{item.car_model_year}</TableDataCell>
              <TableDataCell>{item.price}</TableDataCell>
              <TableDataCell>{item.availability}</TableDataCell>
              <TableDataCell>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Actions"
                  onChange={(e) => {
                    const selectedAction = e.target.value;
                    if (selectedAction === "edit") {
                      handleEditModalOpen(item);
                    } else if (selectedAction === "delete") {
                      handleDeleteModalOpen(item);
                    }
                  }}
                >
                  <MenuItem value="edit">Edit</MenuItem>
                  <MenuItem value="delete">Delete</MenuItem>
                </Select>
              </TableDataCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      <Pagination>
        {filteredCars.length > itemsPerPage && (
          <ul className="pagination">
            {Array(Math.ceil(filteredCars.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <Button
                    size="small"
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
          </ul>
        )}
      </Pagination>
    </>
  );
};

export default Table;

Table.propTypes = {
  element: propTypes.string,
  handleEditModalOpen: propTypes.func,
  handleDeleteModalOpen: propTypes.func,
  cars: propTypes.array,
  error: propTypes.string,
  handleAddModalOpen: propTypes.func,
};
