import { Geist, Geist_Mono,   Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
const inter = Inter({
  subsets: ["latin", "vietnamese"]
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "wealth",
  description: "Your Financial Advisor",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <html lang="en">
        <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer>
            <div className="bg-black-500 py-12 px-4 text-center">
              <p>Made with 💖 By Shreyash </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
