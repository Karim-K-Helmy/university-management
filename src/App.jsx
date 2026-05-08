import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/Toast';
import LanguageHydrator from './components/common/LanguageHydrator';

// Layouts
import PublicLayout from './components/layout/PublicLayout';

// Public Pages
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/home/AboutPage';
import ProgramsPage from './pages/programs/ProgramsPage';
import ProgramDetailPage from './pages/programs/ProgramDetailPage';
import ApplyPage from './pages/admissions/ApplyPage';
import AdmissionStatusPage from './pages/admissions/AdmissionStatusPage';
import LoginPage from './pages/auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { FaqPage, StudentGuidePage, ContactAdminPage, AdmissionsServicesPage } from './pages/support/SupportPages';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCoursesPage from './pages/student/StudentCoursesPage';
import StudentSchedulePage from './pages/student/StudentSchedulePage';
import StudentGradesPage from './pages/student/StudentGradesPage';
import StudentRequestsPage from './pages/student/StudentRequestsPage';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorCoursesPage from './pages/instructor/InstructorCoursesPage';
import InstructorAssignmentsPage from './pages/instructor/InstructorAssignmentsPage';
import InstructorGradingPage from './pages/instructor/InstructorGradingPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Protected Route wrapper
const ProtectedRoute = ({ children, role }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
    <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
    <Route path="/programs" element={<PublicLayout><ProgramsPage /></PublicLayout>} />
    <Route path="/programs/:id" element={<PublicLayout><ProgramDetailPage /></PublicLayout>} />
    <Route path="/admissions/apply" element={<PublicLayout><ApplyPage /></PublicLayout>} />
    <Route path="/admissions/status" element={<PublicLayout><AdmissionStatusPage /></PublicLayout>} />
    <Route path="/admissions/services" element={<PublicLayout><AdmissionsServicesPage /></PublicLayout>} />
    <Route path="/faq" element={<PublicLayout><FaqPage /></PublicLayout>} />
    <Route path="/student-guide" element={<PublicLayout><StudentGuidePage /></PublicLayout>} />
    <Route path="/contact-admin" element={<PublicLayout><ContactAdminPage /></PublicLayout>} />
    <Route path="/contact" element={<PublicLayout><ContactAdminPage /></PublicLayout>} />
    <Route path="/login" element={<LoginPage />} />

    {/* Student */}
    <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
    <Route path="/student/courses" element={<ProtectedRoute role="student"><StudentCoursesPage /></ProtectedRoute>} />
    <Route path="/student/schedule" element={<ProtectedRoute role="student"><StudentSchedulePage /></ProtectedRoute>} />
    <Route path="/student/grades" element={<ProtectedRoute role="student"><StudentGradesPage /></ProtectedRoute>} />
    <Route path="/student/requests" element={<ProtectedRoute role="student"><StudentRequestsPage /></ProtectedRoute>} />

    {/* Instructor */}
    <Route path="/instructor" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
    <Route path="/instructor/courses" element={<ProtectedRoute role="instructor"><InstructorCoursesPage /></ProtectedRoute>} />
    <Route path="/instructor/assignments" element={<ProtectedRoute role="instructor"><InstructorAssignmentsPage /></ProtectedRoute>} />
    <Route path="/instructor/grading" element={<ProtectedRoute role="instructor"><InstructorGradingPage /></ProtectedRoute>} />

    {/* Admin */}
    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
    <Route path="/admin/content" element={<ProtectedRoute role="admin"><AdminContentPage /></ProtectedRoute>} />
    <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettingsPage /></ProtectedRoute>} />

    {/* 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <LanguageHydrator />
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  </AppProvider>
);

export default App;
