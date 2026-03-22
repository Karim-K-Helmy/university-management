import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import StatsBar from '../../components/home/StatsBar';
import ProgramsBento from '../../components/home/ProgramsBento';
import WhyUs from '../../components/home/WhyUs';
import FacultySection from '../../components/home/FacultySection';
import NewsSlider from '../../components/home/NewsSlider';
import Partners from '../../components/home/Partners';
import Testimonials from '../../components/home/Testimonials';
import QuickContact from '../../components/home/QuickContact';
import ErrorBoundary from '../../components/common/ErrorBoundary';

const HomePage = () => (
  <main>
    <ErrorBoundary><HeroSection /></ErrorBoundary>
    <ErrorBoundary><StatsBar /></ErrorBoundary>
    <ErrorBoundary><ProgramsBento /></ErrorBoundary>
    <ErrorBoundary><WhyUs /></ErrorBoundary>
    <ErrorBoundary><FacultySection /></ErrorBoundary>
    <ErrorBoundary><NewsSlider /></ErrorBoundary>
    <ErrorBoundary><Partners /></ErrorBoundary>
    <ErrorBoundary><Testimonials /></ErrorBoundary>
    <ErrorBoundary><QuickContact /></ErrorBoundary>
  </main>
);

export default HomePage;
