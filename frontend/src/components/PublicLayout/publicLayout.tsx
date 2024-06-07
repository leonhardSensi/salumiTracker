import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const PublicLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (
      (document.cookie.includes("logged_in=true") &&
        pathname === "/register") ||
      (document.cookie.includes("logged_in=true") && pathname === "/login")
    ) {
      router.push("/");
    }
  }, []);

  return <div className="font-Montserrat">{children}</div>;
};
