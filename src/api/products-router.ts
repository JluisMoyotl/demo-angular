import { Router, json } from 'express';
import type { NewProduct, Product } from '../app/products/product.model';

const products: Product[] = [
  { id: 1, name: 'Teclado mecánico', price: 1299, active: true },
  { id: 2, name: 'Monitor 27"', price: 4599, active: true },
  { id: 3, name: 'Mouse inalámbrico', price: 349.9, active: false },
];
let nextId = products.length + 1;

function parseProduct(body: unknown): NewProduct | null {
  if (typeof body !== 'object' || body === null) {
    return null;
  }
  const { name, price, active } = body as Record<string, unknown>;
  if (typeof name !== 'string' || !name.trim() || name.length > 80) {
    return null;
  }
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return null;
  }
  if (typeof active !== 'boolean') {
    return null;
  }
  return { name: name.trim(), price, active };
}

export const productsRouter = Router();

productsRouter.use(json());

productsRouter.get('/', (_req, res) => {
  res.json(products);
});

productsRouter.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params['id']));
  if (!product) {
    res.sendStatus(404);
    return;
  }
  res.json(product);
});

productsRouter.post('/', (req, res) => {
  const data = parseProduct(req.body);
  if (!data) {
    res.sendStatus(400);
    return;
  }
  const product: Product = { id: nextId++, ...data };
  products.push(product);
  res.status(201).json(product);
});

productsRouter.put('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params['id']));
  if (index === -1) {
    res.sendStatus(404);
    return;
  }
  const data = parseProduct(req.body);
  if (!data) {
    res.sendStatus(400);
    return;
  }
  products[index] = { id: products[index].id, ...data };
  res.json(products[index]);
});

productsRouter.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params['id']));
  if (index === -1) {
    res.sendStatus(404);
    return;
  }
  products.splice(index, 1);
  res.sendStatus(204);
});
