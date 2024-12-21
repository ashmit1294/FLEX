import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './Pages/RegistrationForms';
import LoginForm from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
export default App;