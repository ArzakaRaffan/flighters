import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../../../app/globals.css"
import { Button } from "@/components/ui/button"
import { Plane, LayoutDashboard, TicketsPlane, BookOpenText, Users, LogOut } from 'lucide-react'
import Link from "next/link";
import LogoutButton from "./components/button-logout"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard"
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = await getUser();

  if(!user){
    redirect('dashboard/login')
  }
  return (
    <section>
      <nav className="border-b p-5 border-black">
        <div className="flex flex-row items-center justify-between ml-4">
          <span className="font-bold text-emerald-800">
            Flighters Dashboard
          </span>
        </div>
      </nav>
      <section className="flex flex-row gap-5 items-start flex-nowrap">
        <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
          <div className="space-y-2 border-b-2 rounded-lg">
            <Button
              variant={"ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href={"/dashboard"}>
                <div className="flex flex-row items-center gap-3">
                  <LayoutDashboard /> Dashboard
                </div>
              </Link>
            </Button>
          </div>
          <div className="uppercase text-xs font-bold">Master Data</div>
          <div className="space-y-2 border-b-2 rounded-lg">
            <Button
              variant={"ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href={"/dashboard/airplanes"}>
                <div className="flex flex-row items-center gap-3">
                  <Plane /> Airplane
                </div>
              </Link>
            </Button>
          </div>

          <div className="space-y-2 border-b-2 rounded-lg">
            <Button
              variant={"ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href={"/dashboard/flights"}>
                <div className="flex flex-row items-center gap-3">
                  <BookOpenText /> Flights
                </div>
              </Link>
            </Button>
          </div>

          <div className="space-y-2 border-b-2 rounded-lg">
            <Button
              variant={"ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href={"/dashboard/tickets"}>
                <div className="flex flex-row items-center gap-3">
                  <TicketsPlane /> Tickets
                </div>
              </Link>
            </Button>
          </div>

          <div className="space-y-2 border-b-2 rounded-lg">
            <Button
              variant={"ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href={"/dashboard/users"}>
                <div className="flex flex-row items-center gap-3">
                  <Users /> Users
                </div>
              </Link>
            </Button>
          </div>

          <LogoutButton/>

        </section>
        <section className="grow mr-5 h-[87vh] overflow-y-auto">
          {children}
        </section>
      </section>
    </section>
  );
}
