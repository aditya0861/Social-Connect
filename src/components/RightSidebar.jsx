const CONTACTS = [
  { name: 'Alice Johnson', avatar: 'A', color: '#e17055', online: true },
  { name: 'Bob Smith', avatar: 'B', color: '#6c5ce7', online: true },
  { name: 'Carol White', avatar: 'C', color: '#00b894', online: false },
  { name: 'David Lee', avatar: 'D', color: '#fdcb6e', online: true },
  { name: 'Emma Davis', avatar: 'E', color: '#fd79a8', online: false },
  { name: 'Frank Miller', avatar: 'F', color: '#a29bfe', online: true },
  { name: 'Grace Wilson', avatar: 'G', color: '#74b9ff', online: true },
]

export default function RightSidebar() {
  return (
    <aside className="sidebar-right">
      <div className="contacts-title">
        Contacts
        <div className="contacts-title-actions">
          <button className="contacts-icon-btn" title="New message">✏️</button>
          <button className="contacts-icon-btn" title="Options">⋯</button>
        </div>
      </div>

      {CONTACTS.map(c => (
        <div className="contact-item" key={c.name}>
          <div className="contact-avatar-wrap">
            <div className="contact-avatar" style={{ background: c.color }}>{c.avatar}</div>
            {c.online && <div className="online-dot" />}
          </div>
          <span className="contact-name">{c.name}</span>
        </div>
      ))}
    </aside>
  )
}
