-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY ,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "token" TEXT

);


-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL PRIMARY KEY,
    "movieName" TEXT NOT NULL,
    "description" TEXT,
    "directorName" TEXT,
    "releaseDate" TEXT,
    "userId" INTEGER NOT NULL
);

-- AddForeignKey
ALTER TABLE "Movie"
  ADD CONSTRAINT "Movie_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;




-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL PRIMARY KEY,
    "rating" INTEGER ,
    "comment" TEXT,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL
);


-- AddForeignKey
ALTER TABLE "Review"
  ADD CONSTRAINT "Review_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;


-- AddForeignKey
ALTER TABLE "Review"
  ADD CONSTRAINT "Review_movieId_fkey"
  FOREIGN KEY ("movieId")
  REFERENCES "Movie"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;



