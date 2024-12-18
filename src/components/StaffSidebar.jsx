import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package2, ListOrdered, ClipboardList } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `
        ${isActive 
          ? "bg-stone-100 text-stone-900 font-medium" 
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

export function StaffSidebar() {
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
    <div className="bg-white flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b border-stone-200 px-4">
        <a href="/" className="flex items-center gap-2 font-semibold text-stone-900">
          <Package2 className="h-6 w-6" />
          <span>Queue System</span>
        </a>
      </div>

      <div className="flex-1 px-2">
        <nav className="space-y-1">
          <NavItem
            icon={<ListOrdered className="h-4 w-4" />}
            label="Queue Management"
            to="/staff/queue"
          />
          <NavItem
            icon={<ClipboardList className="h-4 w-4" />}
            label="Queue Logs"
            to="/staff/logs"
          />
        </nav>
      </div>

      <div className="border-t border-stone-200 p-4">
        <Button 
          onClick={handleLogout}
          variant="destructive" 
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
} 