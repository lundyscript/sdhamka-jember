import NavbarComponent from "@/components/utils/navbar";
import React from "react";

const AuthLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <>
      <NavbarComponent/>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 gap-2">
        {children}
      </div>
    </>
  );
}

export default AuthLayout;