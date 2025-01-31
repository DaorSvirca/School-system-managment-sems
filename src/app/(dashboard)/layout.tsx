import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import NavBar from "@/components/nav-bar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-1 h-screen overflow-y-auto flex flex-col">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 p-3"
        >
          <Image src="/logo.png" width={32} height={32} alt="logo" />
          <span className="hidden lg:block">Cacttus Education</span>
        </Link>
        <Menu />
      </div>

      {/* Main content */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
        <NavBar />
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
