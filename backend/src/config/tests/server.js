import App from './App.js';

const app = new App();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Daniel' }]);
});

app.post('/users', (req, res) => {
  res.status(201).json({ user: req.body });
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
