const STORIES = [
  { name: 'Alice', color: 'linear-gradient(160deg,#3b82f6,#6366f1)', avatar: 'A', avatarColor: '#3b82f6' },
  { name: 'Bob',   color: 'linear-gradient(160deg,#10b981,#3b82f6)', avatar: 'B', avatarColor: '#10b981' },
  { name: 'Carol', color: 'linear-gradient(160deg,#f59e0b,#ef4444)', avatar: 'C', avatarColor: '#f59e0b' },
  { name: 'David', color: 'linear-gradient(160deg,#8b5cf6,#ec4899)', avatar: 'D', avatarColor: '#8b5cf6' },
]

export default function Stories() {
  return (
    <div className="stories">
      <div className="story-card story-add">
        <div style={{ width: '100%', height: '58%', background: 'var(--bg)', position: 'absolute', top: 0 }} />
        <div className="story-add-icon">＋</div>
        <div className="story-add-label">Add Story</div>
      </div>

      {STORIES.map(s => (
        <div className="story-card" key={s.name}>
          <div className="story-bg" style={{ background: s.color }}>
            <div className="story-avatar" style={{ background: s.avatarColor }}>{s.avatar}</div>
            <span className="story-label">{s.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
