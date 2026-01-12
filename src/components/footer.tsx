import { mastercard, paystack, visacard } from "@/asset";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navLinks = [
  { title: "Shop", href: "/products" },
  { title: "Collections", href: "/service" },
  { title: "About", href: "/about-us" },
  { title: "Contact", href: "/about-us" },
  { title: "Blog", href: "/about-us" },
];

const Footer = () => {
  return (
    <footer className="bg-[#412a1c] text-white mt-10">
      {/* Top Section */}
      <div className="px-[1rem] md:px-[2rem] lg:px-[4rem] py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold">Annas_Secrets</h3>
          <p className="text-xs text-gray-100 leading-5 mt-4 max-w-[220px]">
            Premium fashion and lifestyle essentials crafted to bring elegance,
            confidence, and comfort to everyday living.
          </p>
          <p className="text-xs text-gray-100 mt-4">
            Nnewi, Anambra State, Nigeria.
          </p>
          <p className="text-xs text-gray-100 mt-2">Phone: 08060665069</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-medium mb-4">Quick Links</h4>
          <ul className="space-y-3 text-xs text-gray-100">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className="hover:text-white transition">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-medium mb-4">Support</h4>
          <ul className="space-y-3 text-xs text-gray-100">
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Returns & Refunds</li>
            <li>Delivery Information</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-medium mb-4">
            Sign up for news & offers
          </h4>
          <input
            placeholder="Enter your email address"
            className="h-[42px] w-full text-xs px-3 rounded-md text-black outline-none"
          />

          <div className="flex items-center gap-3 mt-5">
            {[paystack, mastercard, visacard].map((card, idx) => (
              <Image
                key={idx}
                src={card}
                alt="payment method"
                width={45}
                height={30}
                className="bg-white rounded-md object-contain p-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#444] py-4 px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col md:flex-row items-center justify-between text-xs text-[#757575]">
        <p>© {new Date().getFullYear()} Annas_Secrets. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed & built with care.</p>
      </div>
    </footer>
  );
};

export default Footer;
