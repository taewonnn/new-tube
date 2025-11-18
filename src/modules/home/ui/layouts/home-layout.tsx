import { SidebarProvider } from "@/components/ui/sidebar";
import HomeNavBar from "@/modules/home/ui/components/home-navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavBar />
        <div className="pt-16">{children}</div>
      </div>
    </SidebarProvider>
  );
}
