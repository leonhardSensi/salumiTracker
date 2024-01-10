import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <div className="">{children}</div>;
}
