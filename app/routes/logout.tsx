import { useEffect } from "react";
import { auth as clientAuth } from "~/firebase.client";

import { MetaFunction, useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Logger ut... - Kon2ro" }];
};

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await clientAuth.signOut();

        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Error logging out:", error);
        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-secondary-100">Logger ut...</p>
    </div>
  );
}
