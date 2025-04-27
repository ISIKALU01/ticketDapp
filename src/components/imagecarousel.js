// components/ImageCarousel.js
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Images with text overlay content
  const images = [
    {
      src: '/carousel1 (2).jpg',
      width: 1200,
      height: 800,
      title: "Masked Parties",
      description: "Get ready for an unforgettable night of non-stop excitement! 🌙✨ Dance the night away to electrifying beats from top DJs, sip on expertly crafted cocktails, and indulge in delicious late-night bites. With dazzling lights, immersive vibes, and an energetic crowd, this is your ultimate escape into the world of nightlife."
    },
    {
      src: '/carousel1 (3).jpg',
      width: 1200,
      height: 800,
      title: "Chill Hangouts",
      description: "Get ready for an unforgettable night of non-stop excitement! 🌙✨ Dance the night away to electrifying beats from top DJs, sip on expertly crafted cocktails, and indulge in delicious late-night bites. With dazzling lights, immersive vibes, and an energetic crowd, this is your ultimate escape into the world of nightlife."
    },
    {
      src: '/carousel1 (1).jpg',
      width: 1200,
      height: 800,
      title: "Wild Nights",
      description: "Get ready for an unforgettable night of non-stop excitement! 🌙✨ Dance the night away to electrifying beats from top DJs, sip on expertly crafted cocktails, and indulge in delicious late-night bites. With dazzling lights, immersive vibes, and an energetic crowd, this is your ultimate escape into the world of nightlife."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
      <div className="w-full max-w-[1200px] mx-auto font-raleway">
          {/* Carousel Container */}
          <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden shadow-lg">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:bg-white/40 hover:scale-105 transition-all duration-300"
            >
              ‹
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:bg-white/40 hover:scale-105 transition-all duration-300"
            >
              ›
            </button>

            {/* Slide Container */}
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={`Slide ${currentIndex + 1}`}
                width={images[currentIndex].width}
                height={images[currentIndex].height}
                className="w-full h-full object-cover object-center transition-opacity duration-500"
                priority={currentIndex === 0}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]"></div>
              
              {/* Text Container */}
              <div className="absolute bottom-16 left-16 w-[calc(100%-8rem)] z-[2] text-white p-8">
                <h2 className="text-4xl font-normal mb-4 drop-shadow-md">
                  {images[currentIndex].title}
                </h2>
                <p className="text-sm sm:text-md max-w-2xl leading-relaxed drop-shadow-sm">
                  {images[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Indicators (Optional) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-white scale-120' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
      </div>
  );
}