// // src/pages/LoginPage.js
// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Button, TextField, Typography } from '@mui/material';

// const LoginPage = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Простая проверка: администраторские учетные данные
//     if (credentials.username === 'admin' && credentials.password === 'password') {
//       login(true);
//     } else {
//       alert('Неверные учетные данные');
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4">Вход в систему</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Имя пользователя"
//           name="username"
//           value={credentials.username}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Пароль"
//           name="password"
//           type="password"
//           value={credentials.password}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Войти
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
