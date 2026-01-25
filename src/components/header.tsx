"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { ShoppingCart, UserRound } from "lucide-react";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import useBasketStore from "@/store/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiInstagramLogo, PiWhatsappLogo } from "react-icons/pi";

/* ---------------- NAV LINKS ---------------- */

const navLinks = [
  { title: "shop", href: "/products" },
  { title: "collections", href: "/service" },
  // { title: "about", href: "/about-us" },
  { title: "contact", type: "dropdown" },
  { title: "my orders", href: "/order", auth: true },
];

const socials = [
  {
    icon: <PiInstagramLogo strokeWidth={3} size={30} />,
    label: "Instagram",
    href: "https://www.instagram.com/annas_secrets?igsh=a2hkZ2dkZWdpMTE5",
  },
  {
    icon: <PiWhatsappLogo strokeWidth={3} size={30} />,
    label: "WhatsApp",
    href: "https://wa.me/2348060665069",
  },
];

/* ---------------- ANIMATIONS ---------------- */

const menuVars = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.12, 0, 0.39, 0),
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const containerVars = {
  initial: {
    transition: { staggerChildren: 0.09, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.3, staggerChildren: 0.09 },
  },
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.37, 0, 0.63, 1),
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: cubicBezier(0, 0.55, 0.45, 1),
    },
  },
};

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const toggleMenu = () => setOpen((prev) => !prev);

  const itemCount = useBasketStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  return (
    <div className="fixed top-3 left-0 right-0 z-50 max-w-[1550px] mx-auto px-2">
      <header className="flex items-center justify-between rounded-md bg-white px-4 md:px-8 lg:px-16 py-1">
        {/* LOGO */}
        <Link href="/" className="text-lg md:text-xl font-bold text-black/75">
          Annas
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.auth && !user) return null;

            if (link.type === "dropdown") {
              return (
                <DropdownMenu key={link.title}>
                  <DropdownMenuTrigger className="text-sm font-bold capitalize text-[#57524b] outline-none">
                    {link.title}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {socials.map((social) => (
                      <DropdownMenuItem key={social.label} asChild>
                        <Link
                          href={social.href}
                          target="_blank"
                          className=" flex items-center gap-4"
                        >
                          {social.icon}
                          {social.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={link.title}
                href={link.href!}
                className="text-sm font-bold capitalize text-[#57524b]"
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          <ClerkLoaded>
            {user ?
              <SignedIn>
                <div className="flex items-center gap-2">
                  <UserButton />
                  <span className="hidden sm:block text-sm font-semibold capitalize">
                    {user.firstName}
                  </span>
                </div>
              </SignedIn>
            : <SignInButton>
                <UserRound size={24} className="cursor-pointer text-black" />
              </SignInButton>
            }
          </ClerkLoaded>

          <Link href="/cart-page" className="relative p-3">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <IoIosMenu
            size={26}
            className="lg:hidden cursor-pointer text-black/70"
            onClick={toggleMenu}
          />
        </div>
      </header>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 origin-top bg-white px-4 py-10"
          >
            <div className="relative flex h-full flex-col">
              <SlClose
                size={26}
                className="absolute right-6 top-4 cursor-pointer"
                onClick={toggleMenu}
              />

              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                className="flex flex-1 flex-col items-center justify-center gap-6"
              >
                {navLinks.map((link) => {
                  if (link.auth && !user) return null;

                  if (link.type === "dropdown") {
                    return (
                      <div key={link.title} className="text-center">
                        <p className="font-bold capitalize text-lg text-[#57524b] mb-2">
                          contact
                        </p>
                        <div className="flex flex-col gap-2">
                          {socials.map((social) => (
                            <Link
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              onClick={toggleMenu}
                              className="text-sm font-semibold text-[#57524b]"
                            >
                              {social.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <MobileNavLink
                      key={link.title}
                      title={link.title}
                      href={link.href!}
                      onClose={toggleMenu}
                    />
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;

/* ---------------- MOBILE LINK ---------------- */

type MobileNavLinkProps = {
  title: string;
  href: string;
  onClose: () => void;
};

const MobileNavLink = ({ title, href, onClose }: MobileNavLinkProps) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      onClick={onClose}
      className="text-xl capitalize"
    >
      <Link href={href} className="font-bold text-[#57524b]">
        {title}
      </Link>
    </motion.div>
  );
};
