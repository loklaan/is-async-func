const isAsyncFunction = require('../index');
const babel = require('babel-core');

const getTranspileConfig = (presets) => ({
  presets,
  plugins: [
    'transform-es2015-modules-commonjs',
    ['transform-runtime', {
      helpers: false
    }]
  ]
});

function transform (presets, code) {
  return babel.transform(
    'module.exports = ' + code,
    getTranspileConfig(presets)
  ).code;
}

function evalToExportWithTransform (presets, code) {
  const moduleCode = transform(presets, code)

  const iifeToReturnExport = '(function () {' +
    moduleCode +
    '; return module.exports;})()';
  return eval(iifeToReturnExport);
}

describe('isAsyncFunc', () => {
  describe('in ES2017 runtime', () => {
    it('should detect async anon function', () => {
      const es2017AsyncAnonFunction = async function () {};
      expect(es2017AsyncAnonFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncAnonFunction
      )).toBeTruthy();
    });

    it('should detect async fat arrow', () => {
      const es2017AsyncFatArrowFunction = async () => {};
      expect(es2017AsyncFatArrowFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncFatArrowFunction
      )).toBeTruthy();
    });

    it('should detect async obj prop function', () => {
      const foo = {
        async bar () {}
      }
      const es2017AsyncObjPropFunction = foo.bar;
      expect(es2017AsyncObjPropFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncObjPropFunction
      )).toBeTruthy();
    });

    it('should detect async obj prop anon function', () => {
      const foo = {
        bar: async function () {}
      }
      const es2017AsyncObjPropAnonFunction = foo.bar;
      expect(es2017AsyncObjPropAnonFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncObjPropAnonFunction
      )).toBeTruthy();
    });

    it('should detect async obj prop fat arrow function', () => {
      const foo = {
        bar: async () => {}
      }
      const es2017AsyncObjPropFatArrowFunction = foo.bar;
      expect(es2017AsyncObjPropFatArrowFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncObjPropFatArrowFunction
      )).toBeTruthy();
    });

    it('should detect async class method', () => {
      class Foo {
        async bar () {}
      }
      const foo = new Foo();
      const es2017AsyncClassInstanceFunction = foo.bar;
      expect(es2017AsyncClassInstanceFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncClassInstanceFunction
      )).toBeTruthy();
    });

    it('should not detect generator anon function', () => {
      const es2015GeneratorAnonFunction = function* () {};
      expect(es2015GeneratorAnonFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorAnonFunction
      )).toBeFalsy();
    });

    it('should not detect generator obj prop function', () => {
      const foo = {
        *bar () {}
      }
      const es2015GeneratorObjPropFunction = foo.bar;
      expect(es2015GeneratorObjPropFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorObjPropFunction
      )).toBeFalsy();
      expect(isAsyncFunction(foo.bar)).toBeFalsy();
    });

    it('should not detect generator obj prop anon function', () => {
      const foo = {
        bar: function* () {}
      }
      const es2015GeneratorObjPropAnonFunction = foo.bar;
      expect(es2015GeneratorObjPropAnonFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorObjPropAnonFunction
      )).toBeFalsy();
    });

    it('should not detect generator class method', () => {
      class Foo {
        *bar () {}
      }
      const foo = new Foo();
      const es2015GeneratorClassInstanceFunction = foo.bar;
      expect(es2015GeneratorClassInstanceFunction.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorClassInstanceFunction
      )).toBeFalsy();
    });
  });

  const runTranspileTestsWithPresets = (presets) => {
    it('should detect async anon function', () => {
      const es2017AsyncAnonFunction = 'async function () {}';
      expect(transform(presets, es2017AsyncAnonFunction)).toMatchSnapshot();
      const es2017AsyncAnonFunctionRef = evalToExportWithTransform(presets, es2017AsyncAnonFunction);
      expect(es2017AsyncAnonFunctionRef).toMatchSnapshot();
      expect(es2017AsyncAnonFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncAnonFunctionRef
      )).toBeTruthy();
    });

    it('should detect async fat arrow', () => {
      const es2017AsyncFatArrowFunction = 'async () => {}';
      expect(es2017AsyncFatArrowFunction).toMatchSnapshot();
      const es2017AsyncFatArrowFunctionRef = evalToExportWithTransform(presets, es2017AsyncFatArrowFunction);
      expect(es2017AsyncFatArrowFunctionRef).toMatchSnapshot();
      expect(es2017AsyncFatArrowFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncFatArrowFunctionRef
      )).toBeTruthy();
    });

    it('should detect async obj prop function', () => {
      const es2017AsyncObjPropFunction = `(function () {
        const foo = {
          async bar () {}
        }
        return foo.bar;
      })()`
      expect(transform(presets, es2017AsyncObjPropFunction)).toMatchSnapshot();
      const es2017AsyncObjPropFunctionRef = evalToExportWithTransform(presets, es2017AsyncObjPropFunction);
      expect(es2017AsyncObjPropFunctionRef).toMatchSnapshot();
      expect(es2017AsyncObjPropFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncObjPropFunctionRef
      )).toBeTruthy();
    });

    it('should detect async obj prop anon function', () => {
      const es2017AsyncObjPropAnonFunction = `(function () {
        const foo = {
          bar: async function () {}
        }
        return foo.bar;
      })()`
      expect(transform(presets, es2017AsyncObjPropAnonFunction)).toMatchSnapshot();
      const es2017AsyncObjPropAnonFunctionRef = evalToExportWithTransform(presets, es2017AsyncObjPropAnonFunction);
      expect(es2017AsyncObjPropAnonFunctionRef).toMatchSnapshot();
      expect(es2017AsyncObjPropAnonFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncObjPropAnonFunctionRef
      )).toBeTruthy();
    });

    it('should detect async obj prop fat arrow function', () => {
      const es2017AsyncObjPropFatArrowFunction = `(function () {
        const foo = {
          bar: async () => {}
        }
        return foo.bar;
      })()`
      expect(transform(presets, es2017AsyncObjPropFatArrowFunction)).toMatchSnapshot();
      const es2017AsyncObjPropFatArrowFunctionRef = evalToExportWithTransform(presets, es2017AsyncObjPropFatArrowFunction);
      expect(es2017AsyncObjPropFatArrowFunctionRef).toMatchSnapshot();
      expect(es2017AsyncObjPropFatArrowFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncObjPropFatArrowFunctionRef
      )).toBeTruthy();
    });

    it('should detect async class method', () => {
      const es2017AsyncClassInstanceFunction = `(function () {
        class Foo {
          async bar () {}
        }
        const foo = new Foo();
        return foo.bar;
      })()`
      expect(transform(presets, es2017AsyncClassInstanceFunction)).toMatchSnapshot();
      const es2017AsyncClassInstanceFunctionRef = evalToExportWithTransform(presets, es2017AsyncClassInstanceFunction);
      expect(es2017AsyncClassInstanceFunctionRef).toMatchSnapshot();
      expect(es2017AsyncClassInstanceFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2017AsyncClassInstanceFunctionRef
      )).toBeTruthy();
    });

    it('should not detect generator anon function', () => {
      const es2015GeneratorAnonFunction = `function* () {}`
      expect(transform(presets, es2015GeneratorAnonFunction)).toMatchSnapshot();
      const es2015GeneratorAnonFunctionRef = evalToExportWithTransform(presets, es2015GeneratorAnonFunction);
      expect(es2015GeneratorAnonFunctionRef).toMatchSnapshot();
      expect(es2015GeneratorAnonFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorAnonFunctionRef
      )).toBeFalsy();
    });

    it('should not detect generator obj prop function', () => {
      const es2015GeneratorObjPropFunction = `(function () {
        const foo = {
          *bar () {}
        }
        return foo.bar;
      })()`
      expect(transform(presets, es2015GeneratorObjPropFunction)).toMatchSnapshot();
      const es2015GeneratorObjPropFunctionRef = evalToExportWithTransform(presets, es2015GeneratorObjPropFunction);
      expect(es2015GeneratorObjPropFunctionRef).toMatchSnapshot();
      expect(es2015GeneratorObjPropFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorObjPropFunctionRef
      )).toBeFalsy();
    });

    it('should not detect generator class method', () => {
      const es2015GeneratorClassInstanceFunction = `(function () {
        class Foo {
          *bar () {}
        }
        const foo = new Foo();
        return foo.bar;
      })()`
      expect(transform(presets, es2015GeneratorClassInstanceFunction)).toMatchSnapshot();
      const es2015GeneratorClassInstanceFunctionRef = evalToExportWithTransform(presets, es2015GeneratorClassInstanceFunction);
      expect(es2015GeneratorClassInstanceFunctionRef).toMatchSnapshot();
      expect(es2015GeneratorClassInstanceFunctionRef.toString()).toMatchSnapshot();
      expect(isAsyncFunction(
        es2015GeneratorClassInstanceFunctionRef
      )).toBeFalsy();
    });
  };

  describe('in ES5 runtime, from eval(es2017 -> babel)', () => {
    runTranspileTestsWithPresets(['es2017']);
  });

  describe('in ES5 runtime, from eval(es2016/2017 -> babel)', () => {
    runTranspileTestsWithPresets(['es2016', 'es2017']);
  });

  describe('in ES5 runtime, from eval(es2015/2016/2017 -> babel)', () => {
    runTranspileTestsWithPresets(['es2015', 'es2016', 'es2017']);
  });
});