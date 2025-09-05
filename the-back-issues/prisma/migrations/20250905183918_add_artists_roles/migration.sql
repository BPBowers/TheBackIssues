-- CreateTable
CREATE TABLE "WorkedOn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comicBookId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "WorkedOn_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkedOn_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "ProfilePic" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkedOn_comicBookId_artistId_role_key" ON "WorkedOn"("comicBookId", "artistId", "role");
