"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, CakeSlice, PlusCircle, LogOut, Menu, X, MessageSquare } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Exclude auth pages from layout auth checks and sidebar
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password" || pathname.startsWith("/admin/reset-password");

  useEffect(() => {
    if (isAuthPage) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router, isAuthPage, pathname]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!isAuthorized) {
    return null; // Loading state before redirect
  }

  const navItems = [
    { name: "Cakes List", href: "/admin/cakes", icon: CakeSlice },
    { name: "Add Cake", href: "/admin/cakes/add", icon: PlusCircle },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#fcf0f0] flex text-foreground font-sans relative">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col shadow-sm z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-brand flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            OYA Admin
          </span>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-brand/10 text-brand"
                      : "text-foreground/70 hover:text-foreground hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-foreground/70 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden h-16 flex items-center px-4 bg-white border-b border-gray-200 shrink-0">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 font-bold text-lg text-brand flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            OYA Admin
          </span>
        </div>
        
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
