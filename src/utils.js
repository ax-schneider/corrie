const GENERATOR_PROTO = Object.getPrototypeOf(function* () {})

function normalizeRoutine(routine) {
  if (GENERATOR_PROTO.isPrototypeOf(routine)) {
    return routine
  }

  // eslint-disable-next-line
  return function* generatorRoutine(...args) {
    yield { effect: 'setRoutine', routine }
    return routine.apply(this, args)
  }
}

function normalizeResolvers(resolvers) {
  let givenType = typeof resolvers

  if (givenType === 'function') {
    return {
      start: resolvers,
      resume: resolvers,
      handle: resolvers,
      value: resolvers,
      complete: resolvers,
    }
  }

  if (givenType === 'object') {
    if (
      !resolvers.start ||
      !resolvers.resume ||
      !resolvers.handle ||
      !resolvers.value ||
      !resolvers.complete
    ) {
      throw new Error(
        '"start", "resume", "handle", "value" and "complete" resolvers are required'
      )
    }

    return resolvers
  }

  throw new TypeError('Resolvers must be either an object or a function')
}

module.exports = { normalizeRoutine, normalizeResolvers }
