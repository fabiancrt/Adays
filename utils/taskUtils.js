
const taskPools = {
    'mind of steel': [
      'Meditate for 10 minutes',
      'Read a book for 30 minutes',
      'Practice mindfulness',
      'Solve a puzzle',
      'Learn a new skill',
      'Write a poem',
      'Learn basic coding',
      'Practice deep breathing exercises for 10 minutes',
      'Memorize a short poem',
      'Engage in a logic game',
      'Solve a riddle',
      'Play a game of chess',
    ],
    'physical triumph': [
      'Run for 30 minutes',
      'Do 50 push-ups',
      'Stretch for 15 minutes',
      'Go for a hike',
      'Swim for 30 minutes',
      'Walk 10,000 steps'
    ],
    'spirit elevation': [
      'Write in a journal',
      'Practice gratitude',
      'Do a random act of kindness',
      'Attend a spiritual session',
      'Read a spiritual book',
      'Meditate for 10 minutes'
    ],
  };
  
  const getRandomTasks = (objective, count = 3) => {
    const pool = taskPools[objective] || [];
    const tasks = [];
    const usedIndices = new Set();
  
    while (tasks.length < count && usedIndices.size < pool.length) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      if (!usedIndices.has(randomIndex)) {
        tasks.push(pool[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
  
    return tasks.map((task, index) => ({
      id: index, 
      task,
      progress: 0,
      status: 'Incomplete',
    }));
  };
  
  export { getRandomTasks };