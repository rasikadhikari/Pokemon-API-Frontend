import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <p className="text-sm">
                Welcome to the Pokémon World, where you can explore various
                regions, discover Pokémon, and embark on exciting adventures!
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-sm hover:text-green-400">
                    Terms and condition
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#region" className="text-sm hover:text-green-400">
                    Security
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#pokemon" className="text-sm hover:text-green-400">
                    privacy notice
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm hover:text-green-400">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="#" className="hover:text-green-400">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href="#" className="hover:text-green-400">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-700" />

          <div className="text-center text-sm">
            <p>&copy; 2025 Pokémon World. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
