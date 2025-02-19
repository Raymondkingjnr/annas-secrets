import React from "react";

const AboutUs = () => {
  return (
    <div className=" bg-gray-50">
      <div>
        <div
          className="text-center relative md:h-[300px] bg-cover bg-center"
          style={{
            background: `linear-gradient(to right, #f1ecec, #636161)`,
          }}
        >
          <div className=" py-14 md:py-20 text-center relative z-10 px-4 sm:px-6 lg:px-8">
            <h1 className=" font-medium text-2xl leading-9 text-gray-50 font-font">
              About Us
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-gray-50">
              Your journey to better health and radiant skin starts here.
            </p>
          </div>
        </div>

        <div className="pt-20 px-4 sm:px-6 md:px-[4rem]">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div>
              <h2 className="  py-2 font-semibold text-2xl font-font text-secondary_color">
                Our Mission
              </h2>
              <p className="mt-4 text-xs font-medium leading-7 text-text_color">
                At Annas secret, we are dedicated to providing high-quality
                supplements and skincare products that empower you to look and
                feel your best. Our mission is to combine science and nature to
                create products that are effective, safe, and sustainable.
              </p>
            </div>
            <div>
              <h2 className="  py-2 font-semibold text-2xl font-font text-secondary_color">
                Our Story
              </h2>
              <p className="mt-4 text-xs font-medium leading-7 text-text_color">
                Founded in 2019, Your Brand was born out of a passion for health
                and wellness. Our founders, wanted to create a brand that not
                only delivers results but also prioritizes transparency and
                ethical practices. From our humble beginnings, we have grown
                into a trusted name in the supplement and skincare industry.
              </p>
            </div>
          </div>

          <div className="pt-[7rem]">
            <h2 className="font-semibold text-2xl font-font text-secondary_color">
              Our Values
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="  py-4 font-thin text-xl text-[#333333]">
                  Quality
                </h3>
                <p className="mt-4 text-xs font-medium leading-7 text-text_color">
                  We source the finest ingredients and rigorously test our
                  products to ensure they meet the highest standards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="  py-4 font-thin text-xl text-[#333333]">
                  Transparency
                </h3>
                <p className="mt-4 text-xs font-medium leading-7 text-text_color">
                  We believe in full disclosure. Every product comes with
                  detailed information about its ingredients and benefits.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="  py-4 font-thin text-xl text-[#333333]">
                  Sustainability
                </h3>
                <p className="mt-4 text-xs font-medium leading-7 text-text_color">
                  We are committed to reducing our environmental footprint by
                  using eco-friendly packaging and sustainable practices.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[7rem] text-center">
            <div className="text-left md:text-center">
              <h2 className=" font-medium text-2xl leading-9 text-[#333333]">
                Join Our Community
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-black/70">
                Follow us on social media and be part of a community that values
                health, wellness, and beauty.
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.544a5.456 5.456 0 110 10.912 5.456 5.456 0 010-10.912zm0 1.802a3.654 3.654 0 100 7.308 3.654 3.654 0 000-7.308z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
