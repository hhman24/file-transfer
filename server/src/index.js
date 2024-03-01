import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(4000, () => console.log('Application is running at port 4000'));
