# Fader

Fader is a lightweight, no-dependency fading carousel. Built using ES6 and compiled with Rollup and Buble. Fader aims to provide a lightweight and easy solution to image and HTML carousels. Should you wish to extend the functionality of Fader then please create a pull request.

[View demo](https://vizuaalog.github.io/FaderJS/demo.html)

# Why?

I'm aware that there are quite a few carousel and slider libraries. THey all seem to provide way too much functionality for what I need or depend on jQuery. In most cases I don't want / need jQuery and find it difficult to find a suitable, lightweight solution. So, I made one.

I haven't tested the browser compatability with this package, so please report any issues with modern and popular browsers.

# Installation

You can either install via the releases section on this repository. Alternativly use NPM or Bower.

```
npm install --save faderjs
```
*or*
```
bower install --save faderjs
```

# Usage

Start by including the script tag, either as part of your build workflow or at the end of your `body` tag.

```
<script src="path/to/fader.js"></script>
```

You then need to use the required markup, the containing element can be anything as long as a `ul` and `li` is used for the slides.

```
<div id="example">
    <ul>
        <li><h1>Slide 1</h1></li>
        <li><h1>Slide 2</h1></li>
        <li><h1>Slide 3</h1></li>
        <li><h1>Slide 4</h1></li>
    </ul>
</div>
```

Then instantiate a new Fader instance.

```html
var slider = new Fader('#example#', options);
```

# Options

Fader has some options to change how it behaves and the easing / timings used. These options are below.

| Option name    	| Description                                                                                                             	| Default     	| Type                              	|
|----------------	|-------------------------------------------------------------------------------------------------------------------------	|-------------	|-----------------------------------	|
| width          	| This is the width of the slider. The keyword 'full' is also allowed, which translates to 100%.                          	| 'full'      	| Number (String if 'full' is used) 	|
| height         	| This is the height of the slider. The keyword 'full' is also allowed, which translates to 100%.                         	| 400         	| Number (String if 'full' is used) 	|
| wait           	| The time to wait before transitioning to the next slide. This is in milliseconds.                                       	| 3000        	| Number                            	|
| transitionTime 	| The time the transition lasts between slides. This is in milliseconds.                                                  	| 500         	| Number                            	|
| ease           	| The easing method to use for the transition. This supports any CSS3 easing method supported by the transition property. 	| ease-in-out 	| String                            	|
| loop           	| Does the slider loop when it reaches the end?                                                                           	| false       	| Boolean                           	|
# Contributing
If you would like to contribute then please either create a bug report or a pull request. If your feature is suitable for the core and aim of this library, then it may be merged in.