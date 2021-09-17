-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "value" TEXT,
    "isMultiline" BOOLEAN,
    "maxLength" INTEGER,
    "pages" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource.key_unique" ON "Resource"("key");

-- CreateIndex
CREATE INDEX "Resource.pages_index" ON "Resource"("pages");

-- CreateIndex
CREATE UNIQUE INDEX "Page.url_unique" ON "Page"("url");

-- AddForeignKey
ALTER TABLE "Resource" ADD FOREIGN KEY ("pages") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
