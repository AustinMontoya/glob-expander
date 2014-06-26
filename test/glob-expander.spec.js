var mkdirp = require('mkdirp').sync;
var touch = require('touch').sync;
var rmdir = require('rimraf').sync;
var expect = require('chai').expect;
var expandGlob = require('../index');

describe("glob expander", function () {
	beforeEach(function() {
		mkdirp('public/js/app');
		mkdirp('public/js/tests');
		mkdirp('server/routes');
		touch('public/foo.js');
		touch('public/js/app/controller.js');
		touch('public/js/tests/controller.spec.js');
		touch('server/routes/user.js');
	});

	afterEach(function() {
		rmdir('public');
		rmdir('server');
	});

	it("should expand a single glob pattern", function () {
		expect(expandGlob('public/**/*.js')).to.eql(['public/*.js', 'public/js/*.js', 'public/js/app/*.js', 'public/js/tests/*.js']);
	});

	it("should pass through explicit file paths", function () {
		expect(expandGlob('public/js/app/controller.js')).to.eql(['public/js/app/controller.js']);
	});

	it("should pass through directory paths", function () {
		expect(expandGlob('public')).to.eql(['public']);
	});

	it("should process an array of globs", function () {
		expect(expandGlob(['public/js/app/**', 'server/**/*.js'])).to.eql(['public/js/app/*', 'server/*.js', 'server/routes/*.js']);
	});

});
