// Generated by CoffeeScript 1.4.0
var chai, config, expect, file, imgur, nock, pastebin, service, sys;

service = require('../lib/service.js');

config = require('../lib/config.js');

chai = require('chai');

nock = require('nock');

sys = require('sys');

expect = chai.expect;

file = null;

pastebin = null;

imgur = null;

beforeEach(function(done) {
  pastebin = nock('http://pastebin.com');
  imgur = nock('https://api.imgur.com');
  file = {
    name: 'test_file',
    path: __filename,
    size: 10,
    type: 'text/plain'
  };
  return done();
});

describe('Pastebin service', function() {
  var pb;
  pb = null;
  before(function(done) {
    pb = new service.PastebinService();
    return done();
  });
  it('should work fine on success response', function(done) {
    var cb;
    pastebin.post('/api/api_post.php').reply(200, 'message');
    cb = function(error, file, url, message) {
      expect(error).to.be["false"];
      expect(file).to.be.ok;
      expect(url).to.be.ok;
      return done();
    };
    return pb.dispatch(file, cb);
  });
  return it('should return error on error response', function(done) {
    var cb;
    pastebin.post('/api/api_post.php').reply(500);
    cb = function(error, file, url, message) {
      expect(error).to.be["true"];
      expect(file).to.be.ok;
      expect(url).to.not.exist;
      return done();
    };
    return pb.dispatch(file, cb);
  });
});

describe('Imgur service', function() {
  var im;
  im = null;
  before(function(done) {
    im = new service.ImgurService();
    return done();
  });
  it('should work fine on success response', function(done) {
    var cb;
    imgur.post('/3/image').reply(200, {
      'data': {
        'link': 'http://some.link'
      }
    });
    cb = function(error, file, url, message) {
      expect(error).to.be["false"];
      expect(file).to.be.ok;
      expect(url).to.be.ok;
      return done();
    };
    return im.dispatch(file, cb);
  });
  return it('should return error on error response', function(done) {
    var cb;
    imgur.post('/3/image').reply(500);
    cb = function(error, file, url, message) {
      expect(error).to.be["true"];
      expect(file).to.be.ok;
      expect(url).to.not.exist;
      return done();
    };
    return im.dispatch(file, cb);
  });
});
