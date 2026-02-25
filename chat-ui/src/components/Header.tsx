import { TENANT_NAME, TENANT_SLUG } from "../config";

interface HeaderProps {
  creditBalance: string;
  onCallClick: () => void;
}

export default function Header({ creditBalance, onCallClick }: HeaderProps) {
  return (
    <header>
      <div className="brand-bar">
        <div className="brand-identity">
          <span className="brand-logo">Saber</span>
          <a
            href="https://saber.co"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-link"
          >
            saber.co
          </a>
        </div>
        <button
          type="button"
          className="header-action-btn"
          onClick={onCallClick}
        >
          Call me
        </button>
      </div>

      <div className="chat-info">
        <div className="user-details">
          <h1>{TENANT_NAME}</h1>
          <div className="user-status">{TENANT_SLUG}</div>
        </div>
        <div className="credits-chip">
          Credits: <strong>{creditBalance}</strong>
        </div>
      </div>
    </header>
  );
}
