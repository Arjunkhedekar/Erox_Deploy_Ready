import React, { useState } from "react";
import "./FAQs.css";
import FAQItem from "./FAQItem";


const FAQs = () => {
   const faqs = [
      {
         question: "How does EROX Prints work?",
         answer: (
            <ol>
               <li>
                  <span>Choose Your Print Location and Upload Your File:</span>{" "}
                  Select the most convenient print location for you and upload
                  your document or image file.
               </li>
               <li>
                  <span>Customize Your Print Settings:</span> Adjust the print
                  settings to your preference and finalize your order with an
                  easy and secure payment process.
               </li>
               <li>
                  <span>Convenient Collection:</span> Your print will be sent
                  directly to your selected booth. Choose to have it stored for
                  later pickup or instantly printed for immediate collection.
               </li>
            </ol>
         ),
      },
      {
         question: "What file formats can I print?",
         answer:
            "You can upload documents in any of the popular file formats like JPG, JPEG, PNG, PDF, and many more.",
      },
      {
         question: "What page format does EROX Prints support?",
         answer: "At the moment, we offer printing in A4 format only.",
      },
      {
         question: "What are the pickup options?",
         answer:
            "You can choose to have your prints stored for later pickup or instantly printed for immediate collection at your selected booth.",
      },
      {
         question: "Are my documents stored & handled securely?",
         answer:
            "Your files are automatically printed at the selected location, safely picked and packed in a sealed envelope by the Store Team, and prepared for collection. Your documents are deleted from our servers once printed.",
      },
      // Add more FAQs here
   ];

   const [activeIndex, setActiveIndex] = useState(null);

   const toggleVisibility = (index) => {
      if (index === activeIndex) {
         // If the clicked item is already active, close it
         setActiveIndex(null);
      } else {
         // Otherwise, open the clicked item
         setActiveIndex(index);
      }
   };

   return (
      <div id="faqs-section">
         <h1>FAQs</h1>
         <div id="faq-items">
            {faqs.map((faq, index) => (
               <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isVisible={index === activeIndex}
                  onClick={() => toggleVisibility(index)}
               />
            ))}
         </div>
      </div>
   );
};

export default FAQs;
