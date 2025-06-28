/*
  Warnings:

  - You are about to drop the column `date` on the `Webinar` table. All the data in the column will be lost.
  - Added the required column `ctaType` to the `Webinar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Webinar` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WebinarStatusEnum" AS ENUM ('SCHEDULED', 'LIVE', 'ENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CallStatusEnum" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'LEFT', 'MISSED');

-- CreateEnum
CREATE TYPE "AttendedTypeEnum" AS ENUM ('REGISTERED', 'ATTENDED', 'ADDED_TO_CART', 'FOLLOW_UP', 'BREAKOUT_ROOM', 'CONVERTED');

-- CreateEnum
CREATE TYPE "CtaTypeEnum" AS ENUM ('BUY_NOW', 'BOOK_A_CALL');

-- DropForeignKey
ALTER TABLE "Webinar" DROP CONSTRAINT "Webinar_presenterId_fkey";

-- DropIndex
DROP INDEX "Webinar_date_idx";

-- AlterTable
ALTER TABLE "Webinar" DROP COLUMN "date",
ADD COLUMN     "aiAgentId" UUID,
ADD COLUMN     "attendeeId" UUID,
ADD COLUMN     "couponCode" VARCHAR(50),
ADD COLUMN     "couponEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "couponExpiry" TIMESTAMP(3),
ADD COLUMN     "ctaLabel" VARCHAR(50),
ADD COLUMN     "ctaType" "CtaTypeEnum" NOT NULL,
ADD COLUMN     "ctaUrl" VARCHAR(255),
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "lockChat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priceId" VARCHAR(255),
ADD COLUMN     "recordingUrl" TEXT,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "stripeProductId" VARCHAR(255),
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "webinarStatus" "WebinarStatusEnum" NOT NULL DEFAULT 'SCHEDULED',
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "duration" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Attendee" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "callStatus" "CallStatusEnum" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "webinarId" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "attendedType" "AttendedTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attendeeId" UUID NOT NULL,
    "userId" UUID,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");

-- CreateIndex
CREATE INDEX "Webinar_presenterId_idx" ON "Webinar"("presenterId");

-- CreateIndex
CREATE INDEX "Webinar_aiAgentId_idx" ON "Webinar"("aiAgentId");

-- CreateIndex
CREATE INDEX "Webinar_ctaType_idx" ON "Webinar"("ctaType");

-- AddForeignKey
ALTER TABLE "Webinar" ADD CONSTRAINT "Webinar_presenterId_fkey" FOREIGN KEY ("presenterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webinar" ADD CONSTRAINT "Webinar_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_webinarId_fkey" FOREIGN KEY ("webinarId") REFERENCES "Webinar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
