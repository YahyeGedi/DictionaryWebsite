const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
  },
  role: {
    type: String,
    default: 'guest',
  },
});

const User = mongoose.model('users', UserSchema);

// Create the admin user if not exists
const createAdminUser = async () => {
  try {
    const user = await User.findOne({ name: 'Yahye Gedi', password: '12' });

    if (!user) {
      await User.create({
        name: 'Yahye Gedi',
        password: '12',
        role: 'admin',
      });
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Invoke the function to create the admin user
createAdminUser();

module.exports = User;
