import Component from '@ember/component';
import { equal, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  store : service(),
  editMood : false,
  name : '',
  disabled : equal('name', ''),
  success : false,
  notification : '',
  showNotification: or('success', 'error'),
  error : false,
  actions : {
    changeEditMood() {
      this.toggleProperty('editMood');
    },
    addNewShop() {
    const self = this;
    const newShopRecord = self.get('store').createRecord('shop', {name : self.get('name')});
    newShopRecord.save()
      .then(() => {
        self.setProperties({
          name: '',
          success: true,
          editMood: false,
          notification: 'Shop was added successfully!'
        });
        setTimeout(() => self.toggleProperty('success'), 2000);
      })
      .catch(() => {
        self.toggleProperty('error');
        self.set('notification', 'Error, try again!');
        setTimeout(() => self.toggleProperty('error'), 2000);
      });
    }
  }
});
