# Anime Streaming App (Netflix-style) - Plan

## 1. Project Overview
A high-performance anime streaming application with a Netflix-inspired UI, featuring user authentication, anime library, watchlists, social features (friends/chat), and a custom video player.

## 2. Technical Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Dark theme by default)
- **Icons**: Lucide React
- **Animations**: Framer Motion (for Netflix-style hover effects)
- **Components**: shadcn/ui (Button, Input, Avatar, Dialog, ScrollArea, Tabs, etc.)
- **Notifications**: Sonner

## 3. Core Features
- **Authentication**: Login page with Google, Email, and Phone options.
- **Home Page**:
  - Netflix-style Hero section with a featured anime trailer/preview.
  - Horizontal scrolling rows for "Trending", "New Releases", "Popular Sub/Dub".
- **Anime Details & Player**:
  - Dedicated anime page with episode list.
  - Custom Video Player with subtitle support and quality settings.
  - Download feature (Sub/Dub versions).
- **User Profile**:
  - Customizable profile with anime character avatars.
  - Language selection (App default language).
- **Social Features**:
  - Friends list and "Add Friend" capability.
  - Real-time chat simulation.
  - Anime sharing functionality.
- **My List**: Unlimited watchlist feature.

## 4. Component Structure
- `src/components/layout/`: Navbar, Footer, Sidebar (for mobile).
- `src/components/home/`: Hero, AnimeRow, AnimeCard.
- `src/components/player/`: VideoPlayer, Controls.
- `src/components/social/`: FriendsList, ChatWindow, ShareModal.
- `src/components/auth/`: LoginForm, SocialLogin.
- `src/components/profile/`: AvatarPicker, Settings.

## 5. Development Steps
1. **Setup**: Initialize constants (anime data, avatars, languages) and global styles.
2. **Auth**: Build the Login/Signup page with multiple auth methods.
3. **Layout**: Create the responsive Navbar and Footer.
4. **Home Page**: Implement the Hero section and dynamic horizontal rows.
5. **Anime Details**: Create the anime overview page with episode navigation.
6. **Video Player**: Build the custom player with playback controls.
7. **Social**: Implement the Friends system and Chat interface.
8. **Watchlist**: Implement the "My List" logic using local state/storage.
9. **Final Polish**: Add animations (Framer Motion) and refine responsiveness.

## 6. Image Generation Plan
- Hero background image (Anime landscape).
- Various anime posters for the rows.
- A set of anime character avatars for profiles.
