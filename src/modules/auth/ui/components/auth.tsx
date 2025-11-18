import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export default function AuthButtons() {
  return (
    <div>
      <Button
        variant="outline"
        className="border-blue-500/2 rounded-full px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
      >
        <UserCircleIcon />
        Sign in
      </Button>
    </div>
  );
}
