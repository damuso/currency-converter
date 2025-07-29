/*
  Warnings:

  - The primary key for the `exchange_rates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `exchange_rates` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "exchange_rates_base_currency_target_currency_rate_date_key";

-- AlterTable
ALTER TABLE "exchange_rates" DROP CONSTRAINT "exchange_rates_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "exchange_rates_pkey" PRIMARY KEY ("base_currency", "target_currency", "rate_date");
