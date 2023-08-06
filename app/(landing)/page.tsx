import { Button } from "@/components/ui/button";
import Link from "next/link";

// fijate que esta va a ser la page que esté en /
const LandingPage = () => {
  return (
    <div>
      Landing Page(unprotected)
      <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;
