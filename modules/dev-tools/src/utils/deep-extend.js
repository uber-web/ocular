// TODO - WIP
module.exports = function deepExtend(target, extension, key = 'root') {
  if (!isObject(target)) {
    return;
  }

  if (!extension) {
    return;
  }

  const newObject = {...target};

  for (const key in extension) {
    if (newObject[key]) {
      newObject[key] = deepExtend(newObject[key], extension[key], key);
    } else {
      newObject[key] = extension[key];
    }
  }
}

function isObject(value) {
  return value && typeof value == 'object';
}
