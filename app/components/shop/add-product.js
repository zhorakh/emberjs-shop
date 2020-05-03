import Component from '@ember/component';
import { empty, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  store : service(),
  editMood : false,
  name : '',
  qty : '',
  price : '',
  disabled :  empty('name') && empty('qty') && empty('price'),
  success : false,
  error: false,
  notification: '',
  showNotification: or('success', 'error'),
  actions : {
    changeEditMood() {
      this.toggleProperty('editMood');
    },
    addNewShop(model) {
      const self = this
      let newProduct = self.get('store').createRecord('product', {
        name: self.get('name'),
        qty: Math.abs(self.get('qty')),
        price: Math.abs(self.get('price')),
        shop: model
      });
      const currentShop = self.get('store').peekRecord('shop', model.id);
      newProduct.save()
        .then(() => {
          currentShop.products.pushObject(self.store.createRecord('product', newProduct));
          self.setProperties({
            success: true,
            name : '',
            qty: '',
            price: '',
            editMood: false,
            notification: 'Product was added successfully',
          });
          setTimeout(() => self.toggleProperty('success'), 2000);
        })
        .catch(() => {
          self.setProperties({
            error: true,
            notification: 'Error, try again!'
          });
          setTimeout(() => self.toggleProperty('error'), 2000);
        });
  }
  }
});
