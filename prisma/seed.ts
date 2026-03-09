import { prisma } from "../src/prisma.js";
import "dotenv/config";

async function seed() {
  // Delete existing content (optional in dev)
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  // Create authors
  const alice = await prisma.author.create({
    data: { name: "Alice Walker", email: "alice@example.com" },
  });

  const bob = await prisma.author.create({
    data: { name: "Bob Smith", email: "bob@example.com" },
  });

  // Create books
  await prisma.book.createMany({
    data: [
      {
        title: "The Color of Code",
        isbn: "ISBN-001",
        authorId: alice.id,
        pages: 320,
      },
      {
        title: "Node & Friends",
        isbn: "ISBN-002",
        authorId: bob.id,
        pages: 210,
      },
    ],
  });

  console.log("✅ Seed finished");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
