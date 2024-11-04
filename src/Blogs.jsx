import "./App.css";
import PropTypes from 'prop-types';

function Blogs({ setCurrentPage }) {

  return (
    <div>
       <div
        className="w-screen md:h-32 h-12 absolute top-0 left-0 pt-8 px-12 flex justify-between"
        id="navbar"
      >
        <img
          src="/home-logo.png"
          className="hover:scale-110 cursor-pointer md:inline-block hidden"
          onClick={() => setCurrentPage('home')}
        />
        <div className="flex gap-8 items-center md:w-fit w-full justify-between">
          <a
            href="https://open.spotify.com/user/uv86e08ltalmn0ngxe4mywl58?si=b8d4f7a90d9449ed"
            target="_blank"
          >
            <img src="/spotify.png" className="h-12 hover:scale-110" />
          </a>
          <a href="https://linkedin.com/in/siddnikh" target="_blank">
            <img src="/linkedin.png" className="h-12 hover:scale-110" />
          </a>
          <a href="https://github.com/siddnikh" target="_blank">
            <img src="/github.png" className="h-12 hover:scale-110" />
          </a>
          <a href="https://x.com/IngerDar" target="_blank">
            <img src="/twitter.png" className="h-12 hover:scale-110" />
          </a>
        </div>
      </div>
      <div className="background overflow-clip">
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <div className="flex items-center gap-12">
            <img src="/meteor.gif" alt="meteor gif" className="md:h-24 h-16" />
            <p className="vt323 md:text-8xl text-6xl text-purple-600">Blogs</p>
            <img src="/meteor.gif" alt="meteor gif" className="md:h-24 h-16" />
          </div>
          <p className="ps2p md:text-2xl text-lg text-red-500 mt-8 text-center">
            Still under construction
          </p>
          <p className="ps2p md:text-3xl text-lg mt-12 text-white text-center">
            Come back later, so sorry :P
          </p>
        </div>
      </div>
    </div>
  );
}

Blogs.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Blogs;
