const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => console.log('Connected to MongoDB'));


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  polls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  }],
});

const User = mongoose.model('User', userSchema);


const pollSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: [{
    text: String,
    votes: {
      type: Number,
      default: 0,
    },
  }],
  voters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model('Poll', pollSchema);


const checkAuth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Acces refuzat' });

  try {
    const verified = jwt.verify(token, 'secretTokenKey');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalid' });
  }
};


app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.includes('@') || email.split('@')[1] !== 'gmail.com') {
      return res.status(400).json({ message: 'Adresa de email nu este validă. Trebuie să fie de tipul @gmail.com.' });
    }

    if (password.length < 8 || password.length > 32) {
      return res.status(400).json({ message: 'Parola trebuie să conțină între 8 și 32 de caractere.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilizatorul cu acest email există deja.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilizator înregistrat cu succes!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la înregistrare' });
  }
});


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

    const token = jwt.sign({ id: user._id }, 'secretTokenKey');
    res.header('auth-token', token).json({ token, message: 'Autentificare reușită' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la autentificare' });
  }
});


app.post('/api/createpoll', checkAuth, async (req, res) => {
  try {
    const { title, options } = req.body;
    const userId = req.user.id;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu există' });
    }


    const newPoll = new Poll({
      owner: userId,
      title,
      options: options.map(option => ({ text: option })),
    });

    newPoll.createdAt = Date.now();

    await newPoll.save();


    user.polls.push(newPoll);
    await user.save();

    res.status(201).json({ message: 'Poll creat cu succes!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la crearea poll-ului' });
  }
});


app.get('/api/polls', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea poll-urilor' });
  }
});


app.get('/api/polls/:id', async (req, res) => {
  try {
    const pollId = req.params.id;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: 'Pollul nu a fost găsit' });
    }

    const pollDetails = {
      _id: poll._id,
      title: poll.title,
      options: poll.options.map(option => ({ text: option.text, votes: option.votes })),
      voters: poll.voters,
      createdAt: poll.createdAt,
    };

    res.status(200).json(pollDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea poll-ului' });
  }
});


app.get('/api/latestpolls', async (req, res) => {
  try {
    const latestPolls = await Poll.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(latestPolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea ultimelor poll-uri' });
  }
});


app.post('/api/polls/:id/vote', checkAuth, async (req, res) => {
  try {
    const pollId = req.params.id;
    const userId = req.user.id;
    const selectedOption = req.body.option;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Pollul nu a fost găsit' });
    }

    if (poll.voters.includes(userId)) {
      return res.status(400).json({ message: 'Ai votat deja în acest poll' });
    }

    const optionIndex = poll.options.findIndex(option => option.text === selectedOption);
    if (optionIndex !== -1) {
      poll.options[optionIndex].votes += 1;
    } else {
      return res.status(400).json({ message: 'Opțiunea de vot nu există în acest poll' });
    }

    poll.voters.push(userId);

    await poll.save();

    res.status(200).json({ message: 'Vot înregistrat cu succes' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la înregistrarea votului' });
  }
});

app.delete('/api/polls/:id', checkAuth, async (req, res) => {
  try {
    const pollId = req.params.id;
    const userId = req.user.id;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Sondajul nu a fost găsit' });
    }

    if (poll.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Nu aveți permisiunea de a șterge acest sondaj' });
    }

    await Poll.findByIdAndDelete(pollId);

    const user = await User.findById(userId);
    if (user) {
      user.polls = user.polls.filter(userPollId => userPollId.toString() !== pollId);
      await user.save();
    }

    res.status(200).json({ message: 'Sondaj șters cu succes' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la ștergerea sondajului' });
  }
});

app.listen(PORT, () => console.log(`Serverul rulează la adresa http://localhost:${PORT}`));