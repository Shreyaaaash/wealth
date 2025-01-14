"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
    const imageRef = useRef(null);
  
    useEffect(() => {
      const imageElement = imageRef.current;
  
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;
  
        if (scrollPosition > scrollThreshold) {
          imageElement.classList.add("scrolled");
        } else {
          imageElement.classList.remove("scrolled");
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <section className="pt-40 pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className='="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title'> Your Finances <br />Managed <br />
                By Intelligence</h1>
            <p className='text-xl text-gray-700 mb-8 max-w-2xl mx-auto'>
                An AI-driven financial platform that redefines <br />money management—track, <br />analyze,<br /> and optimize spending with premium real-time
            </p>
            <div>
                <Link href="/dashboard">
                    <Button variant="outline">Go to Dashboard</Button>
                </Link>
            </div>
            <div className='hero-image-wrapper'>
                <div ref={imageRef} className='hero-image'>
                    <Image  src = "/banner.png"
                    width ={1280}
                    height={720}
                    alt ="Dashboard Preview"
                    className="roundeed=lg shadow-2xl border mx-auto"/>
                </div>
            </div>
        </div>
    </section>
  )
};

export default HeroSection;