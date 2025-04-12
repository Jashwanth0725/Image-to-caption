import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app.js';

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Welcome! Your server is working.');
});


app.listen(PORT, () => {
    console.log("Server is running on port : http://localhost:" + PORT);
})