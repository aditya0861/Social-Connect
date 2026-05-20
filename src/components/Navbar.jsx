import { useState, useRef, useEffect } from 'react'

export default function Navbar({ darkMode, onToggleDarkMode, user, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">Nexus</div>
        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search Vibe..." />
        </div>
      </div>

      <div className="nav-center">
        <div className="nav-tab active" title="Home">🏠</div>
        <div className="nav-tab" title="Explore">🔭</div>
        <div className="nav-tab" title="Reels">🎬</div>
        <div className="nav-tab" title="Communities">👾</div>
        <div className="nav-tab" title="Events">🎉</div>
      </div>

      <div className="nav-right">
        <div style={{ position: 'relative' }} ref={menuRef}>
          <div className="nav-avatar" onClick={() => setShowUserMenu(v => !v)}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          {showUserMenu && (
            <div className="nav-user-menu">
              <div className="nav-user-info">
                <div className="nav-avatar" style={{ width: 44, height: 44, fontSize: 18 }}>
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{user?.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user?.email}</div>
                </div>
              </div>
              <div className="nav-menu-divider" />
              <div className="nav-menu-item" onClick={onLogout}>🚪 Log out</div>
            </div>
          )}
        </div>

        <button className="nav-icon-btn" title="Toggle theme" onClick={onToggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button className="nav-icon-btn" title="Messages">
          💬 <span className="nav-badge">3</span>
        </button>
        <button className="nav-icon-btn" title="Notifications">
          🔔 <span className="nav-badge">5</span>
        </button>
      </div>
    </nav>
  )
}
