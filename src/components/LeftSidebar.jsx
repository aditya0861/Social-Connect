const NAV_ITEMS = [
  { icon: '👤', label: 'Profile', accent: true },
  { icon: '🔭', label: 'Explore' },
  { icon: '🎬', label: 'Reels' },
  { icon: '👾', label: 'Communities' },
  { icon: '🎉', label: 'Events' },
  { icon: '🔖', label: 'Saved' },
  { icon: '📡', label: 'Following' },
]

export default function LeftSidebar() {
  return (
    <aside className="sidebar-left">
      {NAV_ITEMS.map(item => (
        <div className="sidebar-nav-item" key={item.label}>
          <div className={`sn-icon ${item.accent ? 'accent' : ''}`}>{item.icon}</div>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="see-more-btn">
        <div className="sn-icon">▾</div>
        <span>See more</span>
      </div>

      <div className="sidebar-divider" />
      <div className="sidebar-section-title">Your spaces</div>

      {['Design Nerds', 'Dev Lounge', 'Indie Hackers'].map(g => (
        <div className="sidebar-nav-item" key={g}>
          <div className="sn-icon">✦</div>
          <span>{g}</span>
        </div>
      ))}
    </aside>
  )
}
