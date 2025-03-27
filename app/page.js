// app/page.js
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Welcome to Auth App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get started by signing in or creating an account.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <a 
            href="/signup" 
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center"
          >
            Sign Up
          </a>
          <a 
            href="/login" 
            className="w-full py-3 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300 text-center"
          >
            Log In
          </a>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          © 2024 Auth App. All rights reserved.
        </div>
      </div>
    </div>
  );
}