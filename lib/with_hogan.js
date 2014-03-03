define(function (require) {

  'use strict';

  // top level variables are maintained between component instances, allowing
  // us to maintain a cache of compiled templates.
  var compiledTemplates = {};
  require('hoganjs');

  /**
   * Module exports
   */

  return withHogan;

  /**
   * Module function
   */

  function withHogan() {

    /**
     * add some compiled templates
     */
    this.addTemplates = function (templates) {
      $.each(templates, function (key, template) {
        try {
          compiledTemplates[key] = typeof template === 'string'
            ? Hogan.compile(template)
            : compiledTemplates[key] = template;
        } catch (e) {
          console.log('ERROR: template compile failed', template);
        }
      });
    }

    /**
     * Render a template with Hogan.
     * @param template {String} Hogan template or template name
     * @param data {Options} Optional data
     * @param partials {Array[template]} Optional partials
     */
    this.renderTemplate = function (options) {
      var html;
      var template = arguments[0];
      var data = arguments.length > 1 ? arguments[1] : {};
      var partials = arguments.length === 3 ? arguments[2] : [];
      var compiledTemplate = compiledTemplates[template] ||
        Hogan.compile(template);
      return compiledTemplate.render(data, $.extend({}, compiledTemplates, partials));
    };
  }

});
