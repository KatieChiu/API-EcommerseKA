/*
  Warnings:

  - The values [PendingContact,Contacted,Confirmed,AwaitingPayment,Paid,Processing,ReadyForDelivery,Delivered,Cancelled,Expired] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `contact_attempts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Pending', 'Completed', 'Rejected', 'PaymentFailed');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TABLE "order_status_history" ALTER COLUMN "fromStatus" TYPE "OrderStatus_new" USING ("fromStatus"::text::"OrderStatus_new");
ALTER TABLE "order_status_history" ALTER COLUMN "toStatus" TYPE "OrderStatus_new" USING ("toStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "contact_attempts" DROP CONSTRAINT "contact_attempts_adminUserId_fkey";

-- DropForeignKey
ALTER TABLE "contact_attempts" DROP CONSTRAINT "contact_attempts_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'Pending';

-- DropTable
DROP TABLE "contact_attempts";
