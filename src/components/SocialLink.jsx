const SocialLink = ({ icon, link }) => {
   return (
     <a href={link} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
       <img src={icon || "/placeholder.svg"} alt="Social media icon" className="w-8 h-8" />
     </a>
   )
 }

export default SocialLink;
