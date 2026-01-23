import { ReactNode } from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";
import LogoutButton from "@/components/logout-button";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-100">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">IntervAi</h2>
        </Link>
        
        <LogoutButton variant="destructive" className="bg-red-500 hover:bg-red-600" />
      </nav>
      
      {children}
    </div>
  )
}

export default RootLayout