module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var jshintReporter = require('jshint-stylish');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jscs: {
            src: ['*.js', 'lib/*.js']
        },

        jshint: {
            options: {
                jshintrc: true,
                reporter: jshintReporter
            },
            target: ['*.js', 'lib/*.js']
        }
    });

    grunt.registerTask('default', [
        'valid'
    ]);

    grunt.registerTask('valid', [
        'jscs',
        'jshint'
    ]);
};
