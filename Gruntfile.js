module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  var markdownlint = require('markdownlint');
  grunt.registerMultiTask('markdownlint', function task() {
    var result = markdownlint.sync({'files': this.filesSrc,
                                    'config': this.data.config});
    if (result.toString().length > 0) {
      grunt.fail.warn("\n" + result + "\n");
    }
  });

  grunt.initConfig({

    clean: ['dist'],

    markdownlint: {
      files: {
        config: {
          'default': true,
          'MD041': false
        },
        'src': ['*.md']
      }
    },

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: [
          '**/*',
          '!**/*.js',
          '!**/*.scss',
          '!img/*'
        ],
        dest: 'dist'
      },
      img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/*'],
        dest: 'dist/src/'
      },
      node_modules_to_dist: {
        cwd: 'node_modules',
        expand: true,
        src: [
          'lodash/lodash.js',
          'suncalc/suncalc.js'
        ],
        dest: 'dist',
        flatten: true
      },
      pluginDef: {
        expand: true,
        src: [
          'plugin.json',
          'README.md'
        ],
        dest: 'dist'
      }
    },

    watch: {
      rebuild_all: {
        files: [
          'src/**/*',
          'plugin.json'
        ],
        tasks: ['default'],
        options: {spawn: false}
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ['es2015']
      },
      dist: {
        options: {
          plugins: [
            'transform-es2015-modules-systemjs',
            'transform-es2015-for-of'
          ]
        },
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
      distTestNoSystemJs: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist/test',
          ext:'.js'
        }]
      },
      distTestsSpecsNoSystemJs: {
        files: [{
          expand: true,
          cwd: 'spec',
          src: ['**/*.js'],
          dest: 'dist/test/spec',
          ext:'.js'
        }]
      }
    },

    jshint: {
      source: {
        files: {
          src: ['Gruntfile.js', 'src/**/*.js']
        }
      },
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish'),
        ignores: [
          'node_modules/*',
          'dist/*'
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'dist/test/spec/test-main.js',
          'dist/test/spec/*_spec.js'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'markdownlint',
    'clean',
    'copy:src_to_dist',
    'copy:img_to_dist',
    'copy:node_modules_to_dist',
    'copy:pluginDef',
    'babel',
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('test', ['default']);
};
