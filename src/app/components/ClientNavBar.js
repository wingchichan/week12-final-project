'use client';
import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

const ClientNavBar = () => {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return <NavBar />;
};

export default ClientNavBar;