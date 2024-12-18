import React from "react";
import { Bell, Package2, LayoutDashboard, ListOrdered, BarChart3 } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function NavItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        ${isActive ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}
        flex items-center gap-3 rounded-lg px-3 py-2 transition-all
      `}
    >
      {icon}
      {label}
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
    <div className="bg-muted/40 hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Queue System</span>
          </a>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
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
            <NavItem 
              icon={<BarChart3 className="h-4 w-4" />} 
              label="Reports" 
              to="/admin/reports"
            />
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
} 