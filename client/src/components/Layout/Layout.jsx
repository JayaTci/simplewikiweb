/**
 * Layout — Page Shell Component
 *
 * Wraps every page with the shared Header, Sidebar, and Footer.
 * Manages sidebar open/close state and the light/dark theme toggle.
 * Theme preference is persisted in localStorage.
 */

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Sync the theme to the <html> data attribute and persist to localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="layout">
      <Header onToggleSidebar={toggleSidebar} theme={theme} onToggleTheme={toggleTheme} />
      <div className="layout-body">
        <Sidebar isOpen={sidebarOpen} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
