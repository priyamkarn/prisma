const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertUser(username, password, firstName, lastName) {
    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })
    console.log(res)
}

// Function to insert a demo user and handle the promise
async function insertDemoUser() {
    try {
        await insertUser('demouser', 'demopassword123', 'Demo', 'User');
        console.log('Demo user inserted successfully');
    } catch (error) {
        console.error('Error inserting demo user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Call the function to insert the demo user
insertDemoUser();
async function updateUser(userId, newUsername, newPassword) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,  // Specify the ID of the user to update
            },
            data: {
                username: newUsername,
                password: newPassword
            }
        });
        console.log('User updated:', updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
    } finally {
        await prisma.$disconnect();
    }
}
updateUser("66d21becad0b277e243c63bf", "priyam", "karn");
async function insertDemoData() {
    try {
      // Insert a demo user
      const demoUser = await prisma.user.create({
        data: {
          username: 'demouser',
          password: 'demopassword123',
          firstName: 'Demo',
          lastName: 'User'
        }
      });
  
      console.log('Demo user inserted:', demoUser);
  
      // Insert demo todos for the demo user
      const demoTodos = await prisma.todo.createMany({
        data: [
          {
            title: 'Buy groceries',
            description: 'Milk, Bread, and Butter',
            done: false,
            userId: demoUser.id
          },
          {
            title: 'Write blog post',
            description: 'Write about Prisma and MongoDB',
            done: false,
            userId: demoUser.id
          },
          {
            title: 'Walk the dog',
            description: 'Take the dog for a walk in the park',
            done: true,
            userId: demoUser.id
          }
        ]
      });
  
      console.log('Demo todos inserted:', demoTodos);
  
    } catch (error) {
      console.error('Error inserting demo data:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Execute the function to insert demo data
  insertDemoData();

  async function getUserWithTodos(userId) {
    try {
      // Query a user by ID and include their todos
      const user = await prisma.user.findUnique({
        where: {
          id: userId,  // Replace with the actual user ID
        },
        include: {
          todos: true,  // Include the related todos
        },
      });
  
      if (user) {
        console.log('User:', user);
        console.log('Todos:');
        user.todos.forEach(todo => {
          console.log(`- ${todo.title}: ${todo.description}`);
        });
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error retrieving user with todos:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Example usage: Replace 'userId' with the actual ID of the user you want to query
  const userI = '66d21dec8862c39c46c082fd'; // Replace with an actual user ID
  getUserWithTodos(userId);
  async function getTodosAndUserDetails(userId) {
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
  
      // Print the todos with user details
      console.log('Todos:', todos);
      todos.forEach(todo => {
        console.log(`Todo Title: ${todo.title}`);
        console.log(`Description: ${todo.description}`);
        console.log(`User Username: ${todo.user?.username}`);
      });
    } catch (error) {
      console.error('Error fetching todos and user details:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Example usage: Replace 'userId' with the actual ID of the user you want to query
  const userId = '66d21dec8862c39c46c082fd'; // Replace with an actual user ID
  getTodosAndUserDetails(userId);
