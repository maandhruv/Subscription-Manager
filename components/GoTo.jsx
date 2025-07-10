'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

const GoTo = () => {
  const {currentUser, logout} = useAuth();
  const isAuthenticated = !!currentUser; // Replace with actual authentication logic
  const path = usePathname();
  return (
    <div className="goto">
      {path == "/" && (
          <>
            <Link href={"/dashboard?register=true"}>
              <p>sign up</p>
            </Link>
            <Link href={"/dashboard"}>
              <button>login &rarr;</button>
            </Link>
          </>
        )}
        {(isAuthenticated && path =="/dashboard") && (
          <button onClick={logout}>Logout</button>
        )}
    </div>
  )
}

export default GoTo