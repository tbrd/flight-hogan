define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var hogan = require('hoganjs');
  var withHogan = require('./with_hogan')

  /**
   * Module exports
   */

  return defineComponent(hogan, withHogan);

  /**
   * Module function
   */

  function hoganPrecompiled() {
    
    this.defaultAttrs({
      precompiledTemplates: {}
    });

    this.afterInitialize = function () {
      this.addTemplates(this.attr.precompiledTemplates);
    };
  }
});
