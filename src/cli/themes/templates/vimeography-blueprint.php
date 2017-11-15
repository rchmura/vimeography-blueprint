<?php
/*
Plugin Name: Vimeography Theme: <%= name.capitalize() %>
Plugin URI: https://vimeography.com/themes
Theme Name: <%= name.capitalize() %>
Theme URI:  <%= theme_uri %>
Version: 2.0
Description: <%= theme_description %>
Author: <%= author_name %>
Author URI: <%= author_uri %>
Copyright: <%= new Date().getFullYear() %> <%= author_name %>
*/

if ( ! class_exists('Vimeography_Themes_<%= name.capitalize() %>') ) {

  class Vimeography_Themes_<%= name.capitalize() %> {

    /**
     * The current version of this Vimeography theme.
     *
     * Make sure to specify it here as well as above
     * in the header metadata and in the readme.txt
     * file, located in the root of the plugin directory.
     *
     * @var string
     */
    public $version = '2.0';


    /**
     * The constructor is used to load the plugin
     * when the WordPress `plugins_loaded` hook is fired.
     *
     * This includes this theme in the Vimeography theme loader.
     */
    public function __construct() {
      add_action('plugins_loaded', array( $this, 'load_theme' ) );
    }


    /**
     * Has to be public so the wp actions can reach it.
     * @return [type] [description]
     */
    public function load_theme() {
      do_action('vimeography/load-addon-plugin', __FILE__);
    }

  }

  new Vimeography_Themes_<%= name.capitalize() %>;
}