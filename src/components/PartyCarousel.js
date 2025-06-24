import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

const PartyCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'VIP Nights Await',
      subtitle: 'Exclusive access to the hottest parties in town',
      cta: 'Get Backstage'
    },
    {
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Unforgettable Experiences',
      subtitle: 'Where the night comes alive with possibilities',
      cta: 'Join the Party'
    },
    {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Elite Social Circles',
      subtitle: 'Connect with like-minded party enthusiasts',
      cta: 'Find Your Tribe'
    },
    {
      image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Themed Nights',
      subtitle: 'Masquerades and fantasy come to life',
      cta: 'See Events'
    },
    {
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Premium Bottle Service',
      subtitle: 'Elevate your night with luxury treatment',
      cta: 'Reserve Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'After-Hours Access',
      subtitle: "The party doesn't stop until you say so",
      cta: 'Unlock VIP'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden shadow-2xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-8 text-white">
            <div className="max-w-2xl">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-pink-400 mr-2" />
                <span className="text-sm font-semibold text-pink-400">EXCLUSIVE ACCESS</span>
              </div>
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl mb-6 text-gray-300">{slide.subtitle}</p>
              <button className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105">
                {slide.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-all"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-all"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-pink-500 w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PartyCarousel;