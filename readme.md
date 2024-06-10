Client Site: Room to Roam Records





save for later:

header {
  width: 95%; 
  height: 100dvh;
  display: grid;
  grid-template: 100%/100%;
  margin-bottom: 0px;
}
      header>.logo { width: 100%; grid-area: 1/1/1/1; margin:0; padding:0;border:0;} /*use grid to overlap the imgs by forcing into the same grid space*/
        /*@media screen and (max-width: 850px){
          header>.logo {height: 20vw;}
        }*/
      
      header>div {display: flex;justify-content: center; aspect-ratio: 1350/638;} /*aspect ratio set to match roots img so they stay the same size overlayed on eachother when the viewport changes*/
      #roots {z-index: 1; height: 70dvh; max-width: 100%;}
      #tree {
        flex:none; aspect-ratio: 370/317; height: 70dvh; max-width: 100%; z-index: 2;
        transition: transform .5s ease-in-out;
        /*TODO: input a growth transition CSS animation here*/ 
      }
      #tree:hover {
        transform: scale(1.2) translateY(-5%); /*translate added to offset the growth of the tree to make sure the roots still look connected*/
      } 

              h1{position: relative; height: 25dvh; top: 35dvh; left:3%; font-size: 9vw}


TODO NOTES:

1. TODO - general: 
    - prefers-reduced-motion media query on nav menu -  fix so opacity transition actually works and translate 
    transition actually stops happening
    - set up prefers-reduced-motion accessibility feature for tree logo transformation transition and swirl animation disabling as well
    -pixelation issue on highlight background when scaled down viewport width - see screenshot in room to roam notes folder
        possible issue/fix:
        https://css-tricks.com/forums/topic/scaling-down-images-with-css-makes-them-blurry/
    - consider a loading screen on first visit or landing page overlay on the home screen or something of that sort, as the highlight image is also going to take a couple seconds to load so it's not just a matter of the jquery animations
        - possible fix - hide all elements like large images and jquery animations until the page is loaded, with a css transition animation or some similar quick to load effect as sort of the page loading animation - see https://therecordcompany.net/ (all elements hidden until fully loaded) 
            see this site for the CSS transition on load: https://stackoverflow.com/questions/6805482/css3-transition-animation-on-load
        - possible fix: simply hide the page on a delay until everything is ready: https://stackoverflow.com/questions/9550760/hide-page-until-everything-is-loaded-advanced
            ex: https://www.therecordco.org/
        - https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
    - remove unused files once site is done (swirl2 js files and image bank most likely won't be used)

    - before publishing the site, change imagePath back to proper format on scripts (currently has /RoomToRoam the start of the path to appease the github pages file structure)

    - look into SEO plugin: Yoast SEO plugin v22.7 - https://yoast.com/wordpress/plugins/seo/ 
        as used on both record sites above




2. TODO - jqeury:
    - make documentation for jquery animation files and existing documention notes from swirljqueryanimation.js to this readme instead 
    - explain formula for converting FPS to const timePerFrame = animationDuration / totalFrames; 
    - download copy of jquery to site directory rather than using the google API hosting link as its source 
        (https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js)
    - test and document standardized method of styling and positioning the jquery img src animation
        (should be a simple matter of styling the src img)
    -multiple jquery animations at once: works if you simply surround each script with an IIFE
        https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    - change starting frame: not on <img src=""> element, that just determines what image shows as the place holder while the page/script loads.. to determine the starting frame of the animation, in the script change let frameNumber1 = #; where # is the starting frame number



RESEARCH NOTES:


- STARTEST - CSS opacity and visibility transition animation using star background img and star img overlayed 
    - https://stackoverflow.com/questions/8449933/how-to-transition-css-display-opacity-properties
        for opacity transition
            - HOVER EFFECT TRANSITION LOOKS GREAT FOR ANOTHER USE SOMEWHERE ON THE SITE (like purposely have the animation only flicker the stars when something on the site is clicked/hovered over-maybe use for a review article read more link or something like that)
    - animation-iteration-count: infinite;
        for looping/automatic keyframe animation

- JQUERY STUTTER ISSUE ON FIRST TIME LOADING OF THE SITE (only the first few seconds) .. also a smaller stutter occurs when switching tabs and switching back
    - find way to delay jquery scripts from executing the animation (requestAnimationFrame(step);) until after all images from the asset folder have been cached/loaded - will prevent an initial stutter that shows up in the animation when it first starts 
        test1: cause of stutter is not with image cache as stutter happens on the first time a script is used even when its cache of imgs is shared with an already used/cached different script
            result: this is some type of loading issue with the script itself not the image base
        test2: reset cache to see when the stutter stops
            result: cache and cookie reset didn't bring the stutter back..?
        possible solutions?:
            - visibly hide img element/animation until the animation has run through all the way one time? if that is what causes the stutter? or just for a couple seconds of it running.. not sure.. but once it's run, it doesn't seem to ever be an issue again.
            - no solution needed? this is definitely low priority for now.. maybe test with a hover effect to start the animation to see if that changes things
                HOVER test: set one animation to hover and republished the site
                    -hover on first time use will stutter only if hover is done in the first few seconds (around 4-5) of loading the page
                    -hover start of animation after the first time has no stutter
                        RESULT:
                            - TIME is the issue here. Hovering over the animation for the first time does not cause it to stutter as long as you wait a few seconds before doing it on the first time accessing the site. So this is a matter of simply waiting a few seconds on the first loading of the page

                            POSSIBLE FIX: have something UX/UI related that prevents you from seeing/starting (where applicable) the animation on your first time using the site 
                                perhaps if no cache/cookies of the site are detected/first time visit to the 
  TODO>>                        site, (page as well? test later when multiple pages are up)
                                then play a greeting animation or loading animation at the start of loading the page, or pull up a welcome image that can be closed out of or closes itself (CSS animation)... just make sure it's something that doesn't poorly impact UX

  TODO- PREFERRED FIX:          POSSIBLE FIX 2: delay start of animation by a few seconds if page is loaded 
                                for the first time/no cookies/cache is detected
                                - this could be better on UX/UI as the user wouldn't even notice this
                                - if it's a hover animation or any other type of user activated animation start then the only time it wouldn't work would be the first couple seconds, the first time they ever use the site, so they'd be very unlikely to notice or be bothered by the delay, as by the time they know it's supposed to animate, they'll have the cookies/cache already and the delay won't be activated
                                - if it's a window on load animation or other automatic activated animation, then will need to have some transition into it to make it look natural when creating the animation itself (starting keyframe should be set to a part of the animation is minimally active) so it can ease into the animation
  TODO- tab change stutter      ALSO  .. also a smaller stutter occurs when switching tabs and switching back
                                so need to figure out if this needs a fix and if so what fix would work for it and work well with POSSIBLE FIX 2 above (ideally one thing to fix both, but a separate fix for each issue is fine if necessary)
                                        




        