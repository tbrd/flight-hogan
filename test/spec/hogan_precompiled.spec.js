'use strict';

describeComponent('lib/hogan_precompiled', function () {


  describe('hogan-render-template', function () {
    
    it('should add templates to compiledTemplated', function () {
      setupComponent({
        precompiledTemplates: {
          template1: 'Hello {{planetName}}'
        }
      });
      var html = this.component.renderTemplate(
        'template1',
        {
          planetName: 'world'
        });
      expect(html).toEqual('Hello world');
    });
  });
});
