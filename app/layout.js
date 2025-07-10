import GoTo from "@/components/GoTo";
import "./fanta.css"
import "./globals.css";
import Head from "./Head";
import Link from "next/link";
import { AuthProvider } from "@/context/authContext";

export const metadata = {
  title: "expense tracker",
  description: "tracks subscriptions",
};

export default function RootLayout({ children }) {
  const header = (
    <header>
      <div>
        <Link href={"/"}>
          <h1 className="text-gradient">Expense Manager</h1>
        </Link>
        <p>The Subscription Tracker</p>
      </div>
      <GoTo />
    </header>
  );
  const footer = (
    <footer>
      <div className="hard-line"/>
      <div className="footer-content">
        <div>
          <div>
            <h4>Expenny</h4>
            <p>|</p>
            <button disabled>Install app</button>
          </div>
          <p className="copyright">&copy; copyright 2025</p>
        </div>
        <div>
          <p>facing issues? <a>Get Help</a></p>
          <p>Suggestions for improvement? <a>Share Feedback</a></p>
          <div>
            <Link href={"/privacy"}>Privacy</Link>
            <Link href={"/tos"}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body >
          {header}
          <div className="full-line"/>
          <main>{children}</main>
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
