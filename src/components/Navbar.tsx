'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { NavDropdown } from 'react-bootstrap';
import {
  BoxArrowRight,
  CarFrontFill,
  Lock,
  PersonCircle,
  PersonFill,
  PersonPlusFill,
} from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  if (status === 'loading') return null;

  const currentUser = session?.user?.email;
  const profileLink = session ? '/auth/change-password' : '/auth/signin';

  return (
    <header className="site-navbar">
      <div className="site-nav-inner">
        <Link className="site-brand" href="/" aria-label="ManoaRide home">
          <span className="site-brand-mark" aria-hidden="true">U</span>
          <CarFrontFill aria-hidden="true" />
          <span>Manoa<span>Ride</span></span>
        </Link>
        <nav className="site-nav-links" aria-label="Main navigation">
          <Link className={pathName === '/' ? 'active' : ''} href="/">Home</Link>
          <Link className={pathName === '/list' ? 'active' : ''} href="/list">Find a Ride</Link>
          <Link className={pathName === '/add' ? 'active' : ''} href="/add">Offer a Ride</Link>
          <Link href="/list">My Rides</Link>
          <Link href={profileLink}>Profile</Link>
        </nav>
        <div className="site-account">
          {session ? (
            <NavDropdown
              id="login-dropdown"
              title={<><PersonCircle aria-hidden="true" /> {currentUser}</>}
              align="end"
            >
              <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                <BoxArrowRight aria-hidden="true" /> Sign Out
              </NavDropdown.Item>
              <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                <Lock aria-hidden="true" /> Change Password
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown
              id="login-dropdown"
              title={<><PersonCircle aria-hidden="true" /> Log In / Sign Up</>}
              align="end"
            >
              <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                <PersonFill aria-hidden="true" /> Sign in
              </NavDropdown.Item>
              <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                <PersonPlusFill aria-hidden="true" /> Sign up
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
