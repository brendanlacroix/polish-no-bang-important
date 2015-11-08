define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-no-bang-important',

    message: function () {
      assert.strictEqual(plugin.message, 'Don\'t use !important. There\'s a better way.');
    }
  });

  registerSuite({
    name: 'polish-no-bang-important CSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/css.css', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'css' }));

        assert.strictEqual(errors.length, 1);
        assert.equal(errors[0].node.toString().trim(), 'color: red !important');
      }));
    }
  });

  registerSuite({
    name: 'polish-no-bang-important SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 2);
        assert.equal(errors[0].node.toString().trim(), 'color: red !important');
        assert.equal(errors[1].node.toString().trim(), 'color: red !important');
      }));
    }
  });
});