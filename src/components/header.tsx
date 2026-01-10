"use client";

import React from "react";
import { BsCartCheckFill } from "react-icons/bs";

import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SlClose } from "react-icons/sl";
import useBasketStore from "@/store/store";
import { HandbagIcon, UserRound } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const navLinks = [
  { title: "products", href: "/products" },
  { title: "Service", href: "/service" },
  { title: "About Us", href: "/about-us" },
];

const socials = [
  {
    icon: <UserRound size={20} color="#000" strokeWidth={2} />,
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const itemCount = useBasketStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

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
    <div className="  fixed top-3 max-w-[1550px] mx-auto left-0 right-0 px-2 z-50">
      <header className=" py-[2px] flex rounded-md  justify-between items-center px-[1rem] md:px-[2rem] lg:px-[4rem]  bg-white">
        <div className=" flex gap-3 items-center">
          <Link href={"/"} className="text-base font-semibold text-black/75">
            Annas
          </Link>
        </div>
        <div className=" hidden lg:flex items-center list-none gap-8  mr-[20px]">
          <Link
            href={"/products"}
            className=" cursor-pointer text-[#57524b] text-sm font-semibold "
          >
            Shop
          </Link>

          <Link
            href={"/service"}
            className=" cursor-pointer text-[#57524b] text-sm font-semibold "
          >
            Collections
          </Link>

          <Link
            href={"/about-us"}
            className=" cursor-pointer text-[#57524b] text-sm font-semibold "
          >
            About
          </Link>
          <Link
            href={"/about-us"}
            className=" cursor-pointer text-[#57524b] text-sm font-semibold "
          >
            Blog
          </Link>
          <Link
            href={"/about-us"}
            className=" cursor-pointer text-[#57524b] text-sm font-semibold "
          >
            Contact
          </Link>
        </div>

        <main className=" flex items-center gap-1 ">
          <div className=" flex gap-3 items-center">
            <SignedOut>
              <SignInButton>
                <UserRound
                  size={20}
                  color="#000"
                  strokeWidth={2}
                  className=" cursor-pointer"
                />
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className=" flex items-center gap-2 ">
            <Link href={"/cart-page"} className=" relative p-4">
              <HandbagIcon size={20} strokeWidth={2} color="#000" />
              <div className="flex justify-center items-center">
                <p className=" absolute text-[12px] right-4 md:right-2 bg-green-950 text-white rounded-3xl  text-center pt-[0.1px] md:pt-[1px] h-4 w-4 md:h-[19px] md:w-[19px] top-3 font-bold">
                  {itemCount}
                </p>
              </div>
            </Link>
            <IoIosMenu
              size={25}
              className=" lg:hidden text-black/65"
              onClick={toggleMenu}
            />
          </div>
        </main>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 top-0 z-30 w-full h-screen origin-top bg-white text-gray-900 py-10 px-[1rem]"
            >
              <div className="flex h-full relative flex-col">
                <div className="flex justify-between">
                  {/* <h1 className=" font-thin text-lg  font-font">Annas_Secrets</h1> */}
                  <p
                    className="cursor-pointer text-md text-gray-900 absolute right-6"
                    onClick={toggleMenu}
                  >
                    <SlClose size={24} />
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
    </div>
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
      className="text-xl capitalize text-gray-900"
      onClick={onClose}
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
