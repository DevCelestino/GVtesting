import { Sidebar } from "./Components";

export const RootLayout = ({ children }: any) => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main
        className="flex-1 mx-auto py-10"
        style={{
          maxWidth: '100vw',
          maxHeight: '100vh',
          overflowY: 'auto',
          padding: '80px'
        }}
      >
        {children}
      </main>
    </div>
  );
}
