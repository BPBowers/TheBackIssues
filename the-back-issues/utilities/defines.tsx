interface ComicBook {
    id: number;
    issue?: number | null;
    frontCover?: string | null;
    backCover?: string | null;
    coverPrice?: number | null;
    releaseDate?: string | null;
    seriesTitle?: string | null;
}