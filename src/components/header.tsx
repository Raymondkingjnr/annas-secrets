"use client";

import React from "react";
import { BsCartCheckFill } from "react-icons/bs";

import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SlClose } from "react-icons/sl";
import useBasketStore from "@/store/store";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";

const navLinks = [
  // { title: "What we do", href: "/" },
  { title: "products", href: "/products" },
  { title: "Service", href: "/service" },
  { title: "About Us", href: "/about-us" },
  // { title: "Article", href: "/" },
];

const socials = [
  {
    title: "Facebook",
    icon: <FaFacebookSquare size={25} />,
    href: "https://www.facebook.com/share/19wjUDouzU/?mibextid=wwXIfr",
  },
  {
    title: "Instagram",
    icon: <FaInstagramSquare size={25} />,
    href: "https://www.instagram.com/annas_secrets?igsh=a2hkZ2dkZWdpMTE5",
  },
  {
    title: "Whatsapp",
    icon: <FaWhatsappSquare size={25} />,
    href: "https://wa.me/2348060665069",
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
    <header className=" py-3 fixed z-30 flex shadow-md bg-white w-full justify-between items-center px-[1rem] md:px-[2rem] lg:px-[4rem] m-auto">
      <div className=" flex gap-3 items-center">
        <Link href={"/"} className="text-xl text-black/75  font-font2">
          Annas_Secrets
        </Link>
      </div>
      <div className=" hidden lg:flex items-center list-none gap-8  mr-[20px]">
        <Link
          href={"/products"}
          className=" cursor-pointer text-black/75 text-sm font-semibold font-font2"
        >
          Products
        </Link>

        <Link
          href={"/service"}
          className=" cursor-pointer text-black/75 text-sm font-semibold font-font2"
        >
          Service
        </Link>
        {/* <Link href={"/"} className=" cursor-pointer text-black/65 text-sm font-semibold font-font2">
          Article
        </Link> */}
        <Link
          href={"/about-us"}
          className=" cursor-pointer text-black/75 text-sm font-semibold font-font2"
        >
          About Us
        </Link>
      </div>
      <main className=" flex items-center gap-7">
        <div className="hidden md:flex gap-3 items-center">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-black/75 rounded-lg"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <Link href={"/cart-page"} className=" relative p-4">
          <BsCartCheckFill size={25} className=" text-black/75" />
          <div className="flex justify-center items-center">
            <p className=" absolute text-sm right-0 bg-base_color text-white rounded-3xl text-center pt-[2px] h-6 w-6 top-0 font-semibold">
              {itemCount}
            </p>
          </div>
        </Link>
        <IoIosMenu
          size={35}
          className=" lg:hidden text-black/65"
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
            className="fixed left-0 top-0 w-full h-screen origin-top bg-base_color text-white py-10 px-[1rem]"
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
                <div className="flex gap-3 mt-4 items-center">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white rounded-lg"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
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
      className="text-xl capitalize text-white"
      onClick={onClose}
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
