import React from 'react';
import { DoubleNavbar } from './DoubleNavbar'; // Adjust the import path as needed

const Layout = ({ children, showNavbar }) => {
  return (
    <div>
      {showNavbar && <DoubleNavbar />}
      <main style={{ marginLeft: showNavbar ? '300px' : '0', padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;