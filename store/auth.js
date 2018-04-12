import {
  login,
  getIsLoggedFromCache,
  setIsLoggedInCache,
  logout
} from '@/plugins/auth';

import {
  me as getCurrentUser
}
from '@/plugins/user';
import {
  call
} from '@/plugins/rpcApi';

function getFingerprint() {
  const Fingerprint2 = require("fingerprintjs2")
  return new Promise((resolve, reject) => {
    new Fingerprint2().get(function(result, components) {
      let metadata = {}
      components.forEach(c => metadata[c.key] = c.value)
      return resolve({
        hash: result,
        metadata
      })
    })
  })
}

export const state = () => ({
  isLogged: null,
  user: null,
  hasSession:false,
  session:null
});

export const mutations = {
  setUser(state, user) {
    state.isLogged = user !== null
    setIsLoggedInCache(user !== null);
    state.user = user;
  },
  setSession(state, session) {
    state.session = session;
    state.hasSession = !!session
  }
};

export const actions = {
  async ensureSession({
    commit
  }) {
    if (process.server) return;

    const {session,token} = await call('sessionUpdate', Object.assign({
      at: new Date()
    }, await getFingerprint()))
    window.localStorage.setItem('token', token);
    commit('setSession', session);

  },

  async login({
    commit
  }, {
    email,
    pwd
  }) {
    let user = await login(email, pwd)
    commit('setUser', user);
    return user;
  },


  async update({
    commit,
    state
  }) {

    let isLogged = getIsLoggedFromCache();

    if (!!isLogged) {
      let user = state.user;
      if (!user) {
        console.log('Fetching user')
        try {
          user = await getCurrentUser();
        } catch (err) {
          if (err.message === 'LOGIN_REQUIRED') {
            return commit('setUser', null);
          } else {
            throw err;
          }

        }
      }
      console.log(JSON.stringify(user));
      return commit('setUser', user);
    } else {
      return commit('setUser', null);
    }
  },

  async logout({
    commit
  }) {
    commit('setUser', null);
    return await logout()
  }
};