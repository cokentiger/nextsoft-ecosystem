import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppProvider } from './context/AppContext' // <--- Import cái này

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Bao bọc App bên trong Provider */}
    <AppProvider> 
      <App />
    </AppProvider>
  </React.StrictMode>,
)