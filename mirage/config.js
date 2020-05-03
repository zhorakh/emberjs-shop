export default function() {

  this.namespace = 'api';
  this.get('/shops');
  this.get('/shop/:id');
  // this.get('/shops');
  this.post('/shops');
  this.get('/shops/:id');
  this.del('/shops/:id');
  this.put('/shops/:id');
  this.patch('/shops/:id');
  this.get('/products');
  this.post('/products', function({ products }) {
      return products.create();
  });
  this.get('/products/:id');
  this.del('/products/:id');
  this.put('/products/:id');
  this.patch('/products/:id', function({ products }, request) {
    let id = request.params.id;

    return products.find(id).update();
  });
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');`
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */
}
