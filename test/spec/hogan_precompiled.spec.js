'use strict';

describeComponent('lib/hogan_precompiled', function () {


  describe('hogan-render-template', function () {
    
    it('should add templates to compiledTemplated', function () {
      setupComponent({
        precompiledTemplates: {
          template1: 'Hello {{planetName}}'
        }
      });
      var html = this.component.renderTemplate({
        templateName: 'template1',
        renderParams: {
          planetName: 'world'
        }
      });
      expect(html).toEqual('Hello world');
    });
  });
});
