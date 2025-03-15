"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, User, Briefcase, FileText, Contact, UserRoundPen } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const App: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [email, setEmail] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    {
      url: "https://media.gettyimages.com/id/1164209568/photo/new-york-new-york-benjy-benjyfishy-david-fish-martin-mrsavagem-foss-andersen-aydan-conrad.jpg?s=612x612&w=0&k=20&c=8k9jiN6GQBs4TajokMiPVV5S4TGolPC9gvMTTheqBP0=",
      title: "Create. Stream. Dominate.",
      description: "Transforming digital dreams into viral reality. We don't just create content - we create culture."
    },
    {
      url:"/images/8878659.jpg",
      title:"We Will carry you to the top",
      description:"With our gaming live streaming services, you'll be in the spotlight like never before."

    },
    {
      url: "https://img.freepik.com/free-photo/empty-streaming-room-with-professional-powerful-computer-rgb-keyboard-mouse-headphones-microphone_482257-549.jpg?t=st=1742036570~exp=1742040170~hmac=b6e1eb44fbbf65365a17597f1eb586432437412bfa5fec4c212c1ec1ccfe5ee2&w=1380",
      title: "Professional Live Streaming",
      description: "High-quality streaming solutions for events of any scale."
    },
    {url:"https://barchart-news-media-prod.aws.barchart.com/FC/2c2d856f16cfa4595af786ce5ab045bb/%3Furl%3Dhttps%253a%252f%252fg.foolcdn.com%252feditorial%252fimages%252f808409%252f022025-shopify-results-outlook.png%26amp%3Bw%3D700",
      title:"Wanna see results like this?",
      description:"With our digital marketing services, you'll be able to crake the algorithm."
    },
    {
      url: "https://images.unsplash.com/photo-1675011718475-f257cb602a28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NGslMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D",
      title: "Cinematic Production",
      description: "Creating compelling visual stories that captivate audiences."
    }
  ];

  const services = [
    {
      title: "Live Streaming",
      icon: "fa-video",
      description: "Professional streaming solutions for any scale",
      image:
        "https://public.readdy.ai/ai/img_res/39c44d9d9f7df0e46d3d37e8cb3fee39.jpg",
    },
    {
      title: "Media Production",
      icon: "fa-film",
      description: "Cinematic content that captures attention",
      image:
        "https://public.readdy.ai/ai/img_res/47dfda0a3d158c32e960695a00659467.jpg",
    },
    {
      title: "Digital Marketing",
      icon: "fa-chart-line",
      description: "Strategic campaigns that drive results",
      image:
        "https://public.readdy.ai/ai/img_res/65ed2d5fa804d5c28c3613c44b4ffd94.jpg",
    },
    {
      title: "Event Management",
      icon: "fa-calendar-check",
      description: "Seamless experiences from concept to execution",
      image:
        "https://public.readdy.ai/ai/img_res/d6c40491ee151e152f6b0e794bd1ab5d.jpg",
    },
    {
      title: "Esports Services",
      icon: "fa-gamepad",
      description: "Complete tournament and league solutions",
      image:
        "https://public.readdy.ai/ai/img_res/3b07fa1ee77bc3daeb5dfc421bec439d.jpg",
    },
  ];

  const achievements = [
    { number: "100K+", label: "Hours Streamed" },
    { number: "500+", label: "Events Managed" },
    { number: "10M+", label: "Global Viewers" },
    { number: "200+", label: "Tournaments Hosted" },
  ];
 const navItems = [
    { name: 'Home', url: '/home', icon: Home },
    { name: 'About', url: '/aboutus', icon: User },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    // { name: 'Resume', url: '/resume', icon: FileText }
    { name: 'Contact', url:'/contactus', icon: UserRoundPen}
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      setEmail("");
      // Add subscription logic here
    }
  };

  return (
    <div className="w-full min-h-screen bg-background dark:bg-background text-foreground dark:text-foreground md:pd-[200px]">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Header */}
      <header className="fixed z-90 w-full md:hidden bg-background dark:bg-nav-bg text-foreground dark:text-nav-text font-bold tracking-widest text-3xl md:text-4xl lg:text-5xl p-4 md:p-8 lg:p-12">
        <div className="container mx-auto flex justify-center">ABC STUDIOS</div>
      </header>

      <NavBar items={navItems} />

      {/* Hero Section */}
      <div className="pt-16 px-4 md:px-8 lg:px-16">
        <div className="h-[400px] md:h-[600px] relative rounded-xl overflow-hidden mb-8">
          <div className="relative w-full h-full">
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/30 hover:bg-background/50 dark:bg-nav-bg/30 dark:hover:bg-nav-bg/50 text-foreground dark:text-nav-text w-10 h-10 rounded-full flex items-center justify-center transition-all"
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/30 hover:bg-background/50 dark:bg-nav-bg/30 dark:hover:bg-nav-bg/50 text-foreground dark:text-nav-text w-10 h-10 rounded-full flex items-center justify-center transition-all"
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentHeroImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.url}
                  className="w-full h-full object-cover"
                  alt={`Hero banner ${index + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6 md:p-12">
                  <h1 className="text-nav-text text-3xl md:text-5xl font-bold mb-2">
                    {image.title}
                  </h1>
                  <p className="text-nav-text text-sm md:text-lg opacity-90 max-w-2xl">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHeroImage
                      ? "bg-nav-text w-4"
                      : "bg-nav-text/50 hover:bg-nav-text/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div id="services" className="px-4 md:px-8 lg:px-16 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-card dark:bg-card text-card-foreground dark:text-card-foreground"
              onClick={() => setActiveService(index)}
            >
              <div className="h-24 w-full bg-muted dark:bg-muted rounded-t">
                <img
                  src={service.image}
                  className="h-full w-full object-cover rounded-t"
                  alt={service.title}
                />
              </div>
              <h3 className="text-center font-semibold mb-1 pt-2">
                {service.title}
              </h3>
              <p className="text-xs text-center text-muted-foreground dark:text-muted-foreground">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div id="achievements" className="w-full px-4 md:px-8 lg:px-16 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-card dark:bg-nav-bg text-card-foreground dark:text-nav-text rounded-xl p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold">{achievement.number}</div>
              <div className="text-sm md:text-base opacity-80">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* <NavBar items={navItems} /> */}
    </div>
  );
};

export default App;
