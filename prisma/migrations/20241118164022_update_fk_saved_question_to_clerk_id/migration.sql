-- DropForeignKey
ALTER TABLE "SavedQuestion" DROP CONSTRAINT "SavedQuestion_userId_fkey";

-- AddForeignKey
ALTER TABLE "SavedQuestion" ADD CONSTRAINT "SavedQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
