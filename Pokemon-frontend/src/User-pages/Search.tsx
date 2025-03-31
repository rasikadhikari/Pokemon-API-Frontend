import React from "react";
import { SearchNormal } from "iconsax-react";

function Search() {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Enter Pokemon Name"
        className="border-b-2 w-auto"
      ></input>
      <button>
        <SearchNormal size="32" color="#37d67a" />
      </button>
    </div>
  );
}
export default Search;
