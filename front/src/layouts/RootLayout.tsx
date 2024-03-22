import Sidebar from "./sidebar";

function RootLayout({ children }: any) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="max-w-screen-2xl flex-1 mx-auto py-10">{children}</main>
    </div>
  );
}

export default RootLayout;
