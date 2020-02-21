import { describe, it } from 'mocha';
import { expect } from 'chai';
import tpl_bisheng from '../bisheng';
import tpl_doczrc from '../doczrc';
import tpl_index from '../index';
import tpl_mdx from '../mdx';

describe('tpl_bisheng template test', function () {
  it('type checking', function () {
    expect(tpl_bisheng).to.be.a('function');
  });
});

describe('tpl_doczrc template test', function () {
  it('type checking', function () {
    expect(tpl_doczrc).to.be.a('function');
  });
});

describe('tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});

describe('tpl_mdx template test', function () {
  it('type checking', function () {
    expect(tpl_mdx).to.be.a('function');
  });
});