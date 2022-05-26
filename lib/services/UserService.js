const User = require('../models/GithubUser');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);

    const profile = await getUserProfile(token);

    let user = await User.findByUsername(profile.username);
    console.log('|code4token', await exchangeCodeForToken(42));

    if (!user) {
      user = await User.insert(profile);
    }

    return user;
  }
};
