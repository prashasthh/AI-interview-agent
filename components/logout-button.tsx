"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export default function LogoutButton({ variant = "destructive", className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase client
      await firebaseSignOut(auth);
      
      // Remove server session cookie
      const result = await signOut();
      
      if (result.success) {
        toast.success("Logged out successfully");
        router.push("/sign-in");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant={variant}
      className={className}
    >
      Logout
    </Button>
  );
}