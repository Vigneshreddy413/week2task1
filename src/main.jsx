import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Spinner from './components/Spinner.jsx';
import './styles/index.css';

const Home = lazy(() => import('./pages/Home.jsx'));
const Jobs = lazy(() => import('./pages/Jobs.jsx'));
const JobDetails = lazy(() => import('./pages/JobDetails.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const CandidateDashboard = lazy(() => import('./pages/CandidateDashboard.jsx'));
const EmployerDashboard = lazy(() => import('./pages/EmployerDashboard.jsx'));

function ProtectedRoute({ role, children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (role && currentUser.role !== role) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="page-loader"><Spinner /> Loading HireHub...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          path="/candidate"
          element={
            <ProtectedRoute role="candidate">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CandidateDashboard />} />
        </Route>
        <Route
          path="/employer"
          element={
            <ProtectedRoute role="employer">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployerDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
