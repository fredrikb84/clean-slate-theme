/*
    Sticky-kit v1.0.4 | WTFPL | Leaf Corcoran 2014 | http://leafo.net
*/
(function(){var b,m;b=window.jQuery;m=b(window);b.fn.stick_in_parent=function(e){var u,n,f,p,B,l,C;null==e&&(e={});p=e.sticky_class;u=e.inner_scrolling;f=e.parent;n=e.offset_top;null==n&&(n=0);null==f&&(f=void 0);null==u&&(u=!0);null==p&&(p="is_stuck");B=function(a,e,l,v,y,q,t){var r,z,k,w,c,d,A,x,g,h;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);d=a.parent();null!=f&&(d=d.closest(f));if(!d.length)throw"failed to find stick parent";r=k=!1;g=b("<div />");g.css("position",a.css("position"));A=function(){var c,
b;c=parseInt(d.css("border-top-width"),10);b=parseInt(d.css("padding-top"),10);e=parseInt(d.css("padding-bottom"),10);l=d.offset().top+c+b;v=d.height();c=k?(k=!1,r=!1,a.insertAfter(g).css({position:"",top:"",width:"",bottom:""}).removeClass(p),g.detach(),!0):void 0;y=a.offset().top-parseInt(a.css("margin-top"),10)-n;q=a.outerHeight(!0);t=a.css("float");g.css({width:a.outerWidth(!0),height:q,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":t});if(c)return h()};A();if(q!==v)return w=
void 0,c=n,h=function(){var b,h,s,f;s=m.scrollTop();null!=w&&(h=s-w);w=s;k?(f=s+q+c>v+l,r&&!f&&(r=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom")),s<y&&(k=!1,c=n,"left"!==t&&"right"!==t||a.insertAfter(g),g.detach(),b={position:"",width:"",top:""},a.css(b).removeClass(p).trigger("sticky_kit:unstick")),u&&(b=m.height(),q>b&&!r&&(c-=h,c=Math.max(b-q,c),c=Math.min(n,c),k&&a.css({top:c+"px"})))):s>y&&(k=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?
a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(p).after(g),"left"!==t&&"right"!==t||g.append(a),a.trigger("sticky_kit:stick"));if(k&&(null==f&&(f=s+q+c>v+l),!r&&f))return r=!0,"static"===d.css("position")&&d.css({position:"relative"}),a.css({position:"absolute",bottom:e,top:"auto"}).trigger("sticky_kit:bottom")},x=function(){A();return h()},z=function(){m.off("scroll",h);b(document.body).off("sticky_kit:recalc",x);a.off("sticky_kit:detach",z);a.removeData("sticky_kit");a.css({position:"",bottom:"",
top:""});d.position("position","");if(k)return a.insertAfter(g).removeClass(p),g.remove()},m.on("touchmove",h),m.on("scroll",h),m.on("resize",x),b(document.body).on("sticky_kit:recalc",x),a.on("sticky_kit:detach",z),setTimeout(h,0)}};l=0;for(C=this.length;l<C;l++)e=this[l],B(b(e));return this}}).call(this);

if ((typeof shop) == 'undefined') {
	var shop = {};
}
shop.queryParams = {};
if (location.search.length) {
  for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      shop.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}

/*
    Modal Functions (used in checkout, could also be used for an AJAX cart)
*/
function showModal(id) {
    $('#modal-overlay').attr('data-current-modal', id);
    $('#'+id).show();
    sizeModal(false);
    scrollTop();
    $(window).on('orientationchange', resizeWindow).on('resize', resizeWindow);
}
function hideModal() {
    $('.modal.is-visible').removeClass('is-visible').hide();
    $('body').removeClass('modal--visible');
    $('#modal-overlay').attr('data-current-modal', null);
    $(window).off('orientationchange', resizeWindow).off('resize', resizeWindow);
}
function resizeWindow() {
    sizeModal(true);
}
function sizeModal(isResizing) {
    var currentModalId = $('#modal-overlay').attr('data-current-modal');
    if (!isResizing) {
        $('#'+currentModalId).css('opacity', 0);
    }
    // Position modal by negative margin
    $('#'+currentModalId).css({
        'margin-left': - ($('#'+currentModalId).outerWidth() / 2),
        'opacity': 1
    });
    $('#'+currentModalId).addClass('is-visible');
    $('body').addClass('modal--visible');
}
function scrollTop() {
    if ($('body').scrollTop() > 0 || $('html').scrollTop() > 0) {
        $('html, body').animate({
            scrollTop: 0
        }, 250, 'swing');
    }
}

$(function() {
    
    /*
        Make order summary sticky on custom checkout and thank you page.
    */
    if (($('html.lt-ie9').length < 1) && ($(window).width() >= 769) && ($('.sticky').length > 0)) {
        //Don't make sticky if <IE9 or device is small
        $(window).on('load', function() {
            $('.sticky').stick_in_parent({
                'parent':$('#checkout-grid'),
                'offset_top':24 
            });
        })
    }

    var permalink = $('.social-sharing').attr('data-permalink');
    if ($('.share-facebook').length ) {
        $.getJSON('https://graph.facebook.com/?id=' + permalink + '&callback=?', function(data) {
            if (data.shares) {
                $('.share-facebook .share-count').text(data.shares).addClass('is-loaded');
            } else {
                $('.share-facebook .share-count').remove();
            }
        });
    };

    if ($('.share-twitter').length ) {
        $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + permalink + '&callback=?', function(data) {
            if (data.count > 0) {
                $('.share-twitter .share-count').text(data.count).addClass('is-loaded');
            } else {
                $('.share-twitter .share-count').remove();
            }
        });
    };

    if ($('.share-pinterest').length ) {
        $.getJSON('https://api.pinterest.com/v1/urls/count.json?url=' + permalink + '&callback=?', function(data) {
            if (data.count > 0) {
                $('.share-pinterest .share-count').text(data.count).addClass('is-loaded');
            } else {
                $('.share-pinterest .share-count').remove();
            }
        });
    };

    if ($('.share-google').length ) {
        $.getJSON('https://apps.pandacommerce.net/applications/app-social-discount/gplusshares.php?url='+permalink, function(data) {
            if (data.shares > 0) {
                $('.share-google').find('.share-count').text(data.shares).addClass('is-loaded');
            } else {
                $('.share-google .share-count').remove();
            }
        });
    }
    $('.social-sharing a').on('click', function(e) {
        e.preventDefault();
        var el = $(this),
            popup = el.attr('class').replace('-','_'),
            link = el.attr('href'),
            w = 700,
            h = 400;
    
        // Set popup sizes
        switch (popup) {
          case 'share-twitter':
            h = 300;
            break;
          case 'share-fancy':
            w = 480;
            h = 720;
            break;
          case 'share-google':
            w = 500;
            break;
        }
    
        window.open(link, popup, 'width=' + w + ', height=' + h);
    });
    
    
    //Make Youtube and Vimeo embeds responsive
    $('iframe[src*="youtube.com/embed"]').wrap('<div class="video-wrapper"></div>');
    $('iframe[src*="player.vimeo"]').wrap('<div class="video-wrapper"></div>');
    
    
    //Quantity Selector
    $('.quantity-selector').addClass('input-group-field').css({'border-radius':0}).wrap('<div class="input-group quantity-selector-wrapper"></div>');
    $('.quantity-selector').parent().prepend('<span class="input-group-btn"><a class="btn" data-type="minus">-</a></span>').append('<span class="input-group-btn"><a class="btn" data-type="plus">+</a></span>')
    
    $('.quantity-selector-wrapper .btn').on('click', function() {
        var input = $(this).parent().parent().find('input');
        var min = parseInt(input.attr('min'));
        var max = parseInt(input.attr('max'));
        
        if (isNaN(min)) {
            min = 1;
        }
        if (isNaN(max)) {
            max = null;
        }
        var newVal = parseInt(input.val());
        if ($(this).attr('data-type') == 'minus') {
            newVal--;
            if (newVal < min) {
                newVal = min;
            }
        }
        else {
            newVal++;
            if ((newVal > max) && (max !== null)) {
                newVal = max;
            }
        }
        input.val(newVal);
    });
    
    //Modal overlay
    $('<div/>', {
        'id':'modal-overlay'
    }).appendTo($('body')).on('click', hideModal);
    $('.modal .modal--content').prepend('<a class="modal--close"><i class="panda-icon-ui-close"></i></a>');
    $('.modal .modal--close').on('click', hideModal);
});