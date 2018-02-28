/**
 * Make it so that fetch throws on api errors.
 */
async function f(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) { throw new Error(res.statusText || res.message || res.msg || res); }
  if (res.headers.get('content-type').includes('json')) { return res.json() }
  return res;
}

export default f;
