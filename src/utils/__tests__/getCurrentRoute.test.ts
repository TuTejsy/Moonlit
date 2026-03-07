import { getCurrentRoute } from '../navigation/getCurrentRoute';

describe('getCurrentRoute', () => {
  it('returns the route name for a flat navigation state', () => {
    const state = {
      index: 0,
      routes: [{ key: 'Home-1', name: 'Home' }],
    };

    expect(getCurrentRoute(state)).toBe('Home');
  });

  it('returns the deeply nested route name', () => {
    const state = {
      index: 0,
      routes: [
        {
          key: 'Tab-1',
          name: 'Tab',
          state: {
            index: 1,
            routes: [
              { key: 'Screen1-1', name: 'Screen1' },
              { key: 'Screen2-1', name: 'Screen2' },
            ],
          },
        },
      ],
    };

    expect(getCurrentRoute(state)).toBe('Screen2');
  });

  it('returns the triply nested route name', () => {
    const state = {
      index: 0,
      routes: [
        {
          key: 'Root-1',
          name: 'Root',
          state: {
            index: 0,
            routes: [
              {
                key: 'Tab-1',
                name: 'Tab',
                state: {
                  index: 0,
                  routes: [{ key: 'Detail-1', name: 'Detail' }],
                },
              },
            ],
          },
        },
      ],
    };

    expect(getCurrentRoute(state)).toBe('Detail');
  });

  it('handles a state where index is 0', () => {
    const state = {
      index: 0,
      routes: [
        { key: 'First-1', name: 'First' },
        { key: 'Second-1', name: 'Second' },
      ],
    };

    expect(getCurrentRoute(state)).toBe('First');
  });

  it('returns the correct route for a mid-stack index', () => {
    const state = {
      index: 2,
      routes: [
        { key: 'A-1', name: 'A' },
        { key: 'B-1', name: 'B' },
        { key: 'C-1', name: 'C' },
      ],
    };

    expect(getCurrentRoute(state)).toBe('C');
  });

  it('returns undefined when state has no defined index', () => {
    const state = {
      index: undefined,
      routes: [{ key: 'A-1', name: 'A' }],
    };

    // When index is undefined, nextRoute is null, thus name is undefined
    expect(getCurrentRoute(state as never)).toBeUndefined();
  });
});
