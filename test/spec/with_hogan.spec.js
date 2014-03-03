'use strict';

describeMixin('lib/with_hogan', function () {

  beforeEach(setupComponent);

  describe('renderTemplate', function () {
    describe('with string template', function () {
      it('rendered the template with provided data', function () {
        var html = this.component.renderTemplate(
          'plain old {{myVar}}',
          {
            myVar: 'html'
          });
        expect(html).toEqual('plain old html');
      });

      it('throws on error', function () {
        function render () {
          this.component.renderTemplate('plain old {{#noClosingTag}}');
        }
        expect(render).toThrow();
      });
    });


    it('uses pre-compiled template if available', function () {
      var precompiledTemplates = {
        posh: 'plain old {{myVar}}',
      };

      setupComponent();
      this.component.addTemplates(precompiledTemplates);

      var html = this.component.renderTemplate(
        'posh',
        {
          myVar: 'html'
        });
      expect(html).toEqual('plain old html');
    });

    it('processes string partials', function () {
      setupComponent();

      var html = this.component.renderTemplate(
        'test {{>aPartial}}',
        {},
        {
          aPartial: 'partial'
        });

      expect(html).toEqual('test partial');
    });

    it('processes compiled partials', function () {
      var precompiledTemplates = {
        aTemplate: Hogan.compile('test {{>aPartial}}'),
        aPartial: Hogan.compile('partial')
      };

      setupComponent();
      this.component.addTemplates(precompiledTemplates);

      var html = this.component.renderTemplate('aTemplate');

      expect(html).toEqual('test partial');
    });

    it('shares compiledTemplates between instances', function () {
      setupComponent();
      var html = this.component.renderTemplate('aTemplate');
      expect(html).toEqual('test partial');
    });
  });
});
