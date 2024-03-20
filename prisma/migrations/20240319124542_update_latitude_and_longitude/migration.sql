/*
  Warnings:

  - A unique constraint covering the columns `[latitude]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[longitude]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gym_latitude_key" ON "Gym"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "Gym_longitude_key" ON "Gym"("longitude");
