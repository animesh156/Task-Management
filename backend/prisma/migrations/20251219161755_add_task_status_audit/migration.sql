-- CreateTable
CREATE TABLE "TaskStatusAudit" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "oldStatus" "TaskStatus" NOT NULL,
    "newStatus" "TaskStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskStatusAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskStatusAudit_taskId_idx" ON "TaskStatusAudit"("taskId");

-- CreateIndex
CREATE INDEX "TaskStatusAudit_updatedBy_idx" ON "TaskStatusAudit"("updatedBy");

-- AddForeignKey
ALTER TABLE "TaskStatusAudit" ADD CONSTRAINT "TaskStatusAudit_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusAudit" ADD CONSTRAINT "TaskStatusAudit_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
