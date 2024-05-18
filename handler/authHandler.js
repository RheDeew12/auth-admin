const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    // Validasi user dan password disini
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { login };