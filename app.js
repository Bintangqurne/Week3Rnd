const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/artikels', async (req, res) => {
  const { judulBerita, namaPenulis } = req.body;
  try {
    const artikel = await prisma.artikel.create({
      data: {
        judulBerita,
        namaPenulis,
      },
    });
    res.status(201).json(artikel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/artikels', async (req, res) => {
  try {
    const { search } = req.query;
    let artikels;

    if (search) {
      artikels = await prisma.artikel.findMany({
        where: {
          published: true,
          OR: [
            { judulBerita: { contains: search, mode: 'insensitive' } },
            { namaPenulis: { contains: search, mode: 'insensitive' } },
          ],
        },
      });
    } else {
      artikels = await prisma.artikel.findMany({
        where: { published: true },
      });
    }

    return res.status(200).json({ data: artikels, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/artikels/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artikel = await prisma.artikel.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!artikel) {
      return res.status(404).json({ error: 'Artikel not found' });
    }
    res.status(200).json(artikel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/artikels/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artikel = await prisma.artikel.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json(artikel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/artikels/:id', async (req, res) => {
  const { id } = req.params;
  const { judulBerita, namaPenulis } = req.body;
  try {
    const artikel = await prisma.artikel.update({
      where: { id: parseInt(id, 10) },
      data: { judulBerita, namaPenulis },
    });
    res.status(200).json(artikel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


