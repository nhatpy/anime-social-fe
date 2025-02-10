import { useState, useEffect } from "react";
import { icons } from "../utils/icons";

export const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
          setVisible(window.scrollY > 300);
        };
    
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
      }, []);
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-md transition-opacity ${
                visible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            {icons.up}
        </button>
    )
}
