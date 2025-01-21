import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "product",
  type: "document",
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
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
      validation: (Rule) => Rule.required().error("Required"),
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
