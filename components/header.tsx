import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Online Bus Tracking System
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-slate-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/send" className="hover:text-slate-300">
                  Data View
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
