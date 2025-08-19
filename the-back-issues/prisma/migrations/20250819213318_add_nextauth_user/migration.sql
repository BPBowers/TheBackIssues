/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `UserOwns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserWants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Users_email_key";

-- DropIndex
DROP INDEX "sqlite_autoindex_Users_1";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserOwns" (
    "userId" TEXT NOT NULL,
    "comicBookId" INTEGER NOT NULL,
    "quantity" INTEGER DEFAULT 1,

    PRIMARY KEY ("userId", "comicBookId"),
    CONSTRAINT "UserOwns_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "UserOwns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_UserOwns" ("comicBookId", "quantity", "userId") SELECT "comicBookId", "quantity", "userId" FROM "UserOwns";
DROP TABLE "UserOwns";
ALTER TABLE "new_UserOwns" RENAME TO "UserOwns";
CREATE TABLE "new_UserWants" (
    "userId" TEXT NOT NULL,
    "comicBookId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "comicBookId"),
    CONSTRAINT "UserWants_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "UserWants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_UserWants" ("comicBookId", "userId") SELECT "comicBookId", "userId" FROM "UserWants";
DROP TABLE "UserWants";
ALTER TABLE "new_UserWants" RENAME TO "UserWants";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
