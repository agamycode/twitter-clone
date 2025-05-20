import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTweets(users: User[]) {
  console.log('Seeding tweets...');
  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.like.deleteMany();
  await prisma.tweet.deleteMany();

  const developerTweets = [
    // React Ninja tweets
    {
      content:
        'Just shipped a new React component library! Check it out on GitHub: github.com/reactninja/awesome-components',
      userId: users.find((u) => u.username === 'reactninja')?.id
    },
    {
      content:
        'Hot take: React hooks are the best thing that happened to frontend development in the last 5 years. Change my mind.',
      userId: users.find((u) => u.username === 'reactninja')?.id
    },
    {
      content:
        'Spent the weekend refactoring our app to use React Server Components. The performance gains are incredible!',
      userId: users.find((u) => u.username === 'reactninja')?.id
    },

    // Node Master tweets
    {
      content: 'Node.js 20 is out! The performance improvements are mind-blowing. Time to upgrade all my projects.',
      userId: users.find((u) => u.username === 'nodemaster')?.id
    },
    {
      content:
        'Pro tip: Use pnpm instead of npm for faster installs and better disk space usage. Your SSD will thank you.',
      userId: users.find((u) => u.username === 'nodemaster')?.id
    },
    {
      content: 'Building a real-time API with Node.js and WebSockets. The possibilities are endless!',
      userId: users.find((u) => u.username === 'nodemaster')?.id
    },

    // Pythonista tweets
    {
      content: 'Just trained a new ML model that predicts stock prices with 85% accuracy. Data science is magic!',
      userId: users.find((u) => u.username === 'pythonista')?.id
    },
    {
      content: "Python 3.11 is so much faster than previous versions. If you haven't upgraded yet, you're missing out!",
      userId: users.find((u) => u.username === 'pythonista')?.id
    },
    {
      content:
        "Pandas + Matplotlib + Scikit-learn = The holy trinity of data science. What's your favorite Python stack?",
      userId: users.find((u) => u.username === 'pythonista')?.id
    },

    // DevOps Guru tweets
    {
      content: "Kubernetes is not the answer to every problem, but it's the answer to a surprising number of them.",
      userId: users.find((u) => u.username === 'devopsguru')?.id
    },
    {
      content:
        'Just automated our entire deployment pipeline. From commit to production in 5 minutes with zero human intervention!',
      userId: users.find((u) => u.username === 'devopsguru')?.id
    },
    {
      content:
        'Hot take: Docker is the most important technology of the last decade. It completely changed how we build and deploy software.',
      userId: users.find((u) => u.username === 'devopsguru')?.id
    },

    // Full Stack Developer tweets
    {
      content: 'Started learning Rust this weekend. My brain hurts, but in a good way!',
      userId: users.find((u) => u.username === 'fullstackdev')?.id
    },
    {
      content: "TypeScript + Next.js + Prisma is my current favorite stack for full-stack apps. What's yours?",
      userId: users.find((u) => u.username === 'fullstackdev')?.id
    },
    {
      content:
        "Just deployed my first Deno app to production. It's like Node.js but with all the rough edges smoothed out!",
      userId: users.find((u) => u.username === 'fullstackdev')?.id
    },

    // UI Designer tweets
    {
      content: 'Design tip: Always maintain a 8px grid system in your UI. Consistency is key to a professional look.',
      userId: users.find((u) => u.username === 'uidesigner')?.id
    },
    {
      content:
        'Just published my new design system on Figma Community. Check it out if you need a starting point for your next project!',
      userId: users.find((u) => u.username === 'uidesigner')?.id
    },
    {
      content:
        "Tailwind CSS has completely changed my workflow. I was skeptical at first, but now I can't imagine going back.",
      userId: users.find((u) => u.username === 'uidesigner')?.id
    },

    // Security Expert tweets
    {
      content: 'PSA: Update your dependencies! Just found a critical vulnerability in a popular npm package.',
      userId: users.find((u) => u.username === 'securityexpert')?.id
    },
    {
      content: "Zero-trust security is not just a buzzword. It's a necessity in today's threat landscape.",
      userId: users.find((u) => u.username === 'securityexpert')?.id
    },
    {
      content:
        'Just finished a penetration test for a client. Found 3 critical vulnerabilities that could have led to a complete data breach.',
      userId: users.find((u) => u.username === 'securityexpert')?.id
    }
  ];

  // Create tweets
  const createdTweets = [];
  for (const tweet of developerTweets) {
    const createdTweet = await prisma.tweet.create({
      data: {
        content: tweet.content,
        userId: tweet.userId!
      }
    });
    createdTweets.push(createdTweet);
  }

  // Create some replies
  const replies = [
    {
      content: "This is amazing! Can't wait to try it out.",
      userId: users.find((u) => u.username === 'fullstackdev')?.id,
      parentId: createdTweets[0].id // Reply to React Ninja's component library tweet
    },
    {
      content: 'I completely agree! Hooks simplified my code so much.',
      userId: users.find((u) => u.username === 'uidesigner')?.id,
      parentId: createdTweets[1].id // Reply to React Ninja's hooks tweet
    },
    {
      content: "Have you tried bun instead? It's even faster!",
      userId: users.find((u) => u.username === 'devopsguru')?.id,
      parentId: createdTweets[4].id // Reply to Node Master's pnpm tweet
    },
    {
      content: "What model architecture are you using? I'd love to learn more.",
      userId: users.find((u) => u.username === 'nodemaster')?.id,
      parentId: createdTweets[6].id // Reply to Pythonista's ML model tweet
    },
    {
      content: "I've been saying this for years! Docker changed everything.",
      userId: users.find((u) => u.username === 'securityexpert')?.id,
      parentId: createdTweets[11].id // Reply to DevOps Guru's Docker tweet
    }
  ];

  // Create reply tweets and update parent replyCount
  for (const reply of replies) {
    const createdReply = await prisma.tweet.create({
      data: {
        content: reply.content,
        userId: reply.userId!,
        parentId: reply.parentId
      }
    });

    // Update parent tweet's replyCount
    await prisma.tweet.update({
      where: { id: reply.parentId },
      data: { replyCount: { increment: 1 } }
    });

    createdTweets.push(createdReply);
  }

  // Create likes
  for (const tweet of createdTweets) {
    // Each tweet gets 0-5 random likes
    const numLikes = Math.floor(Math.random() * 6);
    const likeCandidates = [...users].sort(() => 0.5 - Math.random()).slice(0, numLikes);

    for (const user of likeCandidates) {
      await prisma.like.create({
        data: {
          userId: user.id,
          tweetId: tweet.id
        }
      });

      // Update tweet's likeCount
      await prisma.tweet.update({
        where: { id: tweet.id },
        data: { likeCount: { increment: 1 } }
      });

      // Create notification for the tweet owner (if it's not their own tweet)
      if (user.id !== tweet.userId) {
        await prisma.notification.create({
          data: {
            type: 'LIKE',
            message: `${user.name || user.username} liked your tweet`,
            userId: tweet.userId,
            tweetId: tweet.id,
            sourceUserId: user.id
          }
        });
      }
    }
  }

  // Create bookmarks (fewer than likes)
  for (const tweet of createdTweets) {
    // Each tweet gets 0-3 random bookmarks
    const numBookmarks = Math.floor(Math.random() * 4);
    const bookmarkCandidates = [...users].sort(() => 0.5 - Math.random()).slice(0, numBookmarks);

    for (const user of bookmarkCandidates) {
      await prisma.bookmark.create({
        data: {
          userId: user.id,
          tweetId: tweet.id
        }
      });
    }
  }

  // Create follow notifications
  for (const user of users) {
    const followers = await prisma.follow.findMany({
      where: { followingId: user.id },
      include: { follower: true }
    });

    for (const follow of followers) {
      await prisma.notification.create({
        data: {
          type: 'FOLLOW',
          message: `${follow.follower.name || follow.follower.username} followed you`,
          userId: user.id,
          sourceUserId: follow.followerId
        }
      });
    }
  }

  console.log(`Created ${createdTweets.length} tweets with likes, bookmarks, and notifications`);
}
