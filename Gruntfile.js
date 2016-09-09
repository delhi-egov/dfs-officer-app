module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dev: {
                src: ['./app/js/app.js'],
                dest: 'build/js/bundle.js',
                options: {
                    watch: true,
                    keepAlive: true
                }
            },
            default: {
                src: ['./app/js/app.js'],
                dest: 'build/js/bundle.js',
                options: {
                }
            }
        },
        serve: {
            options: {
                port: 9000
            }
        },
	    compass: {
            default: {
                options: {
                    sassDir: 'app/sass',
                    cssDir: 'build/stylesheets',
                    watch: true
                }
            }
	    }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('dev-serve', ['browserify:dev', 'serve']);
    grunt.registerTask('dev', ['browserify:dev', 'compass:default']);
    grunt.registerTask('default', ['browserify:default', 'compass:default']);
};
