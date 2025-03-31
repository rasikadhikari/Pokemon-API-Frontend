import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 h-auto  bg-gray-800 text-white flex flex-col">
        <nav className="flex-1">
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                to="/admin"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/type"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Types
              </Link>
            </li>
            <li>
              <Link
                to="/admin/region"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Region
              </Link>
            </li>
            <li>
              <Link
                to="/admin/move"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Moves
              </Link>
            </li>
            <li>
              <Link
                to="/admin/pokedex"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Pokedex
              </Link>
            </li>
            <li>
              <Link
                to="/admin/weakness"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Weakness
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
