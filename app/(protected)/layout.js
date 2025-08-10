"use client"; // required because we use browser-only features (localStorage, useEffect)

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true); // to prevent flash before validation

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/loginPage");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      const isExpired = payload?.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/loginPage");
        return;
      }

      // token is valid
      setChecking(false);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.replace("/loginPage");
    }
  }, [router]);

  if (checking) return null; // show nothing until check is done

  return <>{children}</>;
}
