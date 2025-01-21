"use client";

import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const navLinks = [
  // { title: "What we do", href: "/" },
  { title: "Home", href: "/" },
  { title: "products", href: "/products" },
  { title: "About Us", href: "/" },
  { title: "Contact", href: "/" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className=" py-3 fixed z-30 flex bg-[#4CAF50] w-full justify-between items-center px-[1rem] md:px-[2rem] lg:px-[4rem] m-auto">
      <div className=" flex gap-3 items-center">
        <h1 className=" font-thin text-xl text-white  font-font2">
          Annas_Secrets
        </h1>

        <main className="hidden md:flex items-center ">
          <div className="  border border-white p-[11px] rounded-tl-md rounded-bl-md">
            <IoSearchOutline className=" text-white font-bold" />
          </div>
          <input className="  border h-[40px] px-2 md:w-[300px] active:outline-none outline-none rounded-tr-md rounded-br-md bg-white" />
        </main>
      </div>
      <div className=" hidden lg:flex items-center list-none gap-8  mr-[20px]">
        <Link href={"/"} className=" cursor-pointer text-white">
          Home
        </Link>

        <Link href={"/products"} className=" cursor-pointer text-white">
          Products
        </Link>
        <li className=" cursor-pointer text-white">Blog</li>
      </div>
      <main className=" flex items-center gap-7">
        <div className=" relative">
          <HiOutlineShoppingBag size={35} className=" text-white" />
          <p className=" absolute text-sm right-0 bg-[#4CAF50] text-white  rounded-md text-center pb-2 h-[17px] w-[17px] bottom-0 font-medium">
            0
          </p>
        </div>
        <IoIosMenu
          size={35}
          className=" md:hidden text-white"
          onClick={toggleMenu}
        />
      </main>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-[#4CAF50] text-white py-10 px-[1rem]"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <h1 className=" font-thin text-xl  font-font2">
                  Annas_Secrets
                </h1>
                <p
                  className="cursor-pointer text-md text-white"
                  onClick={toggleMenu}
                >
                  <MdClose size={35} />
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden" key={index}>
                      <MobileNavLink
                        title={link.title}
                        href={link.href}
                        onClose={toggleMenu}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

type list = {
  title: string;
  href: string;
  onClose: () => void;
};

const MobileNavLink = ({ title, href, onClose }: list) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-2xl capitalize text-white"
      onClick={onClose}
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
