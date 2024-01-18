import Calculator from "./Calculator";
// import type { Metadata } from "next";

export const metadata = {
  title: "Calculator",
  description: "A minimalistic UI calculator built with ReactJS and NextJS.",
  robots: { index: false, follow: false },
};

export default function CalculatorPage() {
  return <Calculator />;
}
