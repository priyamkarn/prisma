import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.user.create({
    data: {
        username,
        password,
        firstName,
        lastName
    }
  })
  console.log(res);
  const fetchedUser = await prisma.user.findMany({
    where: {
        username:username
    },
  });
  console.log(fetchedUser)
  const posts = await prisma.user.findMany();
console.log("All Posts:", posts);
}
async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
      lastName
    }
  });
  console.log(res);
}

updateUser("admin1", {
    firstName: "new name",
    lastName: "singh"
})
 

insertUser("admin33", "1231", "priyamm", "karn")
