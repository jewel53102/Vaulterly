import Link from "next/link";
import UserMenu from "./UserMenu";

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  showNewVaultButton?: boolean;
};

export default function AppHeader({
  title,
  subtitle,
  showNewVaultButton = true,
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
          <Link href="/dashboard" className="button button-secondary button-small">
            Dashboard
          </Link>

          <Link href="/explore" className="button button-secondary button-small">
            Explore
          </Link>

          {showNewVaultButton ? (
            <Link href="/welcome" className="button button-primary button-small">
              + New Vault
            </Link>
          ) : null}

          <UserMenu />
        </div>
      </div>
    </header>
  );
}