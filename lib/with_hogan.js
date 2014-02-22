define(function (require) {

  'use strict';

  // top level variables are maintained between component instances, allowing
  // us to maintain a cache of compiled templates.
  var compiledTemplates = {};

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
      var template, templateName;
      for (var templateName in templates) {
        if (templates.hasOwnProperty(templateName)) {
          if (typeof templates[templateName] === 'string') {
            compiledTemplates[templateName] = 
              Hogan.compile(templates[templateName]);  
          } else {
            compiledTemplates[templateName] = templates[templateName];
          }
        }
      }
    }

    /**
     * Render a template with Hogan. Must provide either
     * request.template or request.templateName
     * @param request.template {String} Optional Hogan template
     * @param request.templateName {String} Optional Template name
     * @param request.partials {Array[template]} Optional partials
     */
    this.renderTemplate = function (options) {
      var html;

      // add partials to compiled templates
      if (options.partials) {
        this.addTemplates(options.partials);    
      }

      try {
        if (options.template) {
          html = this.renderStringTemplate(options);
        } else {
          html = this.renderNamedTemplate(options);
        }
        return html;
      } catch (e) {
        return '';
      }
    };

    /**
     * render a named template. if the template is present in the cache, use that, otherwise load
     * template
     * @param data.templateName {String} path to template
     * @param data.renderParams {Options} data
     * @returns {*}
     */
    this.renderNamedTemplate = function (data) {
      var compiledTemplate = compiledTemplates[data.templateName];

      if (compiledTemplate) {
        // return rendered template
        return compiledTemplate.render(data.renderParams, compiledTemplates);
      } else {
        // throw error
      }
    };

    /**
     * render a Hogan template
     * @param data.template {String} template
     * @param data.renderParams {Options} data
     * @returns {*}
     */
    this.renderStringTemplate = function (data) {
      // get cached template or compile
      var compiledTemplate = compiledTemplates[data.template] || Hogan.compile(data.template);

      // cache compiled template
      compiledTemplates[data.template] = compiledTemplate;

      // return rendered template
      return compiledTemplate.render(data.renderParams, compiledTemplates);
    };

    
  }

});
