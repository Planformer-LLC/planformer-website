import React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
  return <div className={"animate-fadeUp " + (className ?? "")}>{children}</div>;
}
