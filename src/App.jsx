import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Services from "./pages/Services/Services";
import ContactUs from "./pages/ContactUs/ContactUs";
const App = () => {
    const [menu, setMenu] = useState("home");
    return (
        <div id="app">
            <Navbar setMenu={setMenu} menu={menu} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
            <Footer setMenu={setMenu} />
        </div>
    );
};

export default App;
