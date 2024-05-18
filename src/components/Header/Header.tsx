"use client";

import Image from "next/image";
import React, {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import DropDown from "@/components/DropDown/DropDown";
import { getUser } from "@/lib/actions/user.actions";
import { User } from "next-auth";

const Header = () => {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);

  const show: MouseEventHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setShowDropDown((prev) => !prev);
  };

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <header>
      <Link href="/app/blogs">Blog App</Link>
      <form>
        <input type="text" placeholder="Search blog..." />
      </form>
      <div className="right-side">
        <FaSearch size={20} className="search" color="white" />
        <div onClick={show} className="image-area">
          {user?.image !== null ? (
            <Image src={user?.image as string} alt="" width={65} height={65} />
          ) : (
            <div className="image-placeholder">{user?.name?.charAt(0)}</div>
          )}
        </div>
        {showDropDown && (
          <DropDown handleClose={() => setShowDropDown(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;
