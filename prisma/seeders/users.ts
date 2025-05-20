import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('Seeding users...');
  // Clear existing users
  await prisma.user.deleteMany();

  // Create developer users
  const users = [
    {
      username: 'reactninja',
      email: 'react@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'React Ninja',
      bio: 'Frontend developer specializing in React. Building beautiful UIs since 2015.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reactninja',
      website: 'https://reactninja.dev',
      location: 'San Francisco, CA',
      isVerified: true
    },
    {
      username: 'nodemaster',
      email: 'node@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Node Master',
      bio: 'Backend developer with Node.js. API architect and performance optimizer.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nodemaster',
      website: 'https://nodemaster.dev',
      location: 'Austin, TX',
      isVerified: true
    },
    {
      username: 'pythonista',
      email: 'python@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Python Enthusiast',
      bio: 'Data scientist and ML engineer. Turning data into insights with Python.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pythonista',
      website: 'https://pythonista.dev',
      location: 'Seattle, WA',
      isVerified: false
    },
    {
      username: 'devopsguru',
      email: 'devops@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'DevOps Guru',
      bio: 'Infrastructure as code advocate. Docker, Kubernetes, and CI/CD pipelines.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=devopsguru',
      website: 'https://devopsguru.tech',
      location: 'Portland, OR',
      isVerified: true
    },
    {
      username: 'fullstackdev',
      email: 'fullstack@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Full Stack Developer',
      bio: 'Jack of all trades, master of some. React, Node, Python, and everything in between.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fullstackdev',
      website: 'https://fullstack.codes',
      location: 'New York, NY',
      isVerified: false
    },
    {
      username: 'uidesigner',
      email: 'ui@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'UI Designer',
      bio: 'Creating beautiful, intuitive interfaces. Design systems enthusiast.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=uidesigner',
      website: 'https://uidesigner.design',
      location: 'Los Angeles, CA',
      isVerified: true
    },
    {
      username: 'securityexpert',
      email: 'security@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Security Expert',
      bio: 'Keeping your apps secure. Penetration tester and security consultant.',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=securityexpert',
      website: 'https://securityexpert.io',
      location: 'Washington, DC',
      isVerified: true
    }
  ];

  // Insert users and store their IDs
  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user
    });
    createdUsers.push(createdUser);
  }

  // Create follow relationships
  for (let i = 0; i < createdUsers.length; i++) {
    // Each user follows 2-4 random other users
    const numToFollow = Math.floor(Math.random() * 3) + 2;
    const followCandidates = [...Array(createdUsers.length).keys()].filter((j) => j !== i);

    // Shuffle and take first numToFollow
    for (let j = followCandidates.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [followCandidates[j], followCandidates[k]] = [followCandidates[k], followCandidates[j]];
    }

    for (let j = 0; j < numToFollow; j++) {
      if (j < followCandidates.length) {
        await prisma.follow.create({
          data: {
            followerId: createdUsers[i].id,
            followingId: createdUsers[followCandidates[j]].id
          }
        });
      }
    }
  }

  console.log(`Created ${createdUsers.length} users with follow relationships`);
  return createdUsers;
}
