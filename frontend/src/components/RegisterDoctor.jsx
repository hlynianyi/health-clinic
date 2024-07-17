import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchDoctors } from '../store/doctorSlice';

const RegisterDoctor = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/doctors/register', {
      name,
      specialty,
      email,
    });
    dispatch(fetchDoctors());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Specialty" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Register Doctor</button>
    </form>
  );
};

export default RegisterDoctor;
