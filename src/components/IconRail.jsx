import { useState, useRef, useEffect } from 'react'

const ICONS = [
  { id: 'home',        icon: '🏠', label: 'Home' },
  { id: 'explore',     icon: '🔭', label: 'Explore' },
  { id: 'reels',       icon: '🎬', label: 'Reels' },
  { id: 'communities', icon: '👾', label: 'Communities' },
  { id: 'events',      icon: '🎉', label: 'Events' },
  { id: 'saved',       icon: '🔖', label: 'Saved' },
]

export default function IconRail({ user, lightMode, onToggleLight, onLogout, activeNav, onNav, unreadCount, onOpenNotifs, onOpenProfile }) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function h(e) { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <aside className="icon-rail">
      {/* Logo */}
      <div className="rail-logo">N</div>

      {/* Nav icons */}
      <nav className="rail-nav">
        {ICONS.map(item => (
          <button
            key={item.id}
            className={`rail-btn ${activeNav === item.id ? 'active' : ''}`}
            title={item.label}
            onClick={() => onNav(item.id)}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="rail-bottom">
        {/* Notifications */}
        <button className="rail-btn" style={{ position: 'relative' }} title="Notifications" onClick={onOpenNotifs}>
          🔔
          {unreadCount > 0 && (
            <span className="rail-notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>

        <button className="rail-btn" title={lightMode ? 'Switch to dark mode' : 'Switch to light mode'} onClick={onToggleLight}>
          {lightMode ? '🌙' : '☀️'}
        </button>

        <div style={{ position: 'relative' }} ref={menuRef}>
          <div className="rail-avatar" onClick={() => setShowMenu(v => !v)} title={user?.name}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          {showMenu && (
            <div className="rail-user-menu">
              <div className="rum-header">
                <div className="rail-avatar" style={{ width: 42, height: 42, fontSize: 17 }}>{user?.name?.[0]?.toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{user?.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user?.email}</div>
                </div>
              </div>
              <div className="rum-divider" />
              <div className="rum-item" onClick={() => { setShowMenu(false); onOpenProfile() }}>👤 View profile</div>
              <div className="rum-divider" />
              <div className="rum-item" onClick={onLogout}>🚪 Log out</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
