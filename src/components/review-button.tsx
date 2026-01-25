"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReviewForm from "./review-form";

export default function ReviewButton({
  productId,
  productName,
}: {
  productId: string;
  productName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className=" ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" border border-[#d09e80] bg-transparent text-[#db9c75] font-bold hover:bg-transparent">
            Leave a Review
          </Button>
        </DialogTrigger>

        <DialogContent className=" rounded-xl">
          <DialogHeader>
            <DialogTitle>Write a review for </DialogTitle>
            <p>{productName ?? ""} </p>
          </DialogHeader>

          <ReviewForm productId={productId} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
