// components/ClientNavBar.js
'use client';
import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

const ClientNavBar = () => {
  const pathname = usePathname();

  // Если текущий путь не главная страница ('/'), то отображаем NavBar
  if (pathname === '/') return null; // На главной странице не показываем навбар

  return <NavBar />;
};

export default ClientNavBar;