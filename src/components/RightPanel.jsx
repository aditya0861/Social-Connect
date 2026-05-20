import { useState } from 'react'

const INITIAL_PEOPLE = [
  { name: 'Alice Johnson', handle: '@alice', avatar: 'A', color: '#e17055', online: true, following: false },
  { name: 'Bob Smith',     handle: '@bob',   avatar: 'B', color: '#6c5ce7', online: true, following: false },
  { name: 'Carol White',   handle: '@carol', avatar: 'C', color: '#00b894', online: false, following: false },
  { name: 'David Lee',     handle: '@david', avatar: 'D', color: '#f59e0b', online: true, following: false },
  { name: 'Emma Davis',    handle: '@emma',  avatar: 'E', color: '#2563eb', online: false, following: false },
]

export default function RightPanel() {
  const [people, setPeople] = useState(INITIAL_PEOPLE)
  const [search, setSearch] = useState('')

  function toggleFollow(handle) {
    setPeople(prev => prev.map(p => p.handle === handle ? { ...p, following: !p.following } : p))
  }

  return (
    <aside className="right-panel">
      <div className="rp-search">
        <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>🔍</span>
        <input
          type="text"
          placeholder="Search Nexus..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="rp-card">
        <div className="rp-card-title">Who to follow</div>
        {people
          .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
          .map(p => (
            <div className="rp-person" key={p.handle}>
              <div className="rp-person-avatar-wrap">
                <div className="rp-person-avatar" style={{ background: p.color }}>{p.avatar}</div>
                {p.online && <div className="rp-online-dot" />}
              </div>
              <div className="rp-person-info">
                <div className="rp-person-name">{p.name}</div>
                <div className="rp-person-handle">{p.handle}</div>
              </div>
              <button
                className={`rp-follow-btn ${p.following ? 'following' : ''}`}
                onClick={() => toggleFollow(p.handle)}
              >
                {p.following ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
      </div>

      <div className="rp-footer">
        Nexus · Terms · Privacy · About
      </div>
    </aside>
  )
}
