import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('shop', function() {
    this.route('products',  {path: "/:shop_id"});
  });
});

export default Router;
