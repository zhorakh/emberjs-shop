import DS from 'ember-data';
import { computed } from '@ember/object'
const {attr, hasMany, Model} = DS;


export default Model.extend({
  name: attr('string'),
  products: hasMany('product'),
  totalPrice: computed('products.@each.{price,qty}', function () {
    let products = this.get('products');
    return products.reduce((previousValue, product) => {
      return previousValue + (product.get('price') * product.get('qty'));
    }, 0);
  })
});
