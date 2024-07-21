import "./App.css";

function Home() {
  const redirectToHome = () => {
    window.location.href = "https://siddnikh.github.io/";
  };

  return (
    <div className="background overflow-clip">
      <div
        className="w-screen md:h-32 h-12 absolute top-0 left-0 pt-8 px-12 flex justify-between"
        id="navbar"
      >
        <img
          src="/home-logo.png"
          className="hover:scale-110 cursor-pointer md:inline-block hidden"
          onClick={redirectToHome}
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
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex items-center gap-0 md:gap-12">
          <img src="/meteor.gif" alt="meteor gif" className="md:h-48 h-16" />
          <img src="/title.png" alt="sickdarth" className="md:h-32 h-10" />
          <img src="/meteor.gif" alt="meteor gif" className="md:h-48 h-16" />
        </div>
        <p className="ps2p md:text-2xl text-sm text-center text-red-500">(A.K.A. Siddharth Nikhil)</p>
        <p className="ps2p md:text-3xl md:mt-12 text-md text-center mt-4 text-white">
          Full Stack Developer and Casual Designer
        </p>
        <div className="flex gap-8 mt-24">
          <a href="/blogs">
            <div className="vt323 bg-slate-800 flex flex-col items-center justify-center py-2 px-6 rounded-xl hover:scale-110">
              <p className="md:text-3xl text-lg">Blogs</p>
              <p className="md:text-xl text-sm">(not always technical)</p>
            </div>
          </a>
          <a href="/projects">
            <div className="vt323 bg-slate-800 flex h-full items-center justify-center py-2 px-6 rounded-xl hover:scale-110">
              <p className="md:text-3xl text-lg">Projects</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
