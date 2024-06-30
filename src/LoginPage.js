// import React, { useState } from 'react';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import LanguageToggle from './LanguageToggle';
// const LoginPage = () => {
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [redirectToHome, setRedirectToHome] = useState(false);

//     const handleLogin = async(e) => {
//         // Handle login functionality

//     setMessage(''); 

//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         name: name,
//         password: password
//       });
//       setMessage('Login successful!');
//       console.log('User logged in:', response.data);
//       redirectToHomePage();
//       // Redirect or update UI upon successful login
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setMessage(`Error: ${error.response.data.error}`);
//       } else {
//         setMessage('Error logging in.');
//       }
//       console.error('Error logging in:', error);
//     }
//     };

//     const redirectToLandingPage = () => {
//       window.location.href = 'http://localhost:3000/';
//   };
//     const redirectToHomePage = () => {
//       window.location.href = 'http://localhost:3000/home';
//   };
//     const { t } = useTranslation();
//     return (
//         <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//             <LanguageToggle/>
//             <div className="card p-4 shadow" style={{ maxWidth: '400px', margin: 'auto' }}>
//                 <h2 className="mb-3 text-center">{t('form_name_l')}</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="login-username" className="form-label">{t('username_login')}</label>
//                         <input type="text" className="form-control" id="login-username" placeholder={t('placeholder_u2')} value={name} onChange={(e) => setName(e.target.value)} />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="login-password" className="form-label">{t('password_login')}</label>
//                         <input type="password" className="form-control" id="login-password" placeholder={t('placegolder_p2')} value={password} onChange={(e) => setPassword(e.target.value)} />
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100" >{t('loginButton2')}</button>
//                 </form>
//                 {/* Display the message to the user */}
//         {message && <div className="alert mt-4">{message}</div>}
//         {/* Conditional rendering of the redirect button */}

//         <button
//           className="btn btn-secondary mt-3 w-100"
//           onClick={redirectToLandingPage}
//         >
//           {t('homepagebutton2')}
//         </button>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage(''); 

//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         username,
//         password
//       });
//       setMessage('Login successful!');
//       console.log('User logged in:', response.data);
//       // Redirect or update UI upon successful login
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setMessage(`Error: ${error.response.data.error}`);
//       } else {
//         setMessage('Error logging in.');
//       }
//       console.error('Error logging in:', error);
//     }
//   };

//   const redirectToHomePage = () => {
//     window.location.href = 'http://localhost:3000/';
//   };

//   return (
//     <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//       <div className="card p-4 shadow" style={{ maxWidth: '400px', margin: 'auto' }}>
//         <h2 className="mb-3 text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label htmlFor="login-username" className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="login-username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="login-password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="login-password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//           >
//             Login
//           </button>
//         </form>
//         {/* Display the message to the user */}
//         {message && <div className="alert mt-4">{message}</div>}
//         {/* Conditional rendering of the redirect button */}
//         <button
//           className="btn btn-secondary mt-3 w-100"
//           onClick={redirectToHomePage}
//         >
//           Go to Home Page
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginPage = () => {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     setMessage(''); 

//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         username: name,
//         password: password
//       });

//       // Handle successful login
//       console.log('Login successful:', response.data);
//       setMessage('Login successful!');
//       // Redirect or update UI upon successful login
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setMessage(Error: ${error.response.data.error});
//       } else {
//         setMessage('Error logging in.');
//       }
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//       <div className="card p-4 shadow" style={{ maxWidth: '400px' }}>
//         <h2 className="mb-3 text-center">Login</h2>
//         <form>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               placeholder="Enter your username"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             type="button"
//             className="btn btn-primary w-100"
//             onClick={handleLogin}
//           >
//             Login
//           </button>
//         </form>
//         {message && <div className="alert mt-3">{message}</div>}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = async () => {
    setMessage('');

   
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: name,
        password: password
      });


     
     
      // Handle successful login
      console.log('Login successful:', response.data);
      setMessage('Login successful!');
      redirectToHomePage();
      // Redirect or update UI upon successful login
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage('Error logging in.');
      }
      console.error('Error logging in:', error);
    }
  };
  const redirectToLandingPage = () => {
    window.location.href = 'http://localhost:3000/';
  };
  const redirectToHomePage = () => {
    window.location.href = 'http://localhost:3000/home';
  };

 
  const { t } = useTranslation();
  return (
    <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <LanguageToggle />
      <div className="card p-4 shadow" style={{ maxWidth: '400px' }}>
        <h2 className="mb-3 text-center">{t('form_name_l')}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">{t('username_login')}</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={t('placeholder_u2')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">{t('password_login')}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={t('placegolder_p2')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            {t('loginButton2')}
          </button>
        </form>
        {message && <div className="alert mt-3">{message}</div>}
        <button
                    className="btn btn-secondary mt-3"
                    onClick={redirectToLandingPage}
                >
                    {t('homepagebutton2')}
                </button>
      </div>
    </div>
  );
};

export default LoginPage;
