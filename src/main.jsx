import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import { HRProvider } from './context/HRContext.jsx';
createRoot(document.getElementById("root")).render(

  <StrictMode>

      <HRProvider>

          <App />

      </HRProvider>

  </StrictMode>

);
