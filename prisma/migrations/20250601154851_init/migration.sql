-- CreateTable
CREATE TABLE "Artikel" (
    "id" SERIAL NOT NULL,
    "judulBerita" TEXT NOT NULL,
    "namaPenulis" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);
