const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {

      if (data.length === 0) {
        return res.status(400).json('Wrong credentials');
      }

      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            if (user.length === 0) {
              return res.status(400).json('User not found');
            }
            res.json(user[0]);
          })
          .catch(err => {
            res.status(400).json('Error getting user');
          });
      } else {
        res.status(400).json('Wrong credentials');
      }
    })
    .catch(err => {
      res.status(400).json('Signin failed');
    });
};

module.exports = {
  handleSignin
};

