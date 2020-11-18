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
        expect(state.user.id).toBe('test id');
        expect(state.user.token).toBe('auth token');
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
        expect(state.user.id).toBe(null);
        expect(state.user.token).toBe(null);
      });
    });
  });
});
