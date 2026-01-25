import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/image-url";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import ReviewButton from "./review-button";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "paid":
      return "bg-green-100 text-green-800";
    case "delivered":
      return "bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function OrderHistory({ orders }: { orders: IOrderHistory[] }) {
  if (!orders) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible>
        {orders.map((order) => (
          <AccordionItem
            key={order._id}
            value={order._id}
            className="rounded-xl border mt-5 bg-white"
          >
            {/* HEADER */}
            <AccordionTrigger className="px-4 py-4 hover:no-underline">
              <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className=" flex flex-col md:flex-row gap-x-5 gap-y-1">
                    <p className="text-sm font-bold">
                      Order ID:{" "}
                      <span className="text-muted-foreground">
                        {(order.orderNumber ?? "").slice(0, 8)}…
                      </span>
                    </p>

                    <span className=" flex items-center gap-2">
                      <MapPinIcon
                        className=" text-gray-800"
                        size={17}
                        strokeWidth={1}
                      />
                      <p className="text-sm font-normal text-gray-800">
                        {order.address ?? ""}
                      </p>
                    </span>
                  </div>
                  <p className="text-sm pt-4 font-bold text-muted-foreground">
                    {formatDate(order.OrderDate ?? "")}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex mb-2 rounded w-fit mr-2 px-3 py-1 text-sm font-semibold ${getStatusStyles(
                      order.status ?? "",
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            {/* CONTENT */}
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* PRODUCTS */}
                {order.products?.map((item: ProductItem) => (
                  <div key={item._key} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        width={16}
                        height={16}
                        src={imageUrl(item.product.image).url()}
                        alt={item._key || "Product Image"}
                        className="object-contain rounded-md  h-16 w-16"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-bold truncate w-[100px] md:w-[300]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className=" flex md:hidden text-xs font-bold">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>

                    <p className="hidden md:flex text-sm font-bold">
                      {formatCurrency(item.product.price)}
                    </p>

                    <ReviewButton
                      productId={item.product._id}
                      productName={item.product.name ?? ""}
                    />
                  </div>
                ))}

                {/* FOOTER */}
                <div className="flex items-center justify-between border-t pt-4">
                  <p className="font-bold text-base">
                    Total: {formatCurrency(order.totalPrice ?? 0)}
                  </p>

                  <Button size="sm" variant="outline">
                    Write Review
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
