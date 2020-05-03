import Component from '@ember/component';
import { equal, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  editMood: false,
  name: '',
  disabled: equal('name', ''),
  success: false,
  error: false,
  notification: '',
  showNotification: or('success', 'error'),
  actions: {
    changeEditMood() {
      const self = this;
      self.set('notification', '');
      this.toggleProperty('editMood');
    },

    editShop(id) {
      const self = this;
      self.get('store').findRecord('shop', id)
        .then(res => {
          self.toggleProperty('success');
          res.setProperties({
              name: self.get('name'),
              qty: self.get('qty'),
              price: self.get('price')
          });
          self.setProperties({
              name: '',
              notification: 'Shop was updated successfully!'
          }),
          setTimeout(() => self.toggleProperty('success'), 2000);
          self.toggleProperty('editMood');
        })
        .catch(() => {
          const self = this;
          self.toggleProperty('error');
          self.set('notification', 'Error, try again!');
          setTimeout(() => self.toggleProperty('error'), 2000);
        });            
    },

    deleteShop(id) {
        const self = this;
        self.get('store').findRecord('shop', id)
          .then(shop => {
            shop.deleteRecord();
            shop.get('isDeleted'); // => true
            shop.save();
          })
    }
  }
});
