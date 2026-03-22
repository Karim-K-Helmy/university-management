import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';

const PublicLayout = ({ children, hideFooter = false }) => (
  <>
    <Navbar />
    <div className="min-h-screen">{children}</div>
    {!hideFooter && <Footer />}
    <BackToTop />
  </>
);

export default PublicLayout;
