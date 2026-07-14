import Link from "next/link";
import ContactModal from "./ContactModal";

export default function Nav() {
  return (
    <nav className="flex gap-8 items-center px-8 py-5 border-b border-gray-200">
      <Link href="/" className="font-semibold text-lg">
        Axova
      </Link>
      <div className="flex gap-6 text-sm text-gray-600">
        <Link href="/about" className="hover:text-black transition">About</Link>
        <Link href="/services" className="hover:text-black transition">Services</Link>
        <Link href="/portfolio" className="hover:text-black transition">Portfolio</Link>
        <Link href="/contact" className="hover:text-black transition">Contact Us</Link>
      </div>
      <ContactModal />
    </nav>
  );
}
