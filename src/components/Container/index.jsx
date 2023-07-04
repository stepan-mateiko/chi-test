import React, { useState, useEffect } from "react";

import Table from "../Table";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import AddModal from "../AddModal";
import { StyledContainer } from "./styles";

const Container = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCars = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://myfakeapi.com/api/cars/");
      const data = await response.json();

      const updatedCars = data.cars.map((car) => {
        return {
          ...car,
          availability: car.availability ? "available" : "not available",
        };
      });
setIsLoading(false)
      setCars(updatedCars);
    } catch (error) {
      setIsLoading(false)
      setError("Sorry, this data isn't available");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  //  Handling with local storage
  useEffect(() => {
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  // Handling with modals
  const handleEditModalOpen = (car) => {
    setSelectedCar(car);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedCar(null);
    setEditModalOpen(false);
  };
  const handleDeleteModalOpen = (car) => {
    setSelectedCar(car);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedCar(null);
    setDeleteModalOpen(false);
  };
  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setSelectedCar(null);
    setAddModalOpen(false);
  };

  const handleEditCar = (updatedCar) => {
    const updatedCars = cars.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setCars(updatedCars);

    handleEditModalClose();
  };

  const handleDeleteCar = () => {
    const updatedCars = cars.filter((car) => car.id !== selectedCar.id);
    setCars(updatedCars);

    handleDeleteModalClose();
  };

  const handleAddCar = (newCar) => {
    const newCarWithId = {
      ...newCar,
      id: Date.now().toString(),
      availability: newCar.availability ? "available" : "not available",
    };

    const updatedCars = [...cars, newCarWithId];
    setCars(updatedCars);

    handleAddModalClose();
  };

  return (
    <StyledContainer>
      <Table
        handleEditModalOpen={handleEditModalOpen}
        handleDeleteModalOpen={handleDeleteModalOpen}
        handleAddModalOpen={handleAddModalOpen}
        cars={cars}
        error={error}
        isLoading={isLoading}
      />
      <EditModal
        selectedCar={selectedCar}
        isEditModalOpen={isEditModalOpen}
        handleEditModalClose={handleEditModalClose}
        handleEditCar={handleEditCar}
        setSelectedCar={setSelectedCar}
      />
      <DeleteModal
        selectedCar={selectedCar}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDeleteCar={handleDeleteCar}
      />
      <AddModal
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        handleAddCar={handleAddCar}
        isAddModalOpen={isAddModalOpen}
        handleAddModalClose={handleAddModalClose}
      />
    </StyledContainer>
  );
};

export default Container;
