import React, { useState } from "react";
//  import "./Services.css";
import { assets } from "../../assets/assets";
import { HashLink } from "react-router-hash-link";
const Services = () => {
   const [expandedFeature, setExpandedFeature] = useState(null);
 
   const toggleExpand = (featureId) => {
     if (expandedFeature === featureId) {
       setExpandedFeature(null);
     } else {
       setExpandedFeature(featureId);
     }
   };
 
   const ServiceFeaturesList = [
     {
       icon: assets.whyErox_fastWay,
       heading: "A fast & efficient way to take printouts",
       short_description:
         "EroxPrints offers a streamlined process for taking printouts, reducing the time and effort typically associated with finding and using a printing service.",
       long_description:
         "EroxPrints offers a streamlined process for taking printouts, reducing the time and effort typically associated with finding and using a printing service. Users can quickly send their documents to a printer without the need to physically transfer files or wait in long queues. Our service aims at reducing the time that usually stalls the users creating a sense of inconvenience for customer which practically should not be there for prints as simple as one page documents. Our service directly connects you to our user friendly and efficient kiosk printing setups within just few clicks and all this done by the comfort of your zone weather be it from home, office, or directly infront of the printer setup.",
     },
     {
       icon: assets.whyErox_centralizedPlatform,
       heading: "Centralized printing store connection platform",
       short_description:
         "This platform connects multiple printing stores into a single network, allowing users to find the nearest or most convenient printing location. The centralized",
       long_description:
         "This platform connects multiple printing stores into a single network, allowing users to find the nearest or most convenient printing location. The centralized system ensures that users can access a wide range of printing services from various locations through one unified interface. The interface is simple enough for you to upload the documents on to central server and you can choose to print the document for it to be stored and collected at later time or you can just let it be on the central server and choose our nearby kiosk system at the time of your convenience that fits your closest location and just go to collect the print from the kiosk itself.",
     },
     {
       icon: assets.whyErox_24hrService,
       heading: "24 hr Printing Service",
       short_description:
         "EroxPrints provides round-the-clock printing services, ensuring that users can print documents at any time of the day or night. This 24-hour availability is especially useful",
       long_description:
         "EroxPrints provides round-the-clock printing services, ensuring that users can print documents at any time of the day or night. This 24-hour availability is especially useful for urgent or last-minute printing needs. The kiosk system being reliable and automated machine is designed to stay up all the time when you need it the most even at the last moment of your document submission to the government or presentation for you office or for your submission of colleges, this is not the case with the store that rely on manual labour which cant perform task all the time and not to mention their severe efficiency issues regarding operations.",
     },
     {
       icon: assets.whyErox_securePrintouts,
       heading: "Secure printouts without privacy concerns",
       short_description:
         "The platform prioritizes user privacy and security, ensuring that documents sent for printing are handled with the utmost confidentiality. This reduces the risk of unauthorized access or exposure of sensitive information",
       long_description:
         "The platform prioritizes user privacy and security, ensuring that documents sent for printing are handled with the utmost confidentiality. This reduces the risk of unauthorized access or exposure of sensitive information during the printing process. The files upon completion of prints are not stored at all on our server and are rather deleted automatically once it is printed leaving behind the sense of security to the customer unlike the uncertainty that holds in the conventional printing stores regarding the deletion of files as people working at the store may or may not delete the file depending on the crowd that holds in front of them. Users also can choose the time or forcefully delete the files uploaded to our server anytime they feel to do so as the privacy of your documents should be and aught to be given in the hands of user rather than some system or person.",
     },
     {
       icon: assets.whyErox_timeAndDistance,
       heading: "Printing time and travel distance estimation",
       short_description:
         "EroxPrints offers features that estimate the time required for printing and the travel distance to the chosen printing location. This helps users plan their schedules more effectively, knowing exactly how long it will take to get their printouts.",
       long_description:
         "EroxPrints offers features that estimate the time required for printing and the travel distance to the chosen printing location. This helps users plan their schedules more effectively, knowing exactly how long it will take to get their printouts. At all the point of time we provide you the information regarding the status of the print so that you can plan accordingly the situation the exact timing of your collection. This can either be handled as letting our smart kiosk systems to store your print on one of the racks leaving you with ample amount of time to just go and collect the print from the stored rack of respective kiosk, or upload the document to the server and go to location and then print the document in whichever machine you in front of. In both cases you can look and compare the stall times that a certain kiosk machine is in state and strategically based on that information can choose the kiosk system while also being able to view distance of that machine from your location adding the one more layer of convenience and not worry about those hefty cumbersome driven task of going to store without knowing the state of crowd and ending up waiting for couple of minute just for the paper of your choice to be printed.",
     },
     {
       icon: assets.whyErox_homeDelivery,
       heading: "Home Delivery for Bulk printing",
       short_description:
         "For users requiring large volumes of printing, EroxPrints provides a home delivery service. This eliminates the need for users to carry heavy printouts and ensures that",
       long_description:
         "For users requiring large volumes of printing, EroxPrints provides a home delivery service. This eliminates the need for users to carry heavy printouts and ensures that bulk orders are delivered directly to their doorstep, adding convenience and saving time. Weather your business being a offline or online tuition, or some government firm running on tight timelines and hurdles or a simple sole user wishing to look for printing something in bulk and have it deliver at the steps of your door, we can manage it for you so that you may never run out of the feeling of having something delivered at you doorstep just like some fancy electronic things being delivered to you",
     },
   ];
 
   return (
     <div className="w-full">
       {/* Services Banner */}
       <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-7 py-8 md:py-16 px-4 md:px-14 bg-[#aae8fc]">
         <div className="flex flex-col items-center md:items-start gap-4 md:gap-8 w-full md:w-1/2">
           <h1 className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-bold text-center md:text-left">
             Our Services
           </h1>
           <h3 className="font-poppins text-xl md:text-2xl font-medium text-center md:text-left">
             Innovative Printing Services at Your Fingertips
           </h3>
 
           <HashLink
             smooth
             to="/services#services-features"
             className="w-full md:w-3/4 mt-8 md:mt-20"
           >
             <button className="w-full py-3 md:py-4 px-4 rounded-full bg-[#00c2ff] text-white font-inter text-lg md:text-2xl font-medium hover:bg-[#0095cc] transition-colors">
               Discover More{" "}
               <img src={assets.dropdown_white_icon} alt="" className="inline ml-2 w-4 h-4 md:w-6 md:h-6" />
             </button>
           </HashLink>
         </div>
         <img
           src={assets.services_illustration}
           alt="Services illustration"
           className="w-full md:w-1/2 max-w-md mx-auto md:max-w-none"
         />
       </div>
 
       {/* Services Features */}
       <div className="flex flex-col items-center gap-12 md:gap-20 py-12 md:py-16 px-4 md:px-14">
         {ServiceFeaturesList.map((feature, index) => (
           <ServiceFeature
             key={index}
             icon={feature.icon}
             heading={feature.heading}
             short_description={feature.short_description}
             long_description={feature.long_description}
             isExpanded={expandedFeature === index}
             toggleExpand={() => toggleExpand(index)}
           />
         ))}
       </div>
     </div>
   );
 };
 
 const ServiceFeature = ({
   icon,
   heading,
   short_description,
   long_description,
   isExpanded,
   toggleExpand,
 }) => {
   return (
     <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-8 md:gap-12 w-full pb-12 md:pb-16 border-b border-black">
       <img 
         src={icon} 
         alt="" 
         className="w-1/3 md:w-1/6 max-w-[120px] mt-2 md:mt-8" 
       />
       <div className="w-full md:w-3/5">
         <h2 className="font-inter text-2xl md:text-3xl font-semibold text-[#00c2ff] text-center md:text-left">
           {heading}
         </h2>
         <p className="font-poppins text-lg md:text-xl font-medium mt-4 md:mt-8 text-center md:text-left">
           {isExpanded ? long_description : short_description}
           <span 
             onClick={toggleExpand}
             className="ml-3 underline font-inter text-xl font-semibold text-[#9821e0] cursor-pointer hover:text-[#7a1ab3]"
           >
             {isExpanded ? "Read Less..." : "Read More..."}
           </span>
         </p>
       </div>
     </div>
   );
 };

export default Services;
