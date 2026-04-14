export interface Anime {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  rating: number;
  year: number;
  episodes: number;
  genres: string[];
  sub: boolean;
  dub: boolean;
  trailerUrl?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  friends: Friend[];
  watchlist: string[];
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export const AVATARS = [
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/avatar-1---male-protagonist-086d0764-1776172491463.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/avatar-2---female-character-e6bcc170-1776172491684.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/avatar-3---masked-character-300ecc92-1776172494198.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/avatar-4---chibi-character-4d67bb62-1776172495432.webp",
];

export const MOCK_ANIME: Anime[] = [
  {
    id: "1",
    title: "Shadow of the Sakura",
    description: "A young samurai discovers he has the power to control the shadows of the falling sakura blossoms, leading him on a quest to avenge his clan.",
    posterUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/poster-1---romance-91debc10-1776172491466.webp",
    bannerUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/hero-banner-33b297ef-1776172491941.webp",
    rating: 9.2,
    year: 2024,
    episodes: 24,
    genres: ["Action", "Fantasy", "Drama"],
    sub: true,
    dub: true
  },
  {
    id: "2",
    title: "Neon Horizon",
    description: "In the year 2099, a group of rebels fights against a megacorporation using cybernetic enhancements and ancient martial arts.",
    posterUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/poster-3---sci-fi-a5c127ac-1776172491354.webp",
    bannerUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/hero-banner-33b297ef-1776172491941.webp",
    rating: 8.8,
    year: 2023,
    episodes: 12,
    genres: ["Sci-fi", "Cyberpunk", "Action"],
    sub: true,
    dub: false
  },
  {
    id: "3",
    title: "Crimson Souls",
    description: "A dark fantasy epic where humans and demons coexist in a fragile peace that is about to be shattered by an ancient prophecy.",
    posterUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/poster-2---action-89221760-1776172491254.webp",
    bannerUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/hero-banner-33b297ef-1776172491941.webp",
    rating: 9.5,
    year: 2024,
    episodes: 26,
    genres: ["Dark Fantasy", "Horror", "Action"],
    sub: true,
    dub: true
  },
  {
    id: "4",
    title: "Vortex Dunkers",
    description: "A high-stakes basketball anime where players use special abilities called 'Vortexes' to dominate the court.",
    posterUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/poster-4---sports-7bdc6c6c-1776172493052.webp",
    bannerUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/hero-banner-33b297ef-1776172491941.webp",
    rating: 8.5,
    year: 2022,
    episodes: 50,
    genres: ["Sports", "Shonen", "Comedy"],
    sub: true,
    dub: true
  }
];