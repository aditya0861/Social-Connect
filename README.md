# Social Connect App

A fully functional social media web application built with React and Vite.

---

## Tech Stack

- React 18
- Vite 5
- Plain CSS with CSS Variables
- JavaScript (JSX)

---

## Features

- Login and Sign Up authentication
- Create, edit, delete posts with visibility control (Public / Friends / Only Me)
- Emoji reaction picker (👍 ❤️ 😂 😮 😢 😡)
- Comments with nested reply threading
- Notification system with unread badge
- User profile with editable bio and post history
- Dark and Light mode toggle
- Responsive layout (desktop, tablet, mobile)
- Stories bar, Who to Follow panel

---

## Project Structure

```
social-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── LoginPage.jsx
        ├── IconRail.jsx
        ├── SideNav.jsx
        ├── Feed.jsx
        ├── Stories.jsx
        ├── CreatePost.jsx
        ├── Post.jsx
        ├── RightPanel.jsx
        ├── NotificationPanel.jsx
        └── ProfilePage.jsx
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

1. Open the app and sign up with any name and email
2. You will land on the home feed
3. Create posts, react, comment, and reply
4. Click the bell icon to view notifications
5. Click your avatar to view and edit your profile
6. Toggle dark/light mode using the sun/moon icon

---

## Limitations

- No backend or database — all data resets on page refresh
- Authentication is simulated, not secured
- No real image or video upload support

---

## Future Scope

- Backend integration with Node.js and MongoDB
- Real-time updates using WebSockets
- Image and video upload via cloud storage
- Mobile app using React Native
