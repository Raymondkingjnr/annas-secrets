"use client";

import { useRouter } from "next/navigation";
import React from "react";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    router.push(`/search?query=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by product, brand, category..."
        className="border border-gray-300 h-[40px] px-2 w-full md:w-[300px] lg:w-[400px] text-sm text-[#757575] rounded-2xl outline-[#d09e80]"
      />
    </form>
  );
};

export default SearchInput;
