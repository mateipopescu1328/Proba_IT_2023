const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Conectare la baza de date MongoDB
mongoose.connect('mongodb+srv://ionutmatei2002:ionutmatei2002@loginregister.v7glhpy.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Definirea modelului pentru utilizatori
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Endpoint pentru înregistrare
app.post('/api/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verifică dacă există deja un utilizator cu același email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Utilizatorul cu acest email există deja.' });
      }
  
      // Dacă nu există, procedează cu înregistrarea
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'Utilizator înregistrat cu succes!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Eroare la înregistrare' });
    }
  });

// Endpoint pentru autentificare
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu există' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Parolă incorectă' });
    }

    res.status(200).json({ message: 'Autentificare reușită' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la autentificare' });
  }
});

app.listen(PORT, () => console.log(`Serverul rulează la adresa http://localhost:${PORT}`));
