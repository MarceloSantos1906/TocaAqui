import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import RegisterPage from './pages/Register/index';
import HomePage from './pages/Home/index';
import ProfessorsDetails from './pages/ProfessorsDetails/index';
import { ToastContainer } from 'react-toastify';
import ScheduleProfessor from './pages/ScheduleProfessor/index';
import Payment from './pages/Payment/index';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/professor/:id" element={<ProfessorsDetails />} />
        <Route path="/professor/:id/schedule" element={<ScheduleProfessor />} />
        <Route path="/professor/:id/schedule/payment" element={<Payment />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;