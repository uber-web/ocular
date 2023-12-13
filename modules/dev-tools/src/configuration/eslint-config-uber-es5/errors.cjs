// Copyright (c) 2016 Uber Technologies, Inc.
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

// These rules relate to possible syntax or logic errors
// Categorized as "errors" here: http://eslint.org/docs/rules/
module.exports = {
  rules: {
    /**
    * Possible Errors Section from http://eslint.org/docs/rules/:
    */

    // http://eslint.org/docs/rules/no-cond-assign
    "no-cond-assign": 2,

    // http://eslint.org/docs/rules/no-constant-condition
    "no-constant-condition": 2,

    // http://eslint.org/docs/rules/no-console
    // highly agreed upon
    "no-console": 2,

    // http://eslint.org/docs/rules/no-control-regex
    "no-control-regex": 2,

    // http://eslint.org/docs/rules/no-debugger
    // highly agreed upon
    "no-debugger": 2,

    // http://eslint.org/docs/rules/no-dupe-args
    "no-dupe-args": 2,

    // http://eslint.org/docs/rules/no-dupe-keys
    "no-dupe-keys": 2,

    // http://eslint.org/docs/rules/no-duplicate-case
    "no-duplicate-case": 2,

    // http://eslint.org/docs/rules/no-empty-character-class
    "no-empty-character-class": 2,

    // http://eslint.org/docs/rules/no-empty
    // highly agreed upon
    "no-empty": 2,

    // http://eslint.org/docs/rules/no-ex-assign
    // abnormal behavior in ie 6-8
    "no-ex-assign": 2,

    // http://eslint.org/docs/rules/no-extra-boolean-cast
    // highly agreed upon
    "no-extra-boolean-cast": 2,

    // http://eslint.org/docs/rules/no-extra-parens
    "no-extra-parens": [2, "functions"],

    // http://eslint.org/docs/rules/no-extra-semi
    // highly agreed upon
    "no-extra-semi": 2,

    // http://eslint.org/docs/rules/no-func-assign
    "no-func-assign": 2,

    // http://eslint.org/docs/rules/no-inner-declarations
    "no-inner-declarations": [
      2,
      "functions"
    ],

    "no-invalid-regexp": 2,

    "no-irregular-whitespace": 2,

    "no-obj-calls": 2,

    // http://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": 0,

    "no-regex-spaces": 2,

    "no-sparse-arrays": 2,

    // http://eslint.org/docs/rules/no-template-curly-in-string
    "no-template-curly-in-string": 2,

    "no-unexpected-multiline": 2,

    "no-unreachable": 2,

    // http://eslint.org/docs/rules/no-unsafe-finally
    "no-unsafe-finally": 2,

    // http://eslint.org/docs/rules/no-unsafe-negation
    "no-unsafe-negation": 2,

    "use-isnan": 2,

    "valid-jsdoc": 0,

    "valid-typeof": 2
  }
}
