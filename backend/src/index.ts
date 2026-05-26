import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 1452;

app.use(cors());
app.use(express.json());

// Временные мок-данные
const products = [
  { id: 1, name: "Apple iPhone 14 Pro Max 128Gb Deep Purple", price: 1399, image: "Apple iPhone 14 Pro Max.png", categoryId: 1 },
  { id: 2, name: "AirPods Max Silver", price: 549, image: "AirPods.png", categoryId: 2 },
  { id: 3, name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium Case", price: 399, image: "Apple Watch.png", categoryId: 2 },
  { id: 4, name: "Apple iPhone 14 Pro 512GB Gold (MQ233)", price: 1437, image: "Apple iPhone 14 Pro.png", categoryId: 1 }
];

app.get('/api/products/', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  res.json(product || null);
});

app.get('/api/category/:id', (req, res) => {
  const filtered = products.filter(p => p.categoryId === parseInt(req.params.id));
  res.json(filtered);
});

app.get('/image/:filename', (req, res) => {
  res.sendFile(req.params.filename, { root: './public' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});