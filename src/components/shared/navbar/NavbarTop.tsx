import React, { useEffect, useRef, useState } from "react";
import NavbarRight from "./NavbarRight";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function NavbarTop() {
  const [showSearchIcon, setShowSearchIcon] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If click is outside the searchRef
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchIcon(false);
      }
    }

    if (showSearchIcon) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showSearchIcon]);
  return (
    <div className="relative flex items-center justify-between gap-2">
      <div className="w-1/3">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold ">MyDia</h1>
        </Link>
      </div>
      {/* search input */}
      {!showSearchIcon && (
        <div
          onClick={(e) => {
            e.stopPropagation(); // prevent bubbling to window
            setShowSearchIcon(true);
          }}
          className="block sm:hidden w-2/3  absolute left-26 text-2xl"
        >
          <CiSearch />
        </div>
      )}
      {showSearchIcon && (
        <div ref={searchRef} className="w-2/3 absolute left-28">
          <div className=" flex items-center border w-48 focus-within:border-indigo-500 transition duration-300 pr-3 gap-2 bg-white border-gray-500/30 h-[30px] rounded-[5px] overflow-hidden">
            <input
              type="text"
              placeholder="Search for ideas"
              className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="22"
              height="22"
              viewBox="0 0 30 30"
              fill="#6B7280"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </div>
        </div>
      )}
      <div className=" w-1/5 flex justify-end">
        <NavbarRight />
      </div>
    </div>
  );
}
