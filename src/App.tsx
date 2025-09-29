import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import RegisterPage from './pages/Register/index';
import HomePage from './pages/Home/index';
import { ToastContainer } from 'react-toastify';
import ScheduleProfessor from './pages/ScheduleProfessor/index';
import Payment from './pages/Payment/index';
import RegisterConfirmation from './pages/RegisterConfirmation';
import { RegisterProvider } from './context/RegisterContext';
import ProfilePage from './pages/Profile';
import CourseDetails from './pages/CourseDetails/index';

function App() {
    return (
        <RegisterProvider>
            <>
                <Routes>
                    <Route path="/register-confirmation" element={<RegisterConfirmation />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                    <Route path="/professor/:id/schedule" element={<ScheduleProfessor />} />
                    <Route path="/professor/:id/schedule/payment" element={<Payment />} />
                </Routes>
                <ToastContainer position="top-right" autoClose={3000} theme="dark" />
            </>
        </RegisterProvider>
    );
}

export default App;