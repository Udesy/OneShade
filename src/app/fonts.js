import localFont from "next/font/local";

export const unbounded = localFont({
  src: [
    {
      path: "../../public/fonts/unbounded/Unbounded-VariableFont_wght.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-unbounded",
  display: "swap",
});

export const mplus2 = localFont({
  src: [
    {
      path: "../../public/fonts/m_plus_2/MPLUS2-VariableFont_wght.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
