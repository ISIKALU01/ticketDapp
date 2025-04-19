import Image from "next/image";


const HomePage = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/nightlife.jpg" // Replace with your image path
        alt="Background Image"
        fill
        quality={100}
        className="object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Text Content */}
      <div className="relative z-50 text-center text-white px-4 font-raleway">
        <h1 className="text-3xl lg:text-5xl font-light mb-2 font-great-vibes">
          Welcome to Passion Playgrounds!
        </h1>
        <h2 className="text-1xl lg:text-2xl font-light mb-2 text-[#ffd106] font-raleway">
          Join the Adventure of Desire!
        </h2>
        <p className="text-lg md:text-md mb-8 font-light px-[150px]">
          Dive into a world where your fantasies come alive! At Passion Playgrounds, we specialize in unforgettable 
          experiences, offering exclusive tickets to orgy parties, vibrant adult events, and intimate meetups that 
          celebrate love and connection.
        </p>
        <button className="bg-[#ffd106] hover:bg-[#ffd106] text-black font-bold py-2 px-4 rounded cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;



