"use client";
import SignUpForm from "@/components/modules/auth/register/SignUpForm";
import React, { Suspense } from "react";
import loginPageBg from "../../../../src/assets/images/loginPageBg.jpg";
import CommonLoadingSpinner from "@/components/modules/loadingSpinner/CommonLoadingSpinner";
export default function SignUpPage() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed "
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${loginPageBg.src})`,
      }}
    >
      <div className="w-full sm:w-2/4 mt-24 sm:mt-8 p-8">
        <Suspense fallback={<CommonLoadingSpinner />}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
