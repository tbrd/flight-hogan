define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withHogan

  /**
   * Module function
   */

  function withHogan() {
    /**
     * Render a template with Hogan. Must provide either request.template or request.templateName
     * @param request.template {String} Optional Hogan template
     * @param request.templateName {String} Optional Template name
     * @param request.renderParams {Options} Optional Data
     */
    this.renderTemplate = function (request) {
      var requestId = request.requestId = Date.now();
      var html;

      this.on(document, 'hogan-rendered-template', function (e, data) {
        if (data.request.requestId === requestId) {
          html = data.rendered;
        }
        this.off(document, 'hogan-rendered-template');
      });

      this.trigger('hogan-render-template', request);

      return html;
    };
  }

});
