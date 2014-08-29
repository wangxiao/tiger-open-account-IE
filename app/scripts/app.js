define([
    'jquery'
], function (
    $
) {
    'use strict';

    // input 默认显示
    $('input').each(function(i, v) {
        var ele = $(v);
        var val = ele.attr('placeholder');
        if (val) {
            ele.val(val).addClass('placeholder');
            ele.one('click', function() {
                ele.val('').removeClass('placeholder');
            });
        }
    });

    $('#header-tabs').on('click', '.tab', function() {
        var ele = $(this);
        if (!ele.hasClass('current')) {
            ele.siblings().removeClass('current');
            ele.addClass('current');
            $('#part1').children('.content')
                        .removeClass('current')
                        .eq(ele.prevAll().length)
                        .addClass('current');
        }
    });
    

});