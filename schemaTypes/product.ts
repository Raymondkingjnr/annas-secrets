import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      name: "topSales",
      title: "top sales",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      title: "description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Price",
      name: "price",
      type: "number",
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      title: "Stock",
      name: "stock",
      type: "number",
      validation: (Rule) => Rule.required().error("Required"),
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required().error("Required"),
    }),
  ],
});
