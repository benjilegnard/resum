import { LoadConfig, SetAppState } from './app.actions';

describe('AppActions', () => {
  it('LoadConfig action can be created', () => {
    expect(new LoadConfig()).toBeTruthy();
  });
  it('SetAppState action can be created', () => {
    expect(new SetAppState({})).toBeTruthy();
  });
});
