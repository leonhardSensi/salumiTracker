import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Plus,
  PlusCircle,
  CheckCircle,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const checkActive = (tabId: string) => {
    return pathname === `/${tabId}`;
  };

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
      id: "home",
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      id: "dashboard",
    },
    {
      icon: BookOpen,
      label: "Recipes",
      href: "/recipes",
      id: "recipes",
    },
    {
      icon: PlusCircle,
      label: "Add Recipe",
      href: "/add_recipe",
      id: "add_recipe",
    },
    {
      icon: Plus,
      label: "Add Salume",
      href: "/add_salume",
      id: "add_salume",
    },
    {
      icon: CheckCircle,
      label: "Completed Salumi",
      href: "/salumi/completed",
      id: "salumi/completed",
    },
  ];

  return (
    <aside
      className="w-80 min-h-screen p-6 flex flex-col relative rounded-tr-3xl"
      style={{
        background:
          "linear-gradient(to bottom, rgb(170,100,55) 0%, rgb(170,100,55) 50%, rgb(250,240,225) 90%)",
      }}
    >
      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {navItems.map((item) => {
          const isActive = checkActive(item.id);
          const Icon = item.icon;

          return (
            <Link key={item.id} href={item.href} className="block">
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-stone text-eggshell shadow-md"
                    : "text-stone hover:bg-[#c9a88f] hover:shadow-sm"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium font-sans">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
