import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { PrismaClient } from '@prisma/client';
import { handle } from 'hono/vercel';

const prisma = new PrismaClient();
const app = new OpenAPIHono();

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const UsersResponseSchema = z.array(UserSchema);

const route = createRoute({
  method: 'get',
  path: '/api/users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UsersResponseSchema,
        },
      },
      description: 'Successful response',
    },
  },
});

app.openapi(route, async (c) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const formattedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return c.json(formattedUsers);
});

export const GET = handle(app);

app.doc('/api/users/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Users API',
    version: '1.0.0',
  },
});
