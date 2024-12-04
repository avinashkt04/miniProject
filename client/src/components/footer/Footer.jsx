import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-[#020817c1]/90 border-t border-gray-700/30 flex justify-center items-center py-2">
      <p>&copy; {currentYear} All Rights Reserved</p>
    </div>
  );
}

export default Footer;