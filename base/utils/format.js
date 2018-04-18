// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {rgb} from 'd3-color';

export const normalizeParam = p => {
  if (p.type === 'function') {
    let displayValue = p.value.toString();
    // pretty print function code:
    // convert `function funcName(d) {...}` to `d => {...}`
    displayValue = displayValue.replace(/^function (\w+)?\((\w*?)\)/, '$2 =>');
    // convert `function funcName(d, i) {...}` to `(d, i) => {...}`
    displayValue = displayValue.replace(/^function (\w+)?(\(.*?\))/, '$2 =>');
    // convert `d => {return 1}` to `d => 1`
    displayValue = displayValue.replace(/\{\s*return\s*(.*?);?\s*\}$/, '$1');
    return {...p, displayValue};
  }
  if (p.type === 'json') {
    return {...p, displayValue: JSON.stringify(p.value)};
  }
  if (p.type === 'color') {
    return {...p, displayValue: colorToHex(p.value)};
  }
  return {...p, displayValue: String(p.value)};
};

export const readableInteger = x => {
  if (!x) {
    return 0;
  }
  if (x < 1000) {
    return x.toString();
  }
  x /= 1000;
  if (x < 1000) {
    return `${x.toFixed(1)}K`;
  }
  x /= 1000;
  return `${x.toFixed(1)}M`;
};

export function colorToHex(color) {
  return colorToRGBArray(color).reduce(
    (acc, v) => `${acc}${v < 16 ? '0' : ''}${v.toString(16)}`,
    '#'
  );
}

export function colorToRGBArray(color) {
  if (Array.isArray(color)) {
    return color.slice(0, 3);
  }
  const c = rgb(color);
  return [c.r, c.g, c.b];
}
