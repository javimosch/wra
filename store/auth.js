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
  session:null,
  loginAt: null
});

export const mutations = {
  setUser(state, user) {
    state.isLogged = user !== null
    setIsLoggedInCache(user !== null);
    state.user = user;
    state.loginAt = user? Date.now() : state.loginAt
    if(state.user){
      console.log('user commited')
    }
  },
  setSession(state, session) {
    state.session = session;
    state.hasSession = !!session
    console.log('session commited')
  }
};

export const actions = {
  async ensureSession({
    commit, state
  }) {
    if (process.server) return;

    if(!state.isLogged&&!window.localStorage.getItem('token')&&state.hasSession){
      window.localStorage.setItem('token', state.session.token);
    }

    const {session,token} = await call('sessionUpdate', Object.assign({
      at: new Date()
    }, await getFingerprint()))
    if(!state.isLogged||!window.localStorage.getItem('token')){
      window.localStorage.setItem('token', token);
    }
    session.token = token;
    commit('setSession', session);

    if(!window.localStorage.getItem('token')){
      throw new Error('ENSURE_SESSION_LOST_TOKEN')
    }else{
      console.info('auth/ensureSession','success')
    }

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
    state,
    dispatch
  }) {
    if(process.server) return;
    let isLogged = getIsLoggedFromCache();

    if (!!isLogged) {
      let user = state.user;
      if (!user) {
        
        try {
          user = await getCurrentUser();
          console.info('auth/update','valid token')
          await dispatch('ensureSession')
          console.info('auth/update','valid session')
        } catch (err) {
          window.localStorage.setItem('token', '');
          console.warn('auth/update',err.message)
          if (err.message === 'LOGIN_REQUIRED') {
            return commit('setUser', null);
          } else {
            throw err;
          }
          await dispatch('ensureSession')
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