const cors = require('cors');
const express = require('express');
const app = express();
const funcionalidadesRoute = require('./routes/funcionalidades');
const { globalEnv } = require('./config');

app.use(cors({
    origin: globalEnv.APP_URL
}));
app.use('/api/funcionalidades', funcionalidadesRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});