const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Schedule the cron job to run at midnight on the first day of each month
cron.schedule('0 0 1 * *', async () => {
  try {
    await prisma.user.updateMany({
      data: {
        tasksCompletedThisMonth: 0,
      },
    });
    console.log('Successfully reset tasksCompletedThisMonth for all users');
  } catch (error) {
    console.error('Error resetting tasksCompletedThisMonth:', error);
  }
});