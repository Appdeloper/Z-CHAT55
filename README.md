# Z Chat - Cyberpunk Social Network

A futuristic, ultra-premium real-time chat application with cyberpunk aesthetics, built with HTML, CSS, and JavaScript using Firebase.

## Features

### 🎨 Cyberpunk UI
- Dark AMOLED theme with neon gradients (cyan, purple, blue)
- Glassmorphism effects with blur and transparency
- Smooth animations and micro-interactions
- Floating UI elements with glow effects
- Custom scrollbar with neon styling

### 📱 Mobile-First Design
- Fully responsive layout
- Slide-in sidebar on mobile devices
- Touch-friendly buttons and interactions
- Optimized for phones and tablets

### 👥 Social Features
- **Friends System**: Add/remove friends, view online status
- **Private Chats**: One-on-one messaging with friends
- **Group Chats**: Create and manage group conversations
- **Real-time Presence**: See who's online/offline

### 💬 Advanced Chat Features
- Real-time messaging with Firebase
- Typing indicators
- Message timestamps
- Emoji reactions
- Emoji picker
- Image sharing support
- Message status indicators

### 🎮 Premium Features
- **Z-Scanner**: AI-powered chat analysis
  - Most active friend detection
  - Conversation summaries
  - Important message highlights
- **Status System**: Custom status messages
- **Streak Counter**: Daily login streaks
- **Sound Notifications**: Message arrival sounds

### 🔐 Authentication
- Anonymous login with username
- Google OAuth integration
- Persistent sessions with localStorage

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide Icons

## Setup Instructions

1. **Clone/Download** the project files:
   - `index.html`
   - `style.css`
   - `script.js`

2. **Firebase Configuration**:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication (Anonymous and Google providers)
   - Enable Realtime Database
   - Copy your Firebase config to the `firebaseConfig` object in `script.js`

3. **Open in Browser**:
   - Open `index.html` in a modern web browser
   - The app will work offline for basic functionality

## Usage Guide

### Getting Started
1. **Login**: Enter a username (3-20 characters) or use Google sign-in
2. **Add Friends**: Use the search in the Friends tab to find and add users
3. **Start Chatting**: Click on a friend to open a private chat
4. **Create Groups**: Use the "Create Group" button to make group chats

### Chat Features
- **Send Messages**: Type and press Enter or click send button
- **Emojis**: Click the emoji button to open the picker
- **Images**: Click the attachment button (image upload coming soon)
- **Reactions**: Hover over messages to see reaction options

### Advanced Features
- **Z-Scanner**: Click the scanner button for chat insights
- **Status**: Click "Set status..." to update your status
- **Themes**: Built-in cyberpunk theme (more themes coming)

## File Structure

```
Z-Chat/
├── index.html      # Main HTML structure
├── style.css       # Cyberpunk styling and animations
└── script.js       # Firebase integration and app logic
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Notes

- Uses Firebase anonymous authentication
- All data is stored in Firebase Realtime Database
- No sensitive data is stored locally
- Messages are not encrypted (for demo purposes)

## Future Enhancements

- [ ] End-to-end encryption
- [ ] File attachments
- [ ] Voice/video calls
- [ ] Message search
- [ ] Dark/light theme toggle
- [ ] Push notifications
- [ ] Message reactions
- [ ] Chat backgrounds
- [ ] User profiles
- [ ] Admin controls for groups

## Contributing

Feel free to fork and improve the app! Some areas for contribution:

- Add more themes
- Implement file sharing
- Add voice messages
- Create a mobile app version
- Add more Z-Scanner features

## License

This project is open source and available under the MIT License.

---

**Made with ❤️ for the cyberpunk generation**