// NOTE - copied from math.gl to avoid dev-tools depending on math.gl
const config = {
  EPSILON: 1e-10
};

// eslint-disable-next-line complexity
export function equals(a, b, epsilon) {
  const oldEpsilon = config.EPSILON;
  if (epsilon) {
    config.EPSILON = epsilon;
  }
  try {
    if (a === b) {
      return true;
    }
    if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; ++i) {
        // eslint-disable-next-line max-depth
        if (!equals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    if (a && a.equals) {
      return a.equals(b);
    }
    if (b && b.equals) {
      return b.equals(a);
    }
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return Math.abs(a - b) <= config.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
    }
    return false;
  } finally {
    config.EPSILON = oldEpsilon;
  }
}

export function withEpsilon(EPSILON, func) {
  const oldPrecision = config.EPSILON;
  config.EPSILON = EPSILON;
  let value;
  try {
    value = func();
  } finally {
    config.EPSILON = oldPrecision;
  }
  return value;
}

// Returns true if value is either an array or a typed array
// Note: does not return true for ArrayBuffers and DataViews
export function isArray(value) {
  return Array.isArray(value) || (ArrayBuffer.isView(value) && value.length !== undefined);
}
