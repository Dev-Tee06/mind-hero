import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { Inter, Space_Grotesk } from 'next/font/google';
import SplashScreen from "../components/SplashScreen";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: "MindHeroes",
  description: "Educational platform for kids",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning={true} className="font-sans text-gray-900 antialiased overflow-x-hidden">
        <AuthProvider>
          <SplashScreen>
            <Navbar />
            {children}
          </SplashScreen>
        </AuthProvider>
      </body>
    </html>
  );
}
