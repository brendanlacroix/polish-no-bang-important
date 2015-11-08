module.exports = {
  message: 'Don\'t use !important. There\'s a better way.',
  name: 'no-bang-important',
  test: function(ast){
    var errors = [];

    ast.traverse(function (node){
      if (node.type !== 'declaration') {
        return;
      }

      if (node.toString().indexOf('!important') !== -1){
        errors.push({
          node: node
        });
      }
    });

    return errors;
  }
};
