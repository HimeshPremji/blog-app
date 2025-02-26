const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000 || env.process.PORT;

app.set('view engine', 'ejs');
app.set('/views', path.resolve('./views'));

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
