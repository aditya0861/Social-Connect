export default function NotificationPanel({ notifications, onClose, onClearAll, onMarkRead }) {
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="notif-panel">
      <div className="notif-header">
        <span className="notif-title">Notifications {unread > 0 && <span className="notif-badge">{unread}</span>}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {unread > 0 && (
            <button className="notif-action-btn" onClick={onMarkRead}>Mark all read</button>
          )}
          {notifications.length > 0 && (
            <button className="notif-action-btn" onClick={onClearAll}>Clear all</button>
          )}
          <button className="modal-close" style={{ position: 'static' }} onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="notif-list">
        {notifications.length === 0 ? (
          <div className="notif-empty">You're all caught up 🎉</div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
              <div className="notif-icon">{n.icon}</div>
              <div className="notif-content">
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <div className="notif-dot" />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
