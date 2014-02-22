define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withHogan = require('./with_hogan')
  require('hoganjs');

  /**
   * Module exports
   */

  return defineComponent(hoganPrecompiled, withHogan);

  /**
   * Module function
   */

  function hoganPrecompiled() {
    
    this.defaultAttrs({
      precompiledTemplates: {}
    });

    this.after('initialize', function () {
      this.addTemplates(this.attr.precompiledTemplates);
    });
  }
});