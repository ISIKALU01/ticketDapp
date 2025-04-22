// components/ImageCarousel.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './imagecarousel.module.css';

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
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <button onClick={prevSlide} className={styles.navButton}>‹</button>
        
        <div className={styles.slideContainer}>
          <Image
            src={images[currentIndex].src}
            alt={`Slide ${currentIndex + 1}`}
            width={images[currentIndex].width}
            height={images[currentIndex].height}
            className={styles.slide}
            priority={currentIndex === 0}
          />
          
          {/* Dark overlay */}
          <div className={styles.overlay}></div>
          
          {/* Text container */}
          <div className={styles.textContainer}>
            <h2 className={styles.slideTitle}>{images[currentIndex].title}</h2>
            <p className={styles.slideDescription}>{images[currentIndex].description}</p>
          </div>
        </div>
        
        <button onClick={nextSlide} className={styles.navButton}>›</button>
      </div>
    </div>
  );
}