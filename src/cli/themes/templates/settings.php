<?php

/**
 * The `$settings` configuration variable is an array that contains all of the
 * configurable settings for this theme. Each setting is an array of its own,
 * containing each of the following key/value pairs:
 *
 * 'type'
 * The UI control to render for the current setting.
 * Possible values include 'colorpicker', 'slider', 'numeric', or 'visibility'.
 *
 * 'label'
 * The i18n-compatible label for this particular setting.
 *
 * 'id'
 * An arbitrary identifier string to associate with the UI control's form field.
 *
 * 'value'
 * The default CSS value for this setting.
 *
 * 'pro'
 * Whether or not this setting requires the Vimeography Pro plugin to
 * be installed. TRUE if `type` is 'colorpicker', otherwise FALSE.
 *
 * 'namespace'
 * Whether or not the DOM element being targeted by the CSS is a child of the
 * vimeography-gallery-{{gallery_id}} container. Usually TRUE, unless your theme
 * uses a fancybox plugin, in which case, the modal window is outside of the container
 * element, so FALSE would be appropriate.
 *
 * 'properties'
 * Defines which CSS selectors and properties that the setting will control.
 * An array of one or more arrays, with each array containing two key/value pairs:
 *
 *   - `target` defines the CSS selector that the setting will affect
 *
 *   - `attribute` defines the CSS property that this setting will
 *      control for the corresponding target selector.
 *
 * 'expressions' - optional
 * Defines additional CSS selectors and properties that the setting will control,
 * but this time, relatively manipulating the value before associating it with the
 * selector. This is useful if you have two selectors whose values are linked and
 * change relative to one another (widescreen image ratios, margins etc.)
 *
 * An array of one or more arrays, which each array containing four key/value pairs:
 *
 *   - `target` defines the CSS selector that the setting will affect
 *
 *   - `attribute` defines the CSS property that this setting will
 *      control for the target selector.
 *
 *   - `operator` defines the symbol(s) to use for the mathmatical operation to perform
 *      on the original setting value.
 *
 *   - `value` is the input integer which acts as the addend, subtrahend, divisor, multiplier etc.
 *      to the original setting value.
 *
 * 'important' - optional
 * If set to TRUE, the CSS rule will be saved with an `!important` flag.
 *
 * 'min' - optional [required if `type` is 'slider' or 'numeric']
 * The minimum value that a CSS property can be set.
 *
 * 'max' - optional [required if `type` is 'slider' or 'numeric']
 * The maximum value that a CSS property can be set.
 *
 * 'step' - optional [required if `type` is 'slider' or 'numeric']
 * The increment/decrement value of the UI control.
 *
 * @var array
 */
$settings = array(
  array(
    'type'       => 'colorpicker',
    'label'      => __('Thumbnail Background Color'),
    'id'         => 'thumbnail-background-color',
    'value'      => '#4c4c4c',
    'pro'        => FALSE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail-container a', 'attribute' => 'backgroundColor'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Video Title Color'),
    'id'         => 'video-title-color',
    'value'      => '#f4f4f4',
    'pro'        => FALSE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail-container span', 'attribute' => 'color'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Paging Control Color'),
    'id'         => 'paging-control-color',
    'value'      => '#f4f4f4',
    'pro'        => TRUE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-paging-controls a', 'attribute' => 'color'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Paging Control Text Color'),
    'id'         => 'paging-control-text-color',
    'value'      => '#222222',
    'pro'        => TRUE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-paging-controls > span', 'attribute' => 'color'),
      )
  ),
  array(
    'type'       => 'colorpicker',
    'label'      => __('Paging Loader Color'),
    'id'         => 'loader-color',
    'value'      => '#000000',
    'pro'        => TRUE,
    'namespace'  => TRUE,
    'important'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-spinner div div', 'attribute' => 'backgroundColor'),
      )
  ),
  array(
    'type'       => 'slider',
    'label'      => __('Thumbnail Box Size'),
    'id'         => 'thumbnail-box-size',
    'value'      => '130',
    'min'        => '100',
    'max'        => '300',
    'step'       => '10',
    'pro'        => TRUE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail-container', 'attribute' => 'width'),
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail-container a', 'attribute' => 'width'),
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail-container a', 'attribute' => 'height'),
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail', 'attribute' => 'width'),
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail', 'attribute' => 'height'),
      ),
    'expressions' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail img', 'attribute' => 'maxWidth', 'operator' => '*', 'value' => '1.77'),
      )
  ),
  array(
    'type'       => 'numeric',
    'label'      => __('Thumbnail Spacing'),
    'id'         => 'thumbnail-spacing',
    'value'      => '5',
    'min'        => '5',
    'max'        => '20',
    'step'       => '1',
    'pro'        => TRUE,
    'namespace'  => TRUE,
    'properties' =>
      array(
        array('target' => '.vimeography-<%= name.toLowerCase() %> .vimeography-thumbnail-container', 'attribute' => 'margin'),
      )
  ),
);