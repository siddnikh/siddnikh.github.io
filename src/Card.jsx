import PropTypes from 'prop-types';

const RetroCard = ({ imageSrc, title, description, link }) => {
  return (
    <a href={link} target="_blank" className="w-72 p-5 bg-gray-900 border-4 border-gray-700 shadow-pixel font-retro text-white mx-auto mb-4 hover:bg-gray-800 hover:border-gray-600 hover:scale-105 transition-all duration-300 hover:cursor-pointer">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover mb-3 rounded" />
      <h2 className="text-green-400 text-3xl mb-2 pixel-shadow">{title}</h2>
      <p className="text-pink-500 text-xl">{description}</p>
    </a>
  );
};

export default RetroCard;
RetroCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};