// components/License.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const License = () => {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const fetchLicenses = async () => {
      const response = await axios.get("http://localhost:5000/api/licenses");
      console.log("Licences response:", response);
      setLicenses(response.data);
    };

    fetchLicenses();
  }, []);

  return (
    <div>
      <h2>Licenses</h2>
      <div>
        {licenses.map((license) => (
          <div key={license._id}>
            <img
              src={`http://localhost:5000/${license.imagePath}`}
              alt={license.title}
            />
            <p>{license.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default License;
