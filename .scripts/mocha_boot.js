var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');
chai.use(chaiEnzyme());

global.navigator = {
  userAgent: 'node.js'
};
