import React from "react";
import {  Package2, LayoutDashboard, ListOrdered, BarChart3 } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function NavItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        ${isActive 
          ? "bg-stone-100 text-stone-900" 
          : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
        }
        flex items-center gap-3 rounded-lg px-3 py-2 transition-all
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="bg-white hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-stone-200 px-4">
          <a href="/" className="flex items-center gap-2 font-semibold text-stone-900">
            <Package2 className="h-6 w-6" />
            <span>Queue System</span>
          </a>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavItem 
              icon={<LayoutDashboard className="h-4 w-4" />} 
              label="Dashboard" 
              to="/admin"
            />
            <NavItem 
              icon={<ListOrdered className="h-4 w-4" />} 
              label="Queue Management" 
              to="/admin/queue"
            />
  
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button 
            onClick={handleLogout}
            className="w-full bg-primary hover:bg-black"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
} 