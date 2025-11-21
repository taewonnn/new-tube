"use client";

import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ClapperboardIcon, UserCircleIcon } from "lucide-react";

export default function AuthButtons() {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link href="/studio" label="Studio" labelIcon={<ClapperboardIcon className="size-4" />} />
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <div>
            <Button
              variant="outline"
              className="border-blue-500/2 rounded-full px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
            >
              <UserCircleIcon />
              Sign in
            </Button>
          </div>
        </SignInButton>
      </SignedOut>
    </>
  );
}
