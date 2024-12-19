import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './Pages/RegistrationForms';
import LoginForm from './Pages/LoginForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}
export default App;