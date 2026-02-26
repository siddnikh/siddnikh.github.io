import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const socialLinks = [
    { href: "https://open.spotify.com/user/uv86e08ltalmn0ngxe4mywl58?si=b8d4f7a90d9449ed", icon: "/spotify.png", alt: "spotify" },
    { href: "https://linkedin.com/in/siddnikh", icon: "/linkedin.png", alt: "linkedin" },
    { href: "https://github.com/siddnikh", icon: "/github.png", alt: "github" },
    { href: "https://x.com/IngerDar", icon: "/twitter.png", alt: "twitter" }
  ];

  return (
    <div
      className="w-screen md:h-32 h-16 fixed top-0 left-0 pt-8 px-12 flex justify-between items-center z-50 bg-transparent"
      id="navbar"
    >
      <NavLink to="/">
        <img
          src="/home-logo.png"
          className="h-12 hover:scale-110 cursor-pointer md:inline-block hidden transition-transform"
          alt="home logo"
        />
      </NavLink>
      
      <div className="flex gap-6 items-center flex-grow justify-center md:justify-end md:flex-grow-0">
        <NavLink 
          to="/blogs" 
          className={({ isActive }) => 
            `vt323 text-2xl px-4 py-1 rounded-lg transition-all ${isActive ? 'bg-purple-600 text-white shadow-[0_0_10px_purple]' : 'text-purple-400 hover:text-white'}`
          }
        >
          BLOGS
        </NavLink>
        <NavLink 
          to="/projects" 
          className={({ isActive }) => 
            `vt323 text-2xl px-4 py-1 rounded-lg transition-all ${isActive ? 'bg-purple-600 text-white shadow-[0_0_10px_purple]' : 'text-purple-400 hover:text-white'}`
          }
        >
          PROJECTS
        </NavLink>
        
        <div className="flex gap-4 items-center ml-4 border-l border-purple-500/30 pl-6 h-8">
          {socialLinks.map((link) => (
            <a 
              key={link.alt}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img src={link.icon} className="h-8 w-8 object-contain" alt={link.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
