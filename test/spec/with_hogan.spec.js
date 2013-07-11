'use strict';

describeMixin('lib/with_hogan', function () {

  beforeEach(setupComponent);

  describe('renderTemplate', function () {
    it('should trigger hogan-render-template', function () {
      var spy = spyOnEvent(this.component.$node, 'hogan-render-template');

      this.component.renderTemplate({
        template: 'foo'
      });

      expect(spy).toHaveBeenTriggeredOn(this.component.$node);
      expect(spy.callCount).toBe(1);
    });

    it('should respond to hogan-rendered-template and return rendered value', function () {
      var request = {
        template: 'foo'
      };

      // fake hogan-rendered from hogan component
      this.component.$node.on('hogan-render-template', function(e, data) {
        this.component.$node.trigger('hogan-rendered-template', {
          rendered: 'bar',
          request: data
        });
      }.bind(this));

      // renderTemplate should return 'bar'
      expect(this.component.renderTemplate(request)).toEqual('bar');

    });
  });
});
