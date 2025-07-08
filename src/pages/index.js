import Image from "next/image";

const HomePage = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/nightlife.jpg"
        alt="Background Image"
        fill
        quality={100}
        className="object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Text Content */}
      <div className="relative z-50 text-center text-white px-4 sm:px-6 md:px-8 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-2 md:mb-4 font-great-vibes">
          Welcome to Passion Playgrounds!
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 md:mb-6 text-[#ffd106] font-raleway">
          Join the Adventure of Desire!
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-light mb-8 md:mb-12 px-4 sm:px-8 md:px-12 lg:px-20 leading-relaxed">
          Dive into a world where your fantasies come alive! At Passion Playgrounds, we specialize in unforgettable 
          experiences, offering exclusive tickets to orgy parties, vibrant adult events, and intimate meetups that 
          celebrate love and connection.
        </p>
        <button className="bg-[#ffd106] hover:bg-[#ffd106]/90 text-black font-bold py-3 px-6 rounded-full cursor-pointer text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffd106] focus:ring-opacity-50">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;