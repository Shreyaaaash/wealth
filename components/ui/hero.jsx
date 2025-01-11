"use client";
import React from 'react';
import Link from 'next/link'; // Import Link from next/link
const HeroSection = () => {
  return (
    <div className='pd-200 px-4'>
        <div>
            <h1>Your Finances <br />Managed <br />
                By Intelligence</h1>
            <p>
                An AI-driven financial platform that redefines <br />money management—track, <br />analyze,<br /> and optimize spending with premium real-time
            </p>
            <div>
                <Link href="/dashboard"></Link>
                <Button size="lg" className="px-8">Get Started</Button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection