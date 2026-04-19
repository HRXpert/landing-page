"use client";
import React from "react";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import AdvantagesBand from "./components/AdvantagesBand";
import JobSeekersRecruiters from "./components/JobSeekersRecruiters";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CursorFollower from "./components/CursorFollower";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <main className="flex flex-col" style={{ cursor: 'none' }}>
        <Header />
        <Hero />
        <FeaturesSection />
        <AdvantagesBand />
        <JobSeekersRecruiters />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}

