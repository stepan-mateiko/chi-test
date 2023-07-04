import React, {useState} from "react";
import propTypes from "prop-types";
import { TextField, Switch, Button, ButtonGroup } from "@mui/material";

import { StyledAdd } from "./styles";

const AddModal = ({
  selectedCar,
  setSelectedCar,
  handleAddCar,
  isAddModalOpen,
  handleAddModalClose,
}) => {
  const [isFilled, setIsFilled]=useState(false);

  return (
    <StyledAdd isOpen={isAddModalOpen} onRequestClose={handleAddModalClose}>
      <div>
        <h2>Add Car</h2>
        <TextField
          required
          id="company"
          variant="standard"
          label="Company"
          value={selectedCar?.car || ""}
          onChange={(e) =>{
            setSelectedCar({ ...selectedCar, car: e.target.value }
              ); setIsFilled(true)}
          }
        />
        <TextField
          required
          id="model"
          variant="standard"
          label="Model"
          value={selectedCar?.car_model || ""}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, car_model: e.target.value })
          }         defaultValue={''}
        />
        <TextField
          required
          id="vin"
          variant="standard"
          label="Vin"
          value={selectedCar?.car_vin || ""}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, car_vin: e.target.value })
          }         defaultValue={''}
        />
        <TextField
          required
          id="year"
          variant="standard"
          label="Year"
          value={selectedCar?.car_model_year || ""}
          onChange={(e) =>
            setSelectedCar({
              ...selectedCar,
              car_model_year: e.target.value,
            })
          }         defaultValue={''}
        />

        <TextField
          required
          id="color"
          variant="standard"
          label="Color"
          value={selectedCar?.car_color || ""}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, car_color: e.target.value })
          }         defaultValue={''}
        />
        <TextField
          required
          id="price"
          variant="standard"
          type="number"
          label="Price"
          value={selectedCar?.price || 0}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, price: e.target.value })
          }         defaultValue={''}
        />

        <label>
          Availability:
          <Switch
            checked={selectedCar?.availability === "available"}
            onChange={(e) => {
              const availability = e.target.checked
                ? "available"
                : "not available";
              setSelectedCar({ ...selectedCar, availability });
            }}         defaultValue={''}
          />
        </label>
        <br />
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button disabled={!isFilled}   onClick={() => handleAddCar(selectedCar)}>Save</Button>
          <Button onClick={handleAddModalClose}>Cancel</Button>
        </ButtonGroup>
      </div>
    </StyledAdd>
  );
};
export default AddModal;

AddModal.propTypes = {
  selectedCar: propTypes.object,
  setSelectedCar: propTypes.func,
  handleAddCar: propTypes.func,
  isAddModalOpen: propTypes.bool,
  handleAddModalClose: propTypes.func,
};
