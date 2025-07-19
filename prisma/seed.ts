const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("admin220505", 10);

    const user = await prisma.user.create({
        data: {
            email: "admin@example.com",
            username: "admin",
            role: "ADMIN",
            password: password
        }
    });

    console.log("Seeded user:", user);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
