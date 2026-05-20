import { useState } from 'react'

const SECTIONS = {
  home: {
    title: 'Home',
    items: [
      { icon: '📰', label: 'For You' },
      { icon: '👥', label: 'Following' },
      { icon: '⭐', label: 'Highlights' },
      { icon: '🔥', label: 'Trending' },
    ],
  },
  explore: {
    title: 'Explore',
    items: [
      { icon: '🌍', label: 'Trending Topics' },
      { icon: '🎨', label: 'Creative' },
      { icon: '💻', label: 'Tech' },
      { icon: '🎵', label: 'Music' },
    ],
  },
  reels: {
    title: 'Reels',
    items: [
      { icon: '▶️', label: 'Watch Now' },
      { icon: '❤️', label: 'Liked' },
      { icon: '🔖', label: 'Saved Reels' },
    ],
  },
  communities: {
    title: 'Communities',
    items: [
      { icon: '👾', label: 'Design Nerds' },
      { icon: '💻', label: 'Dev Lounge' },
      { icon: '🚀', label: 'Indie Hackers' },
    ],
  },
  events: {
    title: 'Events',
    items: [
      { icon: '📅', label: 'Upcoming' },
      { icon: '✅', label: 'Going' },
      { icon: '🗓️', label: 'Past Events' },
    ],
  },
  saved: {
    title: 'Saved',
    items: [
      { icon: '📌', label: 'All Saved' },
      { icon: '🖼️', label: 'Photos' },
      { icon: '🔗', label: 'Links' },
    ],
  },
}

export default function SideNav({ activeNav, onNav }) {
  const section = SECTIONS[activeNav] || SECTIONS.home
  const [activeItem, setActiveItem] = useState(section.items[0]?.label)

  return (
    <aside className="side-nav">
      <div className="side-nav-title">{section.title}</div>

      <div className="side-nav-search">
        <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>🔍</span>
        <input type="text" placeholder={`Search...`} />
      </div>

      <div className="side-nav-group">
        {section.items.map(item => (
          <div
            key={item.label}
            className={`side-nav-item ${activeItem === item.label ? 'active' : ''}`}
            onClick={() => setActiveItem(item.label)}
          >
            <span className="sni-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
