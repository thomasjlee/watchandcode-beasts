function toFixed(value, precision) {
  if (isNaN(value)) {
    throw new TypeError('toFixed() value argument must be a number');
  } else if (precision < 0) {
    throw new RangeError('toFixed() precision argument must be 0 or greater');
  }

  var negative = '';
  if (value < 0) {
    negative = '-';
    value = value.toString().replace(/-/, '');
  }

  if (!precision || !Number.isInteger(precision)) {
    return negative + Math.round(value);
  }

  var valueArray = value.toString().split('.');

  var zeroPad = '';
  if (parseInt(valueArray[0], 10) === 0) {
    zeroPad = '0';
  }

  var decimal = valueArray[1];

  if (decimal) {
    if (precision > decimal.length) {
      for (var i = 0; i < precision - decimal.length; i++) {
        valueArray[1] += '0';
      }
    } else {
      var decimalArray = decimal.split('');
      decimalArray.splice(precision, 0, '.');
      valueArray[1] = decimalArray.join('');
    }
  } else {
    valueArray[1] = '';

    for (var i = 0; i < precision; i++) {
      valueArray[1] += '0';
    }
  }

  var roundedVal = Math.round(valueArray.join('')).toString();
  var nonDecimalLength = roundedVal.length - precision; 
  return negative + zeroPad + roundedVal.slice(0, nonDecimalLength) + '.' + roundedVal.slice(nonDecimalLength);
};