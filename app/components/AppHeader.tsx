import Link from "next/link";
import UserMenu from "./UserMenu";

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  showNewVaultButton?: boolean;
  isLoggedIn?: boolean;
  userEmail?: string;
  username?: string;
};

export default function AppHeader({
  title,
  subtitle,
  showNewVaultButton = true,
  isLoggedIn = false,
  userEmail = "",
  username = "",
}: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="container app-header-inner">
        <div className="app-header-left">
          <Link href="/" className="app-header-brand">
            <div className="brand-mark brand-mark-small" aria-hidden="true">
              <span className="brand-safe">
                <span className="brand-brain">◎</span>
              </span>
            </div>
            <div>
              <span className="brand-text">Vaulterly</span>
              {title ? <p className="app-header-subtitle">{title}</p> : null}
            </div>
          </Link>

          {subtitle ? <p className="app-header-meta">{subtitle}</p> : null}
        </div>

        <div className="app-header-actions">
          <Link href="/explore" className="button button-secondary button-small">
            Explore
          </Link>

          <Link href="/blog" className="button button-secondary button-small">
            Blog
          </Link>

          <Link href="/pricing" className="button button-secondary button-small">
            Pricing
          </Link>

          <Link href="/for-researchers" className="button button-secondary button-small">
            For Researchers
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="button button-secondary button-small">
                Dashboard
              </Link>

              {showNewVaultButton ? (
                <Link href="/welcome" className="button button-primary button-small">
                  + New Vault
                </Link>
              ) : null}

              <UserMenu initialEmail={userEmail} initialUsername={username} />
            </>
          ) : (
            <>
              <Link href="/login" className="button button-secondary button-small">
                Log In
              </Link>

              <Link href="/signup" className="button button-primary button-small">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
