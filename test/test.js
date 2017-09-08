var assert = require('assert');
var Converter = require('../js/convert.js');
var files = ['test/OPW 733 Tienduizend redenen.ppt'];

describe('ppt-png', function() {
    describe('normal', function() {
        it('Test if the ppt file can convert to a jpg.', function() {
            new Converter({
                files:          files,
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'jpg',
                logLevel:       3,
                fileNameFormat: '_vers_%d',
                callback:       function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done(data.failed);
                    } else {
                        done();
                    }
                }
            }).run();
        });
    });

    describe('promise', function() {
        it('Test with the promise.', function() {
            new Converter({
                files:         files,
                output:        'output/test/',
                deletePdfFile: true
            })
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done(data.failed);
                    } else {
                        done();
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('failed', function() {
        it('Test if the fail function works on not existing files.', function() {
            new Converter({
                files:          ['x.ppt'],
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                outputType:     'png',
                logLevel:       2,
                fileNameFormat: '_vers_%d'
            })
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('add files', function() {
        it('Test the addFiles function.', function() {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       2,
                fileNameFormat: '_vers_%d'
            });

            convertTest.addFiles(files);

            convertTest
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('reset failed', function() {
        it('Test the resetFailed function.', function() {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       2,
                fileNameFormat: '_vers_%d'
            });

            convertTest.failed = files;

            convertTest.resetFailed();

            convertTest
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('fail', function() {
        it('Test if the fail function works.', function() {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       3,
                fileNameFormat: '_vers_%d'
            });

            convertTest.addFiles(files);

            convertTest
                .wait()
                .then(function(data) {
                    convertTest.fail('test');
                    if(data.failed.length > 0) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });
});
