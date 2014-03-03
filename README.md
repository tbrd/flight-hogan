# flight-hogan

A [Flight](https://github.com/flightjs/flight) component for Hogan templating.

## Installation

```bash
bower install --save flight-hogan
```

## Require config

requirejs.config({
  paths: {
    'hoganjs': 'bower_components/hogan/web/build/2.0.0/hogan-2.0.0.amd'
  }
});

## Example

Use the `with_hogan` mixin:

```javascript
define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withHogan = require('flight-hogan/lib/with_hogan');

  return defineComponent(myComponent, withHogan);

  function myComponent () {
    this.after('initialize', function() {
      var html = this.renderTemplate(
        'Hello, {{name}}!', {
            name: 'World'
          });
      this.$node.html(html);
    });
  }
});
```

### Pre-compiled templates

You can pass a hash of compiled templates as an option to the Hogan Precompiled component. You can generate
compiled.js with [Grunt](http://gruntjs.com/) using [grunt-contrib-hogan](https://github.com/vanetix/grunt-contrib-hogan).

```javascript
var precompiledTemplates = require('templates/compiled');
var hoganPrecompiled = require('flight-hogan/lib/hogan_precompiled');

hoganPrecompiled.attachTo(document, {
  precompiledTemplates: precompiledTemplates
});
```

Precompiled templates are then available from the withHogan mixin:

```javascript
define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withHogan = require('flight-hogan/lib/with_hogan');

  return defineComponent(myComponent, withHogan);

  function myComponent () {
    this.after('initialize', function() {
      // e.g., render a 'hello_world' template from `templates/compiled.js`
      var helloWorld = this.renderTemplate(
        'hello_world', {
          name: 'World'
        });
    });
  }
});
```

## Partials

Partials will be searched for in compiled templates, or you can pass string partials to `renderTemplate` (you can't pass compiled templates as flight can't serialize them into event data).

```javascript
define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withHogan = require('flight-hogan/lib/with_hogan');

  return defineComponent(myComponent, withHogan);

  function myComponent () {
    this.after('initialize', function() {
      // render template with a partial
      var helloWorld = this.renderTemplate('hello {{>planet}}', {}, {
          planet: 'Mars'
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
