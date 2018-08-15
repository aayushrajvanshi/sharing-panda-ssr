// const fs = require('fs');

// fs.readdirSync(__dirname + '/api/').forEach((file) => {
//     require(`./api/${file.substr(0, file.indexOf('.'))}`)(router);
// });

import { combineReducers } from 'redux';

const testReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return action.text;
        default:
            return state;
    }
};

const reducer = combineReducers({
    test: testReducer
});

export default reducer;
