import expect from 'expect';
var actions = require('./../../actions/actions.jsx');

describe('Actions', () => {
    it('should generate search text action', () => {
        var action = {
            type: 'CHANGE_SEARCH_TEXT',
            text: 'Dog'
        };
        var res = actions.changeSearchText(action.text);
        expect(res).toEqual(action);
    });
});