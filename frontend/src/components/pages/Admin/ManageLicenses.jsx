// components/admin/ManageLicenses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const ManageLicenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    const response = await axios.get("http://localhost:5000/api/licenses");
    setLicenses(response.data);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("license", selectedFile);
    await axios.post("http://localhost:5000/api/licenses/upload", formData);
    fetchLicenses();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/licenses/${id}`);
    fetchLicenses();
  };

  return (
    <div>
      <h2>Manage Licenses</h2>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload License</Button>
      <ul>
        {licenses.map((license) => (
          <li key={license._id}>
            <img
              src={`http://localhost:5000/${license.imagePath}`}
              alt={license.title}
              width="100"
            />
            <Button onClick={() => handleDelete(license._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLicenses;
