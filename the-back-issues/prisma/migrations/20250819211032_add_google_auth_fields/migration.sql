-- CreateTable
CREATE TABLE "ComicBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "issue" INTEGER,
    "frontCover" BLOB,
    "backCover" BLOB,
    "coverPrice" DECIMAL,
    "releaseDate" DATETIME,
    "seriesID" INTEGER NOT NULL,
    CONSTRAINT "ComicBook_seriesID_fkey" FOREIGN KEY ("seriesID") REFERENCES "Series" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "publishId" INTEGER,
    CONSTRAINT "Series_publishId_fkey" FOREIGN KEY ("publishId") REFERENCES "Publisher" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "image" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "founded" DATETIME
);

-- CreateTable
CREATE TABLE "UserOwns" (
    "userId" INTEGER NOT NULL,
    "comicBookId" INTEGER NOT NULL,
    "quantity" INTEGER DEFAULT 1,

    PRIMARY KEY ("userId", "comicBookId"),
    CONSTRAINT "UserOwns_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "UserOwns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "UserWants" (
    "userId" INTEGER NOT NULL,
    "comicBookId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "comicBookId"),
    CONSTRAINT "UserWants_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "UserWants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Users_1" ON "Users"("username");
Pragma writable_schema=0;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
