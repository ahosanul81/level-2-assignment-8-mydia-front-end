import LoginForm from "@/components/modules/auth/login/LoginForm";
import loginPageBg from "../../../../src/assets/images/loginPageBg.jpg";
export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${loginPageBg.src})`,
      }}
    >
      <LoginForm />
    </div>
  );
}
