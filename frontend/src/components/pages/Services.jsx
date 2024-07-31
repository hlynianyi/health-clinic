import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Services = () => {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState(false);

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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black text-lg font-montserrat">
        УСЛУГИ И ЦЕНЫ
      </h2>
      <ul className="gap-4 flex flex-col">
        {services.map((service) => (
          <li key={service._id}>
            <Accordion
              expanded={expanded === service._id}
              onChange={handleAccordionChange(service._id)}
              sx={{
                backgroundColor:
                  expanded === service._id ? "#28926E" : "#f5f5f5",
                color: expanded === service._id ? "white" : "black",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore
                    sx={{ color: expanded === service._id ? "white" : "black" }}
                  />
                }
                aria-controls={`panel-content-${service._id}`}
                id={`panel-header-${service._id}`}
                sx={{
                  backgroundColor:
                    expanded === service._id ? "#28926E" : "inherit",
                }}
              >
                <h3
                  className={`font-semibold text-[16px] ${
                    expanded === service._id ? "text-white" : "text-graytext"
                  }`}
                >
                  {service.category}
                </h3>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: "8px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  color: "#555555",
                  fontSize: "14px",
                }}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between font-semibold bg-bggray py-1 px-2 rounded">
                    <p>Наименование</p>
                    <p className="w-[100px] flex justify-end">Цена</p>
                  </div>
                  {service.services.map((serv, index) => (
                    <div
                      key={index}
                      className={`rounded flex justify-between items-center py-[10px] px-4 font-medium ${
                        index % 2 !== 0 ? "bg-bggray" : "bg-white"
                      }`}
                    >
                      <p>{serv[0]}</p>
                      <p className="w-[100px] flex justify-end">
                        {serv[1]} руб.
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Services;
