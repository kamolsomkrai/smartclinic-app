import { Inter } from "next/font/google";
import "./globals.css";
// import "materialize-css/dist/css/materialize.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "@/components/Sidebar";
import { DataProvider } from "../context/DataContext";
const inter = Inter({ subsets: ["latin-ext"] });

export const metadata = {
  title: "Smart Clinic",
  description: "Smart Clinic Odpc1",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex bg-zinc-50'>
          <Sidebar />
          <div className='flex-grow p-6 ml-64'>
            <DataProvider>{children}</DataProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
