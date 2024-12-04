import { prisma } from '@/lib/prisma';
import { getRepositoryMetrics, getProductivityMetrics } from '@/lib/github';

export async function syncRepositoryMetrics() {
  const repositories = await prisma.repository.findMany();

  for (const repo of repositories) {
    try {
      const metrics = await getRepositoryMetrics(repo.userId, repo.name);
      
      await prisma.repositoryMetrics.upsert({
        where: {
          repositoryId: repo.id,
        },
        update: metrics,
        create: {
          repositoryId: repo.id,
          ...metrics,
        },
      });
    } catch (error) {
      console.error(`Failed to sync metrics for repository ${repo.name}:`, error);
    }
  }
}

export async function syncProductivityMetrics() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    try {
      const metrics = await getProductivityMetrics(user.id, 'day');
      
      await prisma.productivityMetrics.create({
        data: {
          userId: user.id,
          date: new Date(),
          ...metrics,
        },
      });
    } catch (error) {
      console.error(`Failed to sync productivity metrics for user ${user.id}:`, error);
    }
  }
} 