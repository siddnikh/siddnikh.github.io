import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="background overflow-clip">
      <Navbar />
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex items-center gap-0 md:gap-12">
          <img src="/meteor.gif" alt="meteor gif" className="md:h-48 h-16" />
          <img src="/title.png" alt="sickdarth" className="md:h-32 h-10" />
          <img src="/meteor.gif" alt="meteor gif" className="md:h-48 h-16" />
        </div>
        <p className="ps2p md:text-2xl text-sm text-center text-red-500">(A.K.A. Siddharth Nikhil)</p>
        <p className="ps2p md:text-3xl md:mt-12 text-md text-center mt-4 text-white">
          Full Stack Dev, Designer, AI fanatic
        </p>
      </div>
    </div>
  );
}

export default Home;
