import { plugin } from './module';

describe('SunAndMoonModule', () => {
  it('module should export plugin', () => {
    expect(plugin).toBeDefined();
  });
});
