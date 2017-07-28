const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - set', function () {
  require('../../init')(this);

  it('multiline.kevs', () => {
    const script = readKevs('set/multiline.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        const node = model.findNodesByID('node');
        const logLevelParam = node.dictionary.findValuesByID('logLevel');
        assert.ok(logLevelParam.value.length > 4000);
        assert.notEqual(logLevelParam.value.indexOf('\n'), -1);
      });
  });

  it('number-boolean.kevs', () => {
    const script = readKevs('set/number-boolean.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        const node = model.findNodesByID('node');
        const ticker = node.findComponentsByID('ticker');
        const periodParam = ticker.dictionary.findValuesByID('period');
        const randomParam = ticker.dictionary.findValuesByID('random');
        assert.equal(periodParam.value, '3000');
        assert.equal(randomParam.value, 'true');
      });
  });

  it('unknown.kevs', () => {
    const script = readKevs('set/unknown.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('set/unknown.kevs should NOT be valid');
      })
      .catch((err) => {
        assert.equal(err.message, 'Type "JavascriptNode" does not have any "unknown" parameter in its dictionary. Set failed');
        assert.deepEqual(err.pos, [35, 42]);
      });
  });

  it('wrong-number.kevs', () => {
    const script = readKevs('set/wrong-number.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('set/wrong-number.kevs should NOT be valid');
      })
      .catch((err) => {
        assert.equal(err.message, 'Attribute "period" in "/nodes[node]/components[ticker]" cannot be converted to a "long"');
        assert.deepEqual(err.pos, [103, 108]);
      });
  });

  it('wrong-boolean.kevs', () => {
    const script = readKevs('set/wrong-boolean.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('set/wrong-boolean.kevs should NOT be valid');
      })
      .catch((err) => {
        assert.equal(err.message, 'Attribute "random" in "/nodes[node]/components[ticker]" must have a value of "true" or "false"');
        assert.deepEqual(err.pos, [103, 106]);
      });
  });

  it('non-optional.kevs', () => {
    const script = readKevs('set/non-optional.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('set/non-optional.kevs should NOT be valid');
      })
      .catch((err) => {
        assert.equal(err.message, 'Non-optional attribute "logLevel" in "/nodes[node]" must have a value');
        assert.deepEqual(err.pos, [60, 62]);
      });
  });

  it('frag-param.kevs', () => {
    const script = readKevs('set/frag-param.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        const group = model.findGroupsByID('sync');
        const fDic = group.findFragmentDictionaryByID('node');
        const portParam = fDic.findValuesByID('port');

        assert.equal(portParam.value, '9000');
      });
  });
});
