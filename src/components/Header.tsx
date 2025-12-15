'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Taqyeem
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-white hover:text-gray-200 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-white hover:text-gray-200 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
            Contact Us
          </Link>
        </nav>
        <Link href="/login">
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}