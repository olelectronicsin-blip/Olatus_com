import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';
import Inbox from './pages/Inbox';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
