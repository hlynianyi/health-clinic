import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const ManageLicenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

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

  const handleUpload = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (!selectedFile || !title) {
      alert("Please provide both a title and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("license", selectedFile);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:5000/api/licenses/upload", formData);
      fetchLicenses();
    } catch (error) {
      console.error("Error uploading license:", error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/licenses/${id}`);
    fetchLicenses();
  };

  return (
    <>
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black text-lg font-montserrat">
        Панель управления лицензиями
      </h2>

      <form className="flex flex-col gap-4 mt-4" onSubmit={handleUpload}>
        <TextField
          required
          id="license-name"
          label="Название лицензии:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
        />

        <input type="file" onChange={handleFileChange} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
        >
          Добавить лицензию
        </Button>
      </form>

      <h3 className="flex justify-center w-full  mt-6 mb-2 tablet:mb-6 py-2 pl-4 rounded-lg bg-bggray text-black text-lg font-montserrat">
        Текущие лицензии
      </h3>
      <ul className="flex w-full justify-between gap-4 flex-wrap">
        {licenses.map((license) => (
          <li className="flex flex-col gap-2 mb-4" key={license._id}>
            <p className="flex gap-2  border-b-maingreen border-b-[1px]">
              <span className="font-medium">Название лицензии:</span>{" "}
              <span>{license.title}</span>
            </p>
            <Button
              onClick={() => handleDelete(license._id)}
              variant="contained"
              color="primary"
              sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            >
              Удалить
            </Button>
            <div className="h-[360px] w-[360px] flex justify-center ">
              <img
                className="object-cover w-[260px]"
                src={`http://localhost:5000/${license.imagePath}`}
                alt={license.title}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ManageLicenses;
