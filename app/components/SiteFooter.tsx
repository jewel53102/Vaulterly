import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="text-sm font-bold text-slate-900">
            Vaulterly
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <Link href="/blog" className="hover:text-slate-900">Blog</Link>
            <Link href="/how-it-works" className="hover:text-slate-900">How it works</Link>
            <Link href="/explore" className="hover:text-slate-900">Explore</Link>
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms of Service</Link>
          </nav>

          <div className="text-right">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Vaulterly
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              We do not sell your personal information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
