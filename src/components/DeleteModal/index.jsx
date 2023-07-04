import React from "react";
import propTypes from "prop-types";
import { ButtonGroup, Button } from "@mui/material";

import { StyledDelete } from "./styles";

const DeleteModal = ({
  selectedCar,
  isDeleteModalOpen,
  handleDeleteModalClose,
  handleDeleteCar,
}) => {
  return (
    <StyledDelete
      isOpen={isDeleteModalOpen}
      onRequestClose={handleDeleteModalClose}
    >
      {selectedCar && (
        <div>
          <h2>Delete Car</h2>
          <p>Are you sure you want to delete the car?</p>
          <p>Company: {selectedCar.car}</p>
          <p>Model: {selectedCar.car_model}</p>
          <p>VIN: {selectedCar.car_vin}</p>
          <p>Year: {selectedCar.car_model_year}</p>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleDeleteCar}>Delete</Button>
            <Button onClick={handleDeleteModalClose}>Cancel</Button>
          </ButtonGroup>
        </div>
      )}
    </StyledDelete>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  selectedCar: propTypes.object,
  isDeleteModalOpen: propTypes.bool,
  handleDeleteModalClose: propTypes.func,
  handleDeleteCar: propTypes.func,
};
