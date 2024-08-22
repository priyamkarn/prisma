//  user        User    @relation(fields: [userId], references: [id])  

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTodosAndUserDetails(userId: number) {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: userId,
            },
            select: {
                title: true,
                description: true,
                user: {
                    select: {
                        username: true // Include only the username of the user
                    }
                }
            }
        });
        console.log(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
    } finally {
        await prisma.$disconnect();
    }
}
getTodosAndUserDetails(1);
