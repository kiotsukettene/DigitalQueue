import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './Pages/Login'
import QueueDisplay from './components/Queue'
import AdminDashboard from './Pages/AdminDashboard'
import AdminHome from './Pages/AdminHome'
import AdminQueue from './Pages/AdminQueue'
import AdminReports from './Pages/AdminReports'
import StaffDashboard from './Pages/StaffDashboard'
import StaffQueue from './Pages/StaffQueue'
import StaffLogs from './Pages/StaffLogs'
import { ProtectedRoute } from './components/ProtectedRoute'
import Unauthorized from './Pages/Unauthorized'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = '/auth' element={<Login/>}></Route>
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="queue" element={<AdminQueue />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
          <Route 
            path="/staff" 
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<StaffQueue />} />
            <Route path="queue" element={<StaffQueue />} />
            <Route path="logs" element={<StaffLogs />} />
          </Route>
          <Route path='/queue' element={<ProtectedRoute allowedRoles={['user', 'staff', 'admin']}>
            <QueueDisplay/>
          </ProtectedRoute>}></Route>
          <Route path="/" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
