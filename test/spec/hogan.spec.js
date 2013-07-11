'use strict';

describeComponent('lib/hogan', function () {


  describe('hogan-render-template', function () {
    describe('with string template', function () {

      // Initialize the component and attach it to the DOM
      beforeEach(function () {
        setupComponent();
      });

      it('should instantiate hogan', function () {
        expect(Hogan).not.toBe(undefined);
      });

      it('rendered the template with provided data', function () {

        var spy = spyOnEvent(this.component.$node, 'hogan-rendered-template');

        this.component.$node.trigger('hogan-render-template', {
          template: 'plain old {{myVar}}',
          renderParams: {
            myVar: 'html'
          }
        });

        expect(spy).toHaveBeenTriggeredOn(this.component.$node);
        expect(spy.callCount).toBe(1);
        expect(spy.mostRecentCall.data).toEqual({
          rendered: 'plain old html',
          request: {
            template: 'plain old {{myVar}}',
            renderParams: {
              myVar: 'html'
            }
          }
        });
      });

      it('triggers hogan-render-error on error', function () {
        var spy = spyOnEvent(this.component.$node, 'hogan-render-error');

        this.component.$node.trigger('hogan-render-template', {
          template: 'plain old {{#noClosingTag}}',
          renderParams: {
            myVar: 'html'
          }
        });

        expect(spy).toHaveBeenTriggeredOn(this.component.$node);
        expect(spy.callCount).toBe(1);
      });
    });


    it('uses pre-compiled template if available', function () {

      var precompiledTemplates = {
        aTemplate: Hogan.compile('test')
      };

      setupComponent({
        precompiledTemplates: precompiledTemplates
      });

      var spy = spyOnEvent(this.component.$node, 'hogan-rendered-template');

      this.component.$node.trigger('hogan-render-template', {
        templateName: 'aTemplate'
      });

      expect(spy).toHaveBeenTriggeredOn(this.component.$node);
      expect(spy.callCount).toBe(1);
      expect(spy.mostRecentCall.data).toEqual({
        rendered: 'test',
        request: {
          templateName: 'aTemplate'
        }
      });
    });

  });
});
