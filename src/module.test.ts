import * as module from './module';

describe('SunAndMoonModule', () => {
  it('module should export plugin', () => {
    expect(module.plugin).toBeDefined();
  });
});
