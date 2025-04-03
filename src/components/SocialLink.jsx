const SocialLink = ({ icon, link }) => {
   return (
      <a href={link} target="_blank" rel="noopener noreferrer">
         <img src={icon} alt="" />
      </a>
   );
};

export default SocialLink;
