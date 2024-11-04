import "./App.css";
import RetroCard from "./Card";

function Blogs({ setCurrentPage }) {

  return (
    <div className="background">
      {/* Navbar */}
      <div className="w-screen md:h-32 h-12 top-0 left-0 pt-8 px-12 flex justify-between" id="navbar">
        <img
          src="/home-logo.png"
          className="hover:scale-110 cursor-pointer md:inline-block hidden"
          onClick={() => setCurrentPage('home')}
        />
        <div className="flex gap-8 items-center md:w-fit w-full justify-between">
          <a href="https://open.spotify.com/user/uv86e08ltalmn0ngxe4mywl58?si=b8d4f7a90d9449ed" target="_blank">
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

      {/* Main Content */}
      <div className="mt-24 w-screen flex flex-col justify-center items-center">
        {/* Title */}
        <div className="flex items-center gap-12">
          <img src="/meteor.gif" alt="meteor gif" className="md:h-24 h-16" />
          <p className="vt323 md:text-8xl text-6xl text-purple-600">
            Projects
          </p>
          <img src="/meteor.gif" alt="meteor gif" className="md:h-24 h-16" />
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-8">
          <RetroCard
            imageSrc="/sicktalk.png"
            title="SICKTALK"
            description="A casual chat app I made for me and my homies. Real-time chat with a pretty cute theme."
            link="https://github.com/siddnikh/sick-talk-frontend"
          />
          <RetroCard
            imageSrc="/cleaning.png"
            title="Cleaning Services App"
            description="A cleaning services app I made for a freelance client. Imagine an urban clap clone, but especially for cleaning services. Made with React Native for the app and Node for the backend."
            link="https://github.com/siddnikh/cleaning-service-app"
          />
          <RetroCard
            imageSrc="/days.png"
            title="Days"
            description="A mad simple react app that lets you count days for anything. Born out of personal necessity."
            link="https://github.com/siddnikh/days"
          />
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-8">
        <RetroCard
            imageSrc="/home-logo.png"
            title="Activity Tracker App"
            description="A simple mobile app that helps in tracking your activities. Born out of personal necessity, as the habit tracker I was using asked for a premium subscription."
            link="https://github.com/siddnikh/ActivityTrackerApp"
          />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
