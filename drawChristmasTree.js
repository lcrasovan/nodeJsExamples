var fs = require('fs'),
    minimist = require('minimist'),
    params = minimist(process.argv.slice(2)),
    number = parseInt(params['n'], 10),
    maxNumber = parseInt(params['maxNumber'], 10);

String.prototype.repeat = String.prototype.repeat ||
    function(n) { return new Array(n + 1).join(this.toString()) };

function drawChristmasTree(number, maxNumber) {

    if (number > maxNumber) {
        process.stdout.write('The given number (' + number + ') cannot exceed the limit (' + maxNumber + ')');
        return;
    }

    var stringToWrite = '',
        startingPadding = ' '.repeat(number);
    for (var i = 1; i <= number; i++) {
        var paddingSpaces = startingPadding.substr(i);
        stringToWrite += i > 1 ? '#'.repeat(2): '#';
        process.stdout.write(paddingSpaces + stringToWrite + '\n');
    }
}

process.stdin.setEncoding('utf-8');
drawChristmasTree(number, maxNumber);



