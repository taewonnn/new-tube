import { SidebarTrigger } from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import AuthButtons from "@/modules/auth/ui/components/auth";
import StudioUploadModal from "../studio-upload-modal";

export default function StudioNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b bg-white px-2 pr-5 shadow-md">
      <div className="flex w-full items-center gap-4">
        {/* menu and logo*/}
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="flex items-center p-4">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>

        {/* spacer */}
        <div className="flex-1"></div>

        <div className="flex shrink-0 items-center gap-4">
          <StudioUploadModal />
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
