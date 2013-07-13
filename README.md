# flight-hogan

A [Flight](https://github.com/flightjs/flight) component for Hogan templating.

## Installation

```bash
bower install --save flight-hogan
```

## Example

### String templates

Instantiate the hogan component.

```javascript
var hogan = require('flight-hogan/lib/hogan');
hogan.attachTo(document);
```

Use the `with_hogan` mixin:

```javascript
define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withHogan = require('flight-hogan/lib/with_hogan');

  return defineComponent(myComponent, withHogan);

  function myComponent () {
    this.after('initialize', function() {
      var helloWorld = this.renderTemplate({
        template: 'Hello, {{name}}!',
        renderParams: {
          name: 'World'
        }
      });
    });
  }
});
```

### Pre-compiled templates

You can pass a hash of compiled templates as an option to the Hogan component. You can generate
compiled.js with [Grunt](http://gruntjs.com/) using [grunt-contrib-hogan](https://github.com/vanetix/grunt-contrib-hogan).

```javascript
var precompiledTemplates = require('templates/compiled');
var hogan = require('flight-hogan/lib/hogan');

hogan.attachTo(document, {
  precompiledTemplates: precompiledTemplates
});
```

```javascript
define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withHogan = require('flight-hogan/lib/with_hogan');

  return defineComponent(myComponent, withHogan);

  function myComponent () {
    this.after('initialize', function() {
      // render the 'hello_world' template from `templates/compiled.js`
      var helloWorld = this.renderTemplate({
        templateName: 'hello_world',
        renderParams: {
          name: 'World'
        }
      });
    });
  }
});
```

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
