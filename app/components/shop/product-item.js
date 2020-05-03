import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { or, empty } from '@ember/object/computed';

export default Component.extend({
	store: service(),
	editMood : false,
	name : '',
	qty : '',
	price : '',
	success: false,
	error : false,
	notification: '',
	showNotification: or('success', 'error'),
	
	actions : {
		changeEditMood() {
			this.toggleProperty('editMood');
		},

		editProduct(shopModel, productId) {

			const self = this;
			const currentShop = self.get('store').peekRecord('shop', shopModel.id);
			const currentProduct = currentShop.products.findBy('id', productId);
			currentProduct.setProperties({
				name: self.get('name') || currentProduct.get('name') ,
				qty: Math.abs(self.get('qty')) ||  currentProduct.get('qty'),
				price: Math.abs(self.get('price')) ||  currentProduct.get('price'),
				shop: shopModel
			})
			currentProduct.save()
				.then(() => {
					self.setProperties({
						success: true,
						notification: 'Product was updated   successfully',
						name: '',
						qty: '',
						price: '',
						editMood: false
					});
					setTimeout(() => self.toggleProperty('success'));
				})
				.catch(() => {
					self.set('notification', 'Error, try again!');
					setTimeout(() => self.toggleProperty('error'));
				})
			self.set('editMood', false);
			
		},

		deleteProduct(shopModel, productId) {
			const self = this;
			const currentShop = self.get('store').peekRecord('shop', shopModel.id);
			const  currentProduct = currentShop.products.findBy('id', productId);
			if(!currentProduct) return;
			currentShop.products.removeObject(currentProduct);
			currentShop.save()
				.then(() => {
					self.setProperties({
						name: '',
						qty: '',
						price: ''
					})
				}) 
				.catch(() => {

				});

		}
	}
});
