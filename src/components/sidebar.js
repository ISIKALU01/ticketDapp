// components/Sidebar.js
import Link from 'next/link';
import { FiHome, FiSettings, FiUsers, FiPieChart, FiCalendar, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="w-full h-screen bg-black/10 text-white flex flex-col p-5 backdrop-blur-sm z-50 shadow-md 
    font-raleway ">
      {/* Header Section */}
      <div className="pb-5 border-b border-white/10 mb-5">
        <h2 className="text-xl font-semibold">Explore</h2>
        <p className="text-sm text-white/70">your profile</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
        >
          <FiHome className="text-lg" />
          <span>Home</span>
        </Link>
        <Link 
          href="/dashboard/users" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
        >
          <FiUsers className="text-lg" />
          <span>Users</span>
        </Link>
        <Link 
          href="/dashboard/analytics" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
        >
          <FiPieChart className="text-lg" />
          <span>Analytics</span>
        </Link>
        <Link 
          href="/dashboard/calendar" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
        >
          <FiCalendar className="text-lg" />
          <span>Calendar</span>
        </Link>
        <Link 
          href="/dashboard/settings" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
        >
          <FiSettings className="text-lg" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="pt-5 border-t border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-medium">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-white/60 truncate">admin@example.com</p>
          </div>
        </div>
        <Link 
          href="/logout" 
          className="w-full mt-3 flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}