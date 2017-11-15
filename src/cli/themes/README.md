= Vimeography Layout Template =
Vimeography uses several different conventions to keep themes consistent and easier to debug:

* All themes use the PHP implementation of Mustache, which allows for simple, logic-less templating.
* Any images unique to a theme should be placed inside `assets/img`
* Any javascript plugins unique to a theme should be placed inside `assets/js`
* Any stylesheets unique to a theme should be placed inside a folder called "assets" and titled "vimeography-[your-theme-name].css"
* All themes must use fitvids.js to provide support for responsive videos.
* Themes must use ![http://kenwheeler.github.io/slick/](slick.js) for any slideshow presentations.
* Themes must use ![https://github.com/fancyapps/fancyBox](fancybox.js) for any galleries using a modal window.
* Themes must be encapsulated in a class containing the theme name, which defines a unique namespace for the gallery.

== Using the Vimeo embed code ==

In order to make embedding a video easy, Vimeography provides a helper utility to retrieve
a video's embed code. You can pass this utility function a video's Vimeo link, and it will
give you back an XHR object. By using jQuery's `done()` method, you can get the
embed code for that video returned from the request like so:

  var promise = vimeography.utilities.get_video( $(this).data('link') );

  promise.done(function (video) {
    $gallery.find('.vimeography-player').html(video.html);
  });

== Identifying the video iframe ==

You may decide that you want your theme to be able to interact with the Vimeo
Javascript API, which allows for control of the Vimeo player module. Vimeography
generates an ID for each video iframe before making the request to retrieve
the embed code, so that the Javascript API is aware of which iframe in the DOM
it should be looking for.

Before you insert this embed code into the DOM, we need to add this ID to the
iframe that was returned, since Vimeo doesn't automatically do this for us.
This will allow you to interact with the video player.

    video.html = vimeography.utilities.set_video_id(video.html);


== Displaying a video's information in the theme ==

Any video data that you choose to display should be contained inside of
an element with the class `.vimeography-info`


== Featured Videos ==

To show a featured video (ie. the first video that displays on pageload),
use the {{#featured}} iterator. If the user has set a featured video,
it will show here. Otherwise, it will show the first video returned
from Vimeo in the dataset.

== Writing custom Javascript for your theme ==
Any custom Javascript code must be written inside of this template file.

This will allow you to utilize the gallery ID provided by the theme's PHP
file and its children selectors to target the correct gallery. This is
to prevent undesired interaction if a user is displaying several
galleries on the same page in Wordpress.


== Using video data in Javascript ==

Vimeo provides a plethora of data about the videos that
are being retrieved by Vimeography. This makes for an
infinite amount of possibilities of how to style your
theme and utilize this data - the only limit is your
creativity.

To use this data inside of any Javascript code, you'll
typically need to retrieve it from an element located
inside of the DOM. Vimeography follows a convention,
using the HTML5 data attributes to store data about
a video. You should only store data about a video within
these attributes, which are typically placed on the video's
thumbnails or name links.

== Available Video Data ==

All of the possible values to use can be found at
https://developer.vimeo.com/api/docs/responses#video

These are some of the more common parameters:

{{name}}              = Name of the video
{{link}}              = Video ID
{{{description}}}     = The description of the video
{{thumbnail_small}}   = URL to a small version of the video thumbnail
{{thumbnail_medium}}  = URL to a medium version of the video thumbnail
{{thumbnail_large}}   = URL to a large version of the video thumbnail
{{thumbnail_huge}}    = URL to a hi-res version of the video thumbnail

== Example DOM Structure ==

- #vimeography-gallery-{{gallery_id}}.vimeography-[your-theme-name]
  - .vimeography-main
    - .vimeography-player
    - .vimeography-info

  - .vimeography-thumbnails
    - .vimeography-thumbnail-container
      - .vimeography-thumbnail

  - .vimeography-template



= Vimeography Theme // Mustache Videos Template =

The `videos.mustache` partial is used to render a DOM element for each video in the dataset.

This is most commonly used to display video thumbnails that allow the viewer
to choose which video they would like to watch, but you can access any of the data
associated with the video here. Be creative!

== Available Video Data ==
= @link https://developer.vimeo.com/api/docs/responses#video =




= Vimeography Paging Template =

This partial will only be loaded if the user has Vimeography Pro installed.

== What does it do? ==
This template allows you to extend the capabilities of your Vimeography theme by adding pagination controls and scripts.

There are a lot of conventions to follow in this template, all of which are described below.

* Each paging control (first/previous/next/last) must have the class `vimeography-paging` and a class describing which page we're heading towards with that control.
    `vimeography-first-page`
    `vimeography-previous-page`
    `vimeography-next-page`
    `vimeography-last-page`

* If displaying the number of the current page the user is viewing, wrap it in an element with the class `vimeography-page-number`