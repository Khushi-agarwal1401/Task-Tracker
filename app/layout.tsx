import "./globals.css"
import Navbar from "./components/Navbar"
import ToastProvider from "./components/ToastProvider"

// Apply the saved theme before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.classList.add("dark")}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Navbar />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
