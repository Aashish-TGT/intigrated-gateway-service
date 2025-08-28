const bcrypt = require("bcryptjs");

const hashFromDB = '$2b$10$r3KrzNyJGR9xiCheOhFuKuSQMngnpyiJMusmpIi43c8cud8lUp/la'; // 👈 replace with your hash
const plainPassword = 'admin@123'; // 👈 plain password you're trying to login with

bcrypt.compare(plainPassword, hashFromDB).then(match => {
  console.log("✅ Match result:", match);
});