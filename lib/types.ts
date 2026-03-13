export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
};

export type Itinerary = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'draft' | 'published' | 'archived';
  destination: string | null;
  country_code: string | null;
  duration_days: number | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type Day = {
  id: string;
  itinerary_id: string;
  day_number: number;
  date: string | null;
  title: string | null;
  created_at: string;
};

export type Stop = {
  id: string;
  day_id: string;
  position: number;
  title: string;
  location: string | null;
  lat: number | string;
  lng: number | string;
  photo_url: string | null;
  description: string | null;
  duration_hours: number | null;
  created_at: string;
};
