// hashUsers.js
const bcrypt = require('bcryptjs');

const users = [
  { username: 'Luther', password: 'password1', role: 'Base Commander' },
  { username: 'Leo', password: 'password2', role: 'Logistic Officer' },
  { username: 'Ilsa', password: 'password4', role: 'Admin' },
];

(async () => {
  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    console.log(`('${user.username}', '${hashed}', '${user.role}')`);
  }
})();
