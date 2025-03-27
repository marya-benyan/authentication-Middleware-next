// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Auth App',
  description: 'Sign Up and Login with JWT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-blue-700 text-white p-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Auth App</h1>
            <nav className="space-x-6">
              <a href="/" className="text-lg hover:text-blue-200 transition duration-300">Home</a>
              <a href="/signup" className="text-lg hover:text-blue-200 transition duration-300">Sign Up</a>
              <a href="/login" className="text-lg hover:text-blue-200 transition duration-300">Login</a>
              <a href="/dashboard" className="text-lg hover:text-blue-200 transition duration-300">Dashboard</a>
            </nav>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>
        <footer className="bg-blue-700 text-white p-4 text-center">
          <p className="text-sm">&copy; 2025 Auth App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}