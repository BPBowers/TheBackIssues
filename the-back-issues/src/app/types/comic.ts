//src/app/types/comic.ts

export interface Publisher {
  id: number;
  name: string;
}

export interface Series {
  id: number;
  title: string;
  publisherId: number;
  Publisher?: Publisher;
}

export interface Artist {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  profilePic?: string | null;
}

export type ArtistRole = 
  | "WRITER" | "PENCILLER" | "INKER" | "COLORIST" | "LETTERER" | "COVER_ARTIST" | "EDITOR";

export interface WorkedOn {
  role: ArtistRole;
  artist: Artist;
}

export interface ComicBook {
  id: number;
  issue?: number | null;
  frontCover?: string | null;
  backCover?: string | null;
  coverPrice?: number | null;
  releaseDate?: string | null;
  seriesTitle?: string | null;
  Series?: Series;
  publisherName?: string| null;
  Publisher?: Publisher;
  artists: WorkedOn[];
}

