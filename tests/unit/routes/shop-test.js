import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';


module('Unit | Route | shop', function(hooks) {
  setupTest(hooks);

  test('should show shop list as the home page', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/shop', 'should redirect automatically');
  });
});
