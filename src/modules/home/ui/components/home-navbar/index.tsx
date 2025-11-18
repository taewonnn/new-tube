import { SidebarTrigger } from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import AuthButtons from "@/modules/auth/ui/components/auth";

export default function HomeNavBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center bg-white px-2 pr-5">
      <div className="flex w-full items-center gap-4">
        {/* menu and logo*/}
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/">
            <div className="flex items-center p-4">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">NEW TUBE</p>
            </div>
          </Link>
        </div>
        <div className="mx-auto flex max-w-[720px] flex-1 justify-center">
          <SearchInput />
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
