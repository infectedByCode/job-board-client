import { assert } from 'chai';
import { mutations } from '../../src/store/index';

const { setUser, unsetUser } = mutations;

describe('Store', () => {
  describe('mutations', () => {
    describe('setUser', () => {
      it('sets the user object with correct values', () => {
        const state = {
          user: {
            id: null,
            token: null,
          },
        };
        setUser(state, { fields: ['id', 'token'], values: ['test id', 'auth token'] });
        assert.ok(state.user.id === 'test id');
        assert.ok(state.user.token === 'auth token');
      });
    });
    describe('unsetUser', () => {
      it('unsets the user object by setting values to null', () => {
        const state = {
          user: {
            id: 'test id',
            token: 'token',
          },
        };
        unsetUser(state);
        assert.ok(state.user.id === null);
        assert.ok(state.user.token === null);
      });
    });
  });
});
