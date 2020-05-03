import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // console.log(this.store.findAll('shop'));
    // return this.store.findAll('shop');
    return this.get('store').findAll('shop');
    // return [
    //     {  name: 'ZARA' },
    //     {  name: 'MANGO' },
    //     {  name: 'MASSIMO DUTY' },
    //     {  name: 'BERSHKA' },
    // ];
    }
});
