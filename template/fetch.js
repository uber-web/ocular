/**
 * Make it so that fetch throws on api errors.
 */
async function f(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) { throw new Error(res.statusText || res.message || res.msg || res); }
  return await res.json();
}

export default f;
