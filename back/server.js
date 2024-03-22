const cors = require('cors');
const express = require('express');
const app = express();
const funcionalidadesRoute = require('./routes/funcionalidades');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api/funcionalidades', funcionalidadesRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});