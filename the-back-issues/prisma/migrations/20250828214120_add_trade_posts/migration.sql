-- CreateTable
CREATE TABLE "TradePost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "location" TEXT,
    "message" TEXT,
    "exactMatch" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TradePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TradeOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tradePostId" INTEGER NOT NULL,
    "comicBookId" INTEGER NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    CONSTRAINT "TradeOffer_tradePostId_fkey" FOREIGN KEY ("tradePostId") REFERENCES "TradePost" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TradeOffer_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TradeWant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tradePostId" INTEGER NOT NULL,
    "comicBookId" INTEGER NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    CONSTRAINT "TradeWant_tradePostId_fkey" FOREIGN KEY ("tradePostId") REFERENCES "TradePost" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TradeWant_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CounterOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tradePostId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CounterOffer_tradePostId_fkey" FOREIGN KEY ("tradePostId") REFERENCES "TradePost" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CounterOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CounterOfferOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "counterOfferId" INTEGER NOT NULL,
    "comicBookId" INTEGER NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    CONSTRAINT "CounterOfferOffer_counterOfferId_fkey" FOREIGN KEY ("counterOfferId") REFERENCES "CounterOffer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CounterOfferOffer_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CounterOfferWant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "counterOfferId" INTEGER NOT NULL,
    "comicBookId" INTEGER NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    CONSTRAINT "CounterOfferWant_counterOfferId_fkey" FOREIGN KEY ("counterOfferId") REFERENCES "CounterOffer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CounterOfferWant_comicBookId_fkey" FOREIGN KEY ("comicBookId") REFERENCES "ComicBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
