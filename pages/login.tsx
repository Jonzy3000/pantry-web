import { useRouter } from "next/router";
import { LoginPage } from "../components/login/LoginPage";

const Login = () => {
  const router = useRouter();

  // Let's hope they came from a good place
  return <LoginPage onLogin={() => router.back()} />;
};

export default Login;
