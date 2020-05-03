import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
    id(i) {
        return ++i;
    },
    name(i) {
        return `Shop ${++i}`;
    }
});