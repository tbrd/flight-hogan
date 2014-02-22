'use strict';

describeMixin('lib/with_hogan', function () {

  beforeEach(setupComponent);

  describe('renderTemplate', function () {
    describe('with string template', function () {
      it('rendered the template with provided data', function () {
        var html = this.component.renderTemplate({

          template: 'plain old {{myVar}}',
          renderParams: {
            myVar: 'html'
          }
        });

        expect(html).toEqual('plain old html');
      });

      it('returns empty string on error', function () {
        var html = this.component.renderTemplate({
          template: 'plain old {{#noClosingTag}}'
        });

        expect(html).toEqual('');
      });
    });


    it('uses pre-compiled template if available', function () {

      var precompiledTemplates = {
        posh: 'plain old {{myVar}}',
      };

      setupComponent();
      this.component.addTemplates(precompiledTemplates);

      var html = this.component.renderTemplate({
        templateName: 'posh',
          renderParams: {
            myVar: 'html'
          }
      });
      expect(html).toEqual('plain old html');
    });

    it('processes string partials', function () {
      setupComponent();

      var html = this.component.renderTemplate({
        template: 'test {{>aPartial}}',
        partials: {
          aPartial: 'partial'
        }
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

      var html = this.component.renderTemplate({
        templateName: 'aTemplate'
      });

      expect(html).toEqual('test partial');
    });

    it('shares compiledTemplates between instances', function () {
      setupComponent();

      var html = this.component.renderTemplate({
        templateName: 'aTemplate'
      });

      expect(html).toEqual('test partial');
    });
  });
});
