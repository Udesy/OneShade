// For Next.js, use the path relative to the public folder
const Image1 = "/images/about-section/image1.jpg";
const Image2 = "/images/about-section/image2.jpg";
const Image3 = "/images/about-section/image3.jpg";
const Image4 = "/images/about-section/image4.jpg";

export const navItem = [
  {
    id: 0,
    title: "Home",
    url: "/",
  },
  {
    id: "1",
    title: "About",
    url: "/about",
  },
  {
    id: "2",
    title: "Product",
    url: "/product",
  },
  {
    id: "3",
    title: "Contact",
    url: "/contact",
  },
];

export const about_images = [
  {
    id: 0,
    src: Image1,
    alt: "Image1",
    className: "relative top-0 col-start-2 col-end-5",
    content: "Premium Essentials",
  },
  {
    id: 1,
    src: Image2,
    alt: "Image2",
    className: "relative top-[15rem] col-start-8 col-end-12",
    content: "Signature Collection",
  },
  {
    id: 2,
    src: Image3,
    alt: "Image3",
    className: "relative top-[25rem] col-start-2 col-end-5",
    content: "Seasonal Exclusives",
  },
  {
    id: 3,
    src: Image4,
    alt: "Image4",
    className: "relative top-[35rem] col-start-8 col-end-12",
    content: "Aesthetic Basics",
  },
];
