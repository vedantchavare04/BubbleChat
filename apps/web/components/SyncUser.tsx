"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function SyncUser() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/users/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
        }),
      });
    }
  }, [session]);

  return null;
}
