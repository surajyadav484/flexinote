"use client";

import { cn } from "@/lib/utils";
import useScrollTop from "@/hooks/useScrollTop";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

function Navbar() {
  const scrolled = useScrollTop();
  const {isAuthenticated, isLoading} = useConvexAuth();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {
          isLoading && <Spinner />
        }
        {
          !isLoading && !isAuthenticated && (
            <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" >Log in</Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm" >Get Flexi Note Free</Button>
            </SignInButton>
            </>
          )
        }
        {
          isAuthenticated && !isLoading && (
            <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                Enter Flexi Note
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
            </>
          )
        }
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
