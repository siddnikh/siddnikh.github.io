import { useEffect } from 'react';

const CursorEffect = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const glow = document.createElement('div');
      glow.className = 'click-glow';
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      
      document.body.appendChild(glow);
      
      // Remove element after animation finishes
      setTimeout(() => {
        glow.remove();
      }, 400);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default CursorEffect;
