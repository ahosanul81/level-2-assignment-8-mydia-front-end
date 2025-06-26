import SignUpForm from "@/components/modules/auth/register/SignUpForm";
import React from "react";
import loginPageBg from "../../../../src/assets/images/loginPageBg.jpg";
export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${loginPageBg.src})`,
      }}
    >
      <SignUpForm />
    </div>
  );
}
