import DS from 'ember-data';
const {attr, belongsTo, Model} = DS;
import { computed } from '@ember/object';


export default Model.extend({
  name: attr('string'),
  qty: attr('number', { defaultValue: 0 }),
  price: attr('number', { defaultValue: 0 }),
  shop: belongsTo('shop'),
});
