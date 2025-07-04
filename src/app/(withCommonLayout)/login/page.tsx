"use client";
import LoginForm from "@/components/modules/auth/login/LoginForm";
import loginPageBg from "../../../../src/assets/images/loginPageBg.jpg";
import { Suspense } from "react";
import CommonLoadingSpinner from "@/components/modules/loadingSpinner/CommonLoadingSpinner";
export default function LoginPage() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${loginPageBg.src})`,
      }}
    >
      <div className="w-full sm:w-2/5 sm:mt-8 p-8">
        <Suspense fallback={<CommonLoadingSpinner />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
