/**
 * @jest-environment jest-environment-node
 */

import init from './';

const KEY = 'test';

describe('analytics behaviour on server', () => {
  describe('init', () => {
    it('should throw if no key is provided to init', () => {
      expect(init).toThrow();
    });
  });

  describe('functions returned by init', () => {
    let result;

    beforeEach(() => {
      result = init(KEY);
    });

    describe('track', () => {
      it('should be a function', () => {
        expect(typeof result.track).toEqual('function');
      });
      it('should throw an error', () => {
        expect(result.track).toThrow();
      });
    });

    describe('identify', () => {
      it('should be a function', () => {
        expect(typeof result.identify).toEqual('function');
      });
      it('should throw an error', () => {
        expect(result.identify).toThrow();
      });
    });

    describe('page', () => {
      it('should be a function', () => {
        expect(typeof result.page).toEqual('function');
      });
      it('should throw an error', () => {
        expect(result.page).toThrow();
      });
    });

    describe('group', () => {
      it('should be a function', () => {
        expect(typeof result.group).toEqual('function');
      });
      it('should throw an error', () => {
        expect(result.group).toThrow();
      });
    });

    describe('alias', () => {
      it('should be a function', () => {
        expect(typeof result.alias).toEqual('function');
      });
      it('should throw an error', () => {
        expect(result.alias).toThrow();
      });
    });
  });
});
