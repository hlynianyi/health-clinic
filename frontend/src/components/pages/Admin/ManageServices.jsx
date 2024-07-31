import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleSaveService = async () => {
    try {
      if (selectedService) {
        // Обновление существующей категории услуг или добавление новой услуги
        const updatedServices = [...selectedService.services];
        if (selectedServiceIndex !== null) {
          // Если индекс установлен, обновляем существующую услугу
          updatedServices[selectedServiceIndex] = [
            newServiceName,
            newServicePrice,
          ];
        } else if (newServiceName && newServicePrice) {
          // Иначе добавляем новую услугу
          updatedServices.push([newServiceName, newServicePrice]);
        }

        const updatedService = {
          ...selectedService,
          category: newCategory || selectedService.category,
          services: updatedServices,
        };
        await axios.put(
          `http://localhost:5000/api/services/${selectedService._id}`,
          updatedService
        );
      } else {
        // Создание новой категории услуг
        const newService = {
          category: newCategory,
          services:
            newServiceName && newServicePrice
              ? [[newServiceName, newServicePrice]]
              : [],
        };
        await axios.post("http://localhost:5000/api/services", newService);
      }
      fetchServices();
      handleClearForm();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleAddNewCategory = async () => {
    try {
      const newCategoryData = {
        category: newCategory,
        services: [],
      };
      await axios.post("http://localhost:5000/api/services", newCategoryData);
      fetchServices(); // Обновить список услуг после добавления новой категории
      setNewCategory(""); // Очистить поле для новой категории
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setNewCategory(service.category);
    setNewServiceName("");
    setNewServicePrice("");
    setSelectedServiceIndex(null);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleDeleteInnerService = async (innerIndex) => {
    if (selectedService) {
      try {
        const updatedServices = selectedService.services.filter(
          (_, index) => index !== innerIndex
        );

        const updatedService = {
          ...selectedService,
          services: updatedServices,
        };
        await axios.put(
          `http://localhost:5000/api/services/${selectedService._id}`,
          updatedService
        );
        fetchServices();
      } catch (error) {
        console.error("Error deleting inner service:", error);
      }
      setIsModalOpen(false);
    }
  };

  const handleEditInnerService = (innerService, index) => {
    setNewServiceName(innerService[0]);
    setNewServicePrice(innerService[1]);
    setSelectedServiceIndex(index);
  };

  const handleClearForm = () => {
    setSelectedService(null);
    setNewCategory("");
    setNewServiceName("");
    setNewServicePrice("");
    setSelectedServiceIndex(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления услугами и ценами
      </h2>
      <div className="mb-4">
        <TextField
          label="Категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          fullWidth
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewCategory}
      >
        Добавить новую категорию
      </Button>
      <p className="mt-1">
        <span className="font-bold">пример:</span> Неврология, Стоматология и
        т.д.
      </p>
      <h2 className="text-xl font-bold mt-6 mb-4 border-t-[1px] border-graytext py-2">
        Список существующих услуг
      </h2>
      <ul className="gap-4 flex flex-col">
        {services.map((service) => (
          <li key={service._id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel-content-${service._id}`}
                id={`panel-header-${service._id}`}
              >
                <h3 className="font-bold text-lg text-graytext">
                  {service.category}
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <ul>
                    {service.services.map((serv, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-t-[1px] border-graytext py-2 my-1"
                      >
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row justify-between font-semibold mb-2">
                            <p>Наименование</p>
                            <p className="w-[100px] flex justify-end">Цена</p>
                          </div>
                          <div className="flex">
                            <p>{serv[0]}</p>
                            <p className="w-[100px] flex justify-end">
                              {serv[1]} руб.
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditService(service)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Удалить категорию
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </li>
        ))}
      </ul>

      {/* Modal for adding/editing services */}
      <Dialog open={isModalOpen} onClose={handleClearForm}>
        <Button
          onClick={handleClearForm}
          color="secondary"
          sx={{ marginTop: "12px" }}
        >
          Закрыть окно
        </Button>
        <DialogTitle>
          {selectedService ? "Редактировать услуги" : "Добавить категорию"}
        </DialogTitle>
        <DialogContent>
          <div className="my-4">
            <TextField
              label="Название"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Цена"
              value={newServicePrice}
              onChange={(e) => setNewServicePrice(e.target.value)}
              fullWidth
            />
          </div>
          <ul className="py-3">
            <h3 className="font-semibold my-2">Существующие услуги:</h3>
            {selectedService?.services.map((serv, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-t-[1px] border-graytext py-2 my-1"
              >
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between font-semibold mb-2">
                    <p>Наименование</p>
                    <p className="w-[100px] flex justify-end">Цена</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p>{serv[0]}</p>
                    <p className="w-[90px] flex justify-end">{serv[1]} руб.</p>
                  </div>
                  <div className="flex justify-end">
                    <IconButton
                      onClick={() => handleEditInnerService(serv, index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteInnerService(index)}>
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "justify-between",
            gap: "14px",
          }}
        >
          {selectedService && (
            <Button
              onClick={() => handleDeleteService(selectedService._id)}
              color="error"
            >
              Удалить категорию
            </Button>
          )}

          <Button onClick={handleSaveService} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageServices;
