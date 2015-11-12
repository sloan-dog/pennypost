var overlay;
var modal;

document.addEventListener('DOMContentLoaded', function(event){

// TWEENMAX / TIMELINE MAX OPTIONS AND CONFIG~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// timeline max

    var tmax_options = {
        delay: 0.25, // initial pause time
        repeat: -1, //make it repeat
        repeatDelay: 0.25, //delay this amount on repeat
        yoyo: true //play sequence in reverse
    }


    var tmax_tl = new TimelineMax(tmax_options);

    var svg_length = document.querySelectorAll('.sea-horse > polygon').length,
        svg_shapes = [],
        stagger_val = 2,
        duration = 3;
        seaHorse = document.querySelector('.sea-horse');
        stuff = document.querySelector('section#stuff');
        body = document.getElementsByTagName('body');

    for (var i = 1; i <= svg_length;i+=1) {
      svg_shapes.push( document.querySelector('svg.sea-horse > polygon:nth-of-type('+ i +')') );
    }

    // this bit links up timelinemax and the sv_shapes
    // tmax_tl.staggerFromTo(svg_shapes, duration, stagger_opts_from, stagger_opts_to, stagger_val, 0);


    // TWEENS


    // IM GOING TO SPLIT UP THE POLYS INTO 4 sets to assign random animations to)
    var set1 = [],
        set2 =[],
        set3=[],
        set4=[],
        set5=[],
        set6=[];

    for(var i = 0;i < svg_length;i+=4){
        set1.push(svg_shapes[i])
        set2.push(svg_shapes[i+1])
        set3.push(svg_shapes[i+2])
        set4.push(svg_shapes[i+3])
    }

    var svg_groups = [set1,set2,set3,set4];

    var scrollMagicController = new ScrollMagic.Controller();

    var stagger_opts_from = {
      css: {
        scale: 1,
        transformOrigin: 'center center',
        opacity: 1
      },
      ease: Elastic.easeInOut,
      force3D: true
    };

    var stagger_opts_to = {
      css: {
        scale: 0,
        opacity: 0,
      },
      ease: Elastic.easeInOut,
      force3D: true
    };


    // var tween = TweenMax.staggerFromTo(svg_shapes, 10,
    //     stagger_opts_from,
    //     stagger_opts_to,
    //     0.1
    // );


    // split polys into sets



    var exp_dur = 3;

    // var explode1 = TweenMax.staggerTo(set1,exp_dur,
    //     {
    //         css:{x:-50,y:50,rotationZ:180,opacity:0},
    //         ease: Elastic.easeInOut,
    //         force3D: true
    //     },
    //     0.5,
    //     0
    // );

    // var explode2 = TweenMax.staggerTo(set2,exp_dur,
    //     {
    //         css:{x:-50,y:-50},
    //         ease: Elastic.easeInOut,
    //         force3D: true
    //     },
    //     0.5,
    //     0
    // );

    // var explode3 = TweenMax.staggerTo(set3,exp_dur,
    //     {
    //         css:{x:-50,y:50,rotationZ:-180,rotationX:56},
    //         ease: Elastic.easeInOut,
    //         force3D: true
    //     },
    //     0.5,
    //     0
    // )

    // var explode4 = TweenMax.staggerTo(set4,exp_dur,
    //     // {x:'-500%',y:'-390%',rotationZ:-360}
    //     {
    //         css:{z:50,x:50,y:-50,rotationZ:-130,rotationX:200},
    //         ease: Elastic.easeInOut,
    //         force3D: true
    //     },
    //     0.5,
    //     0
    // )

    var xR0 = -100,
        xR1 = 100,
        yR0 = -100,
        yR1 = 100,
        zR0 = -100,
        zR1 = 100;

    function getRandArb(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandCd(){
        return {
            x:getRandArb(xR0,xR1),
            y:getRandArb(yR0,yR1),
            z:getRandArb(zR0,zR1)
        }
    }

    svg_groups.forEach(function(set,index){
        window['tl_max_group' + index] = new TimelineMax()

            var allTweens = []
        set.forEach(function(poly){
            var offset = getRandCd();
            x = offset.x
            y = offset.y
            z = offset.z
            var polyTween = TweenMax.fromTo(poly,3,
            {
                css: {
                    transformPerspective:200,
                    opacity:1
                },
                force3D:true
            },
            {
                css: {
                    opacity:0,
                    scale:Math.random(-1,1)*3,
                    x:x,
                    y:y,
                    z:z,
                    rotationX:x,
                    rotationY:y*5,
                    rotationZ:z*5
                }
            },
            0)
            allTweens.push(polyTween)
        })
            window['tl_max_group' + index].add(allTweens)
    })


    var helloEl = document.querySelector('#hello');
    var goodbyeEl = document.querySelector('#goodbye')

    var helloGoodbye= new TimelineMax()

    helloGoodbye
        .to(goodbyeEl,2,{css:{scale:2,opacity:1}})
        .to(goodbyeEl,2,{css:{opacity:0}})
        .to(helloEl,5,{css:{scale:2,opacity:1}})
        .to(helloEl,5,{css:{opacity:0}})

    var bodyTween = TweenMax.fromTo(body,5,
        {backgroundColor:'#152124'},
        {backgroundColor:'white'},
        0
    );

    //GOODBYE TWEENS

    var tmax_t2 =  new TimelineMax()
    tmax_t2.add([
        bodyTween,
        helloGoodbye,
        tl_max_group0,
        tl_max_group1,
        tl_max_group2,
        tl_max_group3
    ])

    function switchSvg(e) {
        if (e.type == 'enter') {
            stuff.style.display='';
        } else {
            stuff.style.display='none'
        }
    }


  // Create the Scene and trigger when visible
  var scene = new ScrollMagic.Scene({
    triggerElement: stuff,
    duration: 1000,
    offset:window.innerHeight/2 + 40
  })
  .setTween(tmax_t2)
  .setPin(stuff)
  // .on('leave',function(e){
  //   var spacer = document.querySelector('.scrollmagic-pin-spacer')
  //   if(e.type='leave') {
  //       spacer.style.display='none';
  //   } else {
  //       spacer.style.display='';
  //   }

  // })
  .addTo(scrollMagicController);

  var navFade = new ScrollMagic.Scene({
    triggerElement: stuff,
    duration: 600,
    offset: 300
  })

  // Add debug indicators fixed on right side
   // scene.addIndicators();

    // END TWEENMAX/TIMELINEMAX CONFIG ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // GET ELEMENT POSITION including IE <9 offsets

    function getOffsetPos(el){
        // Get an enclosing rectangle
        el = document.querySelector(el)
        var box = el.getBoundingClientRect()
        var body = document.body;
        var docEl = document.documentElement;

        // calc page scroll
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

        // get IE < 9 page shift
        var clientTop = docEl.clientTop || body.clientTop || 0
        var clientLeft = docEl.clientLeft || body.clientLeft || 0

        // combine everything
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;


        return {
            top: Math.round(top),
            left: Math.round(left)
        }

    }

    getOffsetPos('svg')


    // END ELEMENT POSITION STUFF

    // SCROLL STUFF ~~~~~~~~~~~~~~~~~~~~~~~~
    var scrolling = {

        scrollCds: [],
        getScroll: function(element){
            this.scrollCds[0] = element.scrollTop;
            this.scrollCds[1] = element.scrollLeft;
        },
        logScroll: function(){

        }

    }

    document.addEventListener('scroll',function(){
        scrolling.getScroll(document.body);
        // scrolling.logScroll();
    })



    // END SCROLL STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var measures = [];
    measures.push(
        {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        },
        {
            documentHeight: document.getElementsByTagName('body')[0].clientHeight,
            documentWidth: document.getElementsByTagName('body')[0].clientWidth,
        }
    )



    // MODAL STUFF
    // var e = document.getElementById('inner-modal');
    // var prefix = ['webkit','moz','MS','o',''];
    // var added = [false,false]

    // overlay = function() {
    //     modal = document.getElementById('modal-overlay');
    //     if (modal.style.visibility == 'visible') {
    //         modal.classList.add('dismiss-modal')
    //         // modal.style.visibility = 'hidden';

    //         if(added[0]==false) {
    //             modal.addEventListener('animationend', function(e){
    //                 modal.classList.remove('dismiss-modal')
    //                 modal.style.visibility = 'hidden';
    //
    //             }, false);
    //         }
    //         added[0]=true;
    //         this.removeEventListener('animationend',this,false)
    //     } else {
    //         if(added[1]==false){
    //             modal.style.visibility = 'visible';
    //             modal.classList.add('transition-in')
    //             modal.addEventListener('animationend', function(e){
    //                 modal.classList.remove('transition-in')
    //
    //             }, false);
    //         }
    //         added[1]=true;
    //         modal.removeEventListener('animationend',this,false)
    //     }
    //
    // }

    // prevent default nav behavior
    var navlinks = document.getElementsByClassName('nav-link');
    // navlinks is kindof an array but really an object with number keys (node list)...so yah
    for(index in navlinks){
        if (parseInt(index) % 1 === 0) {
            navlinks[index].addEventListener('click',function(e){
                e.preventDefault()
            },false)
        }

    }


    // overlay();
    // END MODAL STUFF
// END OF DOM LOAD EVENT LISTENER BLOCK ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})







