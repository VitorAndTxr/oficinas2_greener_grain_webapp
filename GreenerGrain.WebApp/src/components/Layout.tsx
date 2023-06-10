import { ReactNode } from "react";


export function Layout({ children }: LayoutProps) {

  return (
    <>
      {children}
    </>
  );
}
interface LayoutProps {
  children: ReactNode;
}
