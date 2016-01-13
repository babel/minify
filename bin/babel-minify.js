var code = '';

var replaceOptIndex = process.argv.indexOf('--replace');
if (replaceOptIndex !== -1) {
  var replacements = [];
  process.argv[replaceOptIndex + 1].split(',').forEach(function(record) {
    var tmp = record.split(':');
    var id = tmp[0];
    var repl = tmp[1];
    var member;
    if (id.match(/\./)) {
      tmp = id.split('.');
      id = tmp[0];
      member = tmp[1];
    }
    var type;
    if (repl.match(/^\d/)) {
      type = 'numericLiteral';
      repl = parseInt(repl, 10);
      if (isNaN(repl)) {
        throw new Error('Error parsing number');
      }
    } else if (repl.match(/^(true|false)$/)) {
      type = 'booleanLiteral';
    } else if (repl.match(/^null$/)) {
      type = 'nullLiteral';
    } else {
      type = 'identifier';
    }

    replacements.push({
      identifierName: id,
      member: member,
      replacement: {
        type: type,
        value: repl,
      },
    });
  });
}

process.stdin.on('data', function(d) {
  code += d.toString('utf-8');
});

process.stdin.on('end', function() {
  var res = require('../').compile(code, { replacements: replacements });
  process.stdout.write(res.code);
});
