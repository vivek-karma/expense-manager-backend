"use strict";
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Expense Manager backend running on port ${PORT}`);
});
