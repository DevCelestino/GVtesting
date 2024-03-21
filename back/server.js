const express = require('express');
const app = express();

const funcionalidadesRoute = require('./routes/funcionalidades');

app.use('/api/funcionalidades', funcionalidadesRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});