function resolveAuto(cb, value) {
  if (value && typeof value.then === 'function') {
    return value.then(cb);
  }

  return cb(value);
}

function resolveSync(cb, value) {
  if (value && typeof value.then === 'function') {
    throw new Error('Cannot synchronously resolve a promise');
  }

  return cb(value);
}

function resolveAsync(cb, value) {
  if (value && typeof value.then === 'function') {
    return value.then(cb);
  }

  return new Promise((resolve, reject) => {
    try {
      resolve(cb(value));
    } catch (err) {
      reject(err);
    }
  });
}

function resolveAsIs(cb, value) {
  return cb(value);
}

module.exports = {
  auto: resolveAuto,
  sync: resolveSync,
  async: resolveAsync,
  asIs: resolveAsIs
};
