'use strict';

var gulp = require('gulp'),
    template = require('gulp-template'),
    inject   = require('gulp-inject-string'),
    prompt   = require('gulp-prompt'),
    gutil    = require('gulp-util'),
    rename   = require('gulp-rename');
 

var argv = require('yargs')
  .usage('Generate a Vimeography theme with ease.\nUsage: $0 --name playlister')
  .example('$0 -n playlister', 'Generates a Vimeography theme called "playlister"')
  .options({
    'n': {
      alias: 'name',
      demand: true,
      describe: 'The name of your theme',
      type: 'string'
    },
    'f': {
      alias: 'fancybox',
      describe: 'Use fancybox in this theme',
      type: 'boolean'
    },
    's': {
      alias: 'slick',
      describe: 'Use slick slider in this theme',
      type: 'boolean'
    }
  })
  .argv;

var template_data = {},
    theme_slug   = "vimeography-" + argv.name.toLowerCase(),
    theme_folder = "./" + theme_slug,
    plugin_file  = theme_folder + '/' + theme_slug + '.php',
    selected_theme_dependencies = [];

var required_theme_dependencies = ["jquery", "vimeography-utilities", "vimeography-pagination"];
var available_theme_dependencies = {
  'fancybox': {
    script_url   : "//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.pack.js",
    style_url    : "//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css",
    dependencies : ["jquery"]
  },
  'slick' : {
    script_url   : "//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.4.1/slick.min.js",
    style_url    : "//cdn.jsdelivr.net/jquery.slick/1.4.1/slick.css",
    dependencies : ["jquery"]
  }
}

if (argv.fancybox) selected_theme_dependencies.push('fancybox');
if (argv.slick)    selected_theme_dependencies.push('slick');
create_theme_dependency_tasks();


/**
 * [create_theme_dependency_tasks description]
 * @return {[type]} [description]
 */
function create_theme_dependency_tasks() {
  selected_theme_dependencies.forEach(function(dep, index, dependencies) {

    required_theme_dependencies.push(dep);
    required_theme_dependencies.concat(available_theme_dependencies[dep].dependencies);

    var dependent_tasks = index == 0 ? ['copying template files'] : ['including ' + dependencies[index - 1]];

    gulp.task('including ' + dep, dependent_tasks, function() {
      return gulp.src(plugin_file)
        .pipe(inject.after('/* inject:deregister_scripts */', '\n      wp_deregister_script("' + dep + '");\n'))
        .pipe(inject.after('/* inject:dequeue_scripts */',    '\n      wp_dequeue_script("' + dep + '");\n'))
        .pipe(inject.after('/* inject:register_scripts */',   "\n      wp_register_script('{0}', '{1}', array({2}) );\n"
          .format(
            dep, 
            available_theme_dependencies[dep].script_url, 
            "'" + available_theme_dependencies[dep].dependencies.join("', '") + "'"
          )
        ))
        .pipe(inject.after('/* inject:enqueue_scripts */',    '\n      wp_enqueue_script("' + dep + '");\n'))
        .pipe(inject.after('/* inject:deregister_styles */',  '\n      wp_deregister_style("' + dep + '");\n'))
        .pipe(inject.after('/* inject:dequeue_styles */',     '\n      wp_dequeue_style("' + dep + '");\n'))
        .pipe(inject.after('/* inject:register_styles */',    "\n      wp_register_style( '{0}', '{1}' );\n"
          .format(
            dep, 
            available_theme_dependencies[dep].style_url
          )
        ))
        .pipe(inject.after('/* inject:enqueue_styles */',     '\n      wp_enqueue_style("' + dep + '");\n'))
        .pipe(gulp.dest(theme_folder));
      });
  });
}


/**
 * Prompt the user for information to be used in the theme headers.
 * @param  {[type]}
 * @return {[type]}
 */
gulp.task('requesting more information', function () {

  return gulp.src('./gulpfile.js', {read: false})
    .pipe(prompt.prompt([{
        type: 'input',
        name: 'theme_description',
        message: 'Enter a short description',
        default: 'is…'
    },
    {
        type: 'input',
        name: 'theme_uri',
        message: 'Enter the Theme URI',
        default: 'http://vimeography.com/themes/' + argv.name.toLowerCase()
    },
    {
        type: 'input',
        name: 'author_name',
        message: 'Enter the author name',
        default: 'Vimeography Blueprint'
    },
    {
        type: 'input',
        name: 'author_uri',
        message: 'Enter the author URI',
        default: 'http://vimeography.com'
    }
    ], function(res){
        //value is in res.first and res.second
        template_data = res;
        template_data.name = argv.name;
    }));
});


/**
 * [description]
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
gulp.task('inserting template data', ['requesting more information'], function () {
  return gulp.src([theme_folder + '/**/*', '!' + theme_folder + '/**/*.jpg'])
      .pipe(template(template_data))
      .pipe(gulp.dest(theme_folder));
});


/**
 * [description]
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
gulp.task('including theme dependencies', ['copying template files'].concat(selected_theme_dependencies.map( function (dep) { return 'including ' + dep } ) ), function () {

  required_theme_dependencies = required_theme_dependencies.filter( onlyUnique );

  return gulp.src(plugin_file)
    .pipe(inject.after('/* inject:register_theme_script */',   "\n      wp_register_script('{0}', plugins_url('assets/js/{0}' . $suffix . '.js', __FILE__), array({1}) );\n"
      .format(
        theme_slug, 
        "'" + required_theme_dependencies.join("', '") + "'"
      )
    ))
    .pipe(gulp.dest(theme_folder));
});



/**
 * [description]
 * @param  {[type]} [description]
 * @return {[type]} [description]
 */
gulp.task('copying template files', function () {
  gutil.log( gutil.colors.green('Generating a new Vimeography theme called ' + argv.name + '…') );

  return gulp.src("./.templates/**/*")
    .pipe(rename(function (path) {
      path.basename = path.basename.replace(/blueprint/g, argv.name);
    }))
    .pipe(gulp.dest(theme_folder));
});

gulp.task('default', ['inserting template data', 'including theme dependencies']);


/* Init gulp in theme */


/**
 * [description]
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
gulp.task('finish', ['requesting more information'], function () {
  gutil.beep();
  gutil.log( gutil.colors.green('Ding! Your new theme is ready, fresh out of the oven.') );
});


/** Helper function to return a capitalized string */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


/** Helper function to allow sprintf functionality */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


/** Helper function to reduce array to only unique entries */
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}