class AuthService {
  constructor(user) {
    if (user != undefined) {
      this.user = user;
    }
  }

  async authUser(session) {
    session.user = this.user;
  }
  async destroyAuth(session) {
    await session.destroy();
  }
  async checkSession(session) {
    if (!session.user) return false;
  }
  async validateUser(session, userId) {
    if (session.user._id != userId) return false;
    else return true;
  }
}

module.exports = AuthService;
