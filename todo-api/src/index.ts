import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from './generated/prisma/client.js'

const app = new Hono()

const prisma = new PrismaClient()

app.use(
  cors({
    origin: "http://localhost:5173",
  })
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get('/todos', async (c) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return c.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
})


app.post("/todos", async (c) => {
  try {
    const { title } = await c.req.json();
    if (!title || title.trim() === "") {
      return c.json({ error: "Title is required" }, 400);
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        completed: false,
      },

    });
    return c.json({ todo }, 201);
  } catch (error) {
    console.error("Error creating todo:", error);
    return c.json({ error: "Failed to create todo" }, 500);
  }
})

app.put("/todos/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const { completed } = await c.req.json();
    if(!id || typeof completed !== "boolean") {
      return c.json({ error: "Invalid request" }, 400);
    }
    const todo = await prisma.todo.update({
      where: { id: Number(id)},
      data: { completed: completed},
    });
    return c.json({ todo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return c.json({ error: "Failed to update todo" }, 500); 
  }

})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
