function checkNumber(value) {
    if (typeof value === 'number')
        return true;
    return "The value '"+value+"' should be a number."
}

function checkPositive(value) {
    if (value > 0)
        return true;
    return "The value '"+value+"' should be positive."
}

function applyDecorators(f, checks) {
    return function() {
        var errors = [];
        for (var i = 0; i < arguments.length; i++) {
            for (var j = 0; j < checks.length; j ++) {
                if (checks[j](arguments[i]) != true) {
                    errors.push(checks[j](arguments[i]));
                }
            }
        }
        if (errors.length > 0) return errors.join(' ');
        return f.apply(this, arguments);
    }
}

function positiveSum(a, b) {
    return a + b;
}

positiveSum = applyDecorators(positiveSum, [checkNumber, checkPositive]);

console.log(positiveSum(1,2));
console.log(positiveSum(1,-1));
console.log(positiveSum(1,true));