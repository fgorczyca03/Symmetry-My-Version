import { HashRouter, Route, Routes } from 'react-router-dom'
import ROUTES from '@/constants/ROUTES'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import './App.css'
import { useEffect } from "react";

const App = () => {
  // 🔽 BACKEND SHUTDOWN LOGIC
  useEffect(() => {
    const shutdownBackend = async () => {
      try {
        await fetch("http://localhost:8000/shutdown", {
          method: "POST",
        });
      } catch (err) {
        console.log("Backend already closed or unreachable");
      }
    };

    window.addEventListener("beforeunload", shutdownBackend);
    return () => window.removeEventListener("beforeunload", shutdownBackend);
  }, []);

  // 🔽 ROUTES
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.BASE} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.PROFILE} element={<div>Profile</div>} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
