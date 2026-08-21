import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: "rgba(243, 243, 243, 1)" }}>
        <Navbar />
        {children}
      </main>
    </div>
  );
}