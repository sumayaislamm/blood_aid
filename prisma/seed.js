import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({
    connectionString,
});
const prisma = new PrismaClient({
    adapter,
});
async function main() {
    console.log("🌱 Starting database seeding...");
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured");
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    const admin = await prisma.user.upsert({
        where: {
            email: adminEmail,
        },
        update: {
            name: "Blood Aid Admin",
            password: hashedPassword,
            role: "ADMIN",
            status: "ACTIVE",
        },
        create: {
            name: "Blood Aid Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "ADMIN",
            status: "ACTIVE",
        },
    });
    console.log("✅ Admin seeded successfully!");
    console.log({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
    });
}
main()
    .catch((error) => {
    console.error("❌ Seeding failed:");
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map