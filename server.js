const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const JOBS = {};

// Friendly welcome route
app.get('/', (req, res) => {
  res.send(`
    <h2>👋 Welcome to the Coding Agent API</h2>
    <p>Use <code>POST /schedule</code> to create a task.</p>
    <p>Use <code>GET /status/:id</code> to check task status.</p>
  `);
});

app.post('/schedule', (req, res) => {
  const task = req.body.task;
  const id = Date.now().toString();
  const folder = path.join(__dirname, 'jobs', 'job-' + id);
  fs.mkdirSync(folder, { recursive: true });

  fs.writeFileSync(path.join(folder, 'task.txt'), task);
  JOBS[id] = { status: 'running', folder };

  const cmd = `echo 'Running task...' > "${folder}/log.txt"`;

  exec(cmd, (err, stdout, stderr) => {
    fs.appendFileSync(path.join(folder, 'log.txt'), stdout || stderr || '');
    JOBS[id].status = 'done';
  });

  res.json({ id });
});

app.get('/status/:id', (req, res) => {
  const id = req.params.id;
  if (!JOBS[id]) return res.status(404).send('Not found');

  const job = JOBS[id];
  if (job.status === 'done') {
    res.json({ status: 'done', download: `/jobs/job-${id}` });
  } else {
    res.json({ status: 'running' });
  }
});

app.use('/jobs', express.static(path.join(__dirname, 'jobs')));

app.listen(3000, () => console.log('Orchestration server running on port 3000'));
