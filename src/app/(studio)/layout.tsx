import StudioLayout from "@/modules/studio/ui/layout/studio-layout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <StudioLayout>{children}</StudioLayout>;
}
