import React from "react";
import propTypes from "prop-types";
import { TextField, Switch, Button, ButtonGroup } from "@mui/material";

import { StyledEdit } from "./styles";

const EditModal = ({
  selectedCar,
  isEditModalOpen,
  handleEditModalClose,
  handleEditCar,
  setSelectedCar,
}) => {
  return (
    <StyledEdit isOpen={isEditModalOpen} onRequestClose={handleEditModalClose}>
      {selectedCar && (
        <div>
          <h2>Edit Car</h2>
          <TextField
            disabled
            id="company"
            variant="standard"
            label="Company"
            defaultValue={selectedCar.car}
          />
          <TextField
            disabled
            id="model"
            variant="standard"
            label="Model"
            defaultValue={selectedCar.car_model}
          />{" "}
          <TextField
            disabled
            id="vin"
            variant="standard"
            label="Vin"
            defaultValue={selectedCar.car_vin}
          />{" "}
          <TextField
            disabled
            id="year"
            variant="standard"
            label="Year"
            defaultValue={selectedCar.car_model_year}
          />
          <TextField
            id="color"
            variant="standard"
            label="Color"
            defaultValue={selectedCar.car_color}
            value={selectedCar.car_color}
            onChange={(e) =>
              setSelectedCar({ ...selectedCar, car_color: e.target.value })
            }
          />{" "}
          <TextField
            id="price"
            variant="standard"
            label="Price"
            defaultValue={selectedCar.price}
            value={selectedCar.price}
            onChange={(e) =>
              setSelectedCar({ ...selectedCar, price: e.target.value })
            }
          />
          <label>
            Availability:
            <Switch
              checked={selectedCar.availability === "available"}
              onChange={(e) => {
                const availability = e.target.checked
                  ? "available"
                  : "not available";
                setSelectedCar({ ...selectedCar, availability });
              }}
            />
          </label>
          <br />
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => handleEditCar(selectedCar)}>Save</Button>
            <Button onClick={handleEditModalClose}>Cancel</Button>
          </ButtonGroup>
        </div>
      )}
    </StyledEdit>
  );
};

export default EditModal;

EditModal.propTypes = {
  selectedCar: propTypes.object,
  isEditModalOpen: propTypes.bool,
  handleEditModalClose: propTypes.func,
  handleEditCar: propTypes.func,
  setSelectedCar: propTypes.func,
};
