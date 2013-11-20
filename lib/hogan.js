define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  // NB: Hogan is instantiated as a global variable
  require('bower_components/hogan/lib/template');
  require('bower_components/hogan/lib/compiler');

  /**
   * Module exports
   */

  return defineComponent(hogan);

  /**
   * Module function
   */

  function hogan() {
    this.defaultAttrs({
      precompiledTemplates: {}
    });

    /**
     * render a Hogan template
     * @param data.template {String} template
     * @param data.renderParams {Options} data
     * @returns {*}
     */
    this.renderStringTemplate = function (data) {
      // get cached template or compile
      var compiledTemplate = this.compiledTemplates[data.template] || Hogan.compile(data.template);

      // cache compiled template
      this.compiledTemplates[data.template] = compiledTemplate;

      // return rendered template
      return compiledTemplate.render(data.renderParams, this.compiledTemplates);
    };

    /**
     * render a named template. if the template is present in the cache, use that, otherwise load
     * template
     * @param data.templateName {String} path to template
     * @param data.renderParams {Options} data
     * @returns {*}
     */
    this.renderNamedTemplate = function (data) {
      var compiledTemplate = this.compiledTemplates[data.templateName];

      if (compiledTemplate) {
        // return rendered template
        return compiledTemplate.render(data.renderParams, this.compiledTemplates);
      } else {
        // throw error
      }
    };

    /**
     * handle render-template event. Must either provide templateName or template
     * @param e
     * @param data
     * @param data.templateName {String} Optional Template name
     * @param data.template {String} Optional Hogan template
     * @param data.renderParams {Options} Render params
     * @param data.partials {Options} template partials, must be strings
     */
    this.handleRenderTemplate = function (e, data) {
      var rendered;

      // add partials to compiled templates
      if (data.partials) {
        for (var template in data.partials) {
          this.compiledTemplates[template] = Hogan.compile(data.partials[template]);
        }
      }

      try {
        if (data.template) {
          rendered = this.renderStringTemplate(data);
        } else {
          rendered = this.renderNamedTemplate(data);
        }

        this.trigger('hogan-rendered-template', {
          rendered: rendered,
          request: data
        });
      } catch (e) {
        this.trigger('hogan-render-error', {
          error: e,
          request: data
        });
      }
    };

    this.after('initialize', function () {
      this.compiledTemplates = $.extend({}, this.attr.precompiledTemplates);
      this.on('hogan-render-template', this.handleRenderTemplate);
    });
  }

});
