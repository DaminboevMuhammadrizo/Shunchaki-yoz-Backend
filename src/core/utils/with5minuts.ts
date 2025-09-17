import { ForbiddenException } from '@nestjs/common';

export function ensureWithin5Minutes(date: Date) {
  const now = new Date();
  const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

  if (diffInMinutes > 5) {
    throw new ForbiddenException({
      success: false,
      message: 'Time limit exceeded. This action is no longer allowed !',
    });
  }
}
