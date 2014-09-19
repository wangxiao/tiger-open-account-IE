define([
    'jquery'
], function (
    $
) {
    'use strict';

    function checkCN(str) {
        var reg = /^[\u4e00-\u9fa5]+$/g;
        return reg.test(str);
    }

    function getBrokerId() {
        var absUrl = location.href;
        var brokerId = '';
        if (/broker_id/.test(absUrl)) {
            var result = absUrl.match('broker_id=(.*)');
            if (result.length >= 2) {
                brokerId = result[1];
                window.localStorage.setItem('brokerId', brokerId);
            }
        } else {
            brokerId = window.localStorage.getItem('brokerId');
        }
        if (brokerId) {
            $('#brokerId').val(brokerId);
        }
        if (brokerId) {
            brokerId = $('#brokerId').val();
        }
        return brokerId;
    }

    getBrokerId();

    function getSourceCode() {
        var absUrl = location.href;
        var sourceCode = '';
        if (/source_code/.test(absUrl)) {
            sourceCode = absUrl.match('source_code=(.*)')[1];
            window.localStorage.setItem('sourceCode', sourceCode);
        } else {
            sourceCode = window.localStorage.getItem('sourceCode');
        }
        return sourceCode;
    }

    $('#index-btn').on('click', function() {
        var name = $('#index-nameCn').val();
        var mobile = $('#index-mobile').val();
        if (name) {
            window.localStorage.setItem('nameCn', name);
        }
        if (mobile) {
            window.localStorage.setItem('mobile', mobile);
        }
    });

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

    (function() {
        var name = window.localStorage.getItem('nameCn');
        var mobile = window.localStorage.getItem('mobile');
        if (name) {
            $('#nameCn').val(name);
        }
        if (mobile) {
            $('#phone').val(mobile);
        }
    })();

    function checkNameCn() {
        var val = $('#nameCn').val();
        if (!val || !checkCN(val)) {
            $(this).siblings('.error').addClass('show');
            return false;
        } else {
            $(this).siblings('.error').removeClass('show');
            return true;
        }
    }

    // function checkNameEn() {
    //     var val = $(this).val();
    //     if (!val || /[^A-Z|a-z]+/g.test(val)) {
    //         $(this).siblings('.error').addClass('show');
    //         return false;
    //     } else {
    //         $(this).siblings('.error').removeClass('show');
    //         return true;
    //     }
    // }

    function checkPhone() {
        var ele = $('#phone');
        var val = ele.val();
        if (!val || /\D/g.test(val)) {
            ele.siblings('.error').addClass('show');
            return false;
        } else {
            ele.siblings('.error').removeClass('show');
            return true;
        }
    }

    function checkEmail() {
        var ele = $('#email');
        var val = ele.val();
        if (!val || !/@/g.test(val) || !/@.+?\..+/g.test(val)) {
            ele.siblings('.error').addClass('show');
            return false;
        } else {
            ele.siblings('.error').removeClass('show');
            return true;
        }
    }

    function checkIdValue() {
        var ele = $('#id-value');
        var val = ele.val();
        if (!val) {
            ele.siblings('.error').addClass('show');
            return false;
        } else {
            ele.siblings('.error').removeClass('show');
            return true;
        }        
    }

    function checkIssueDepart() {
        var ele = $('#issueDepart');
        var val = ele.val();
        if (!val) {
            ele.siblings('.error').addClass('show');
            return false;
        } else {
            ele.siblings('.error').removeClass('show');
            return true;
        }
    }

    function checkAddress() {
        var ele = $('#address');
        var val = ele.val();
        if (!val) {
            ele.siblings('.error').addClass('show');
            return false;
        } else {
            ele.siblings('.error').removeClass('show');
            return true;
        }        
    }

    function checkSendAddress() {
        var ele = $('#sendAddress');
        var val = ele.val();
        if (!val) {
            ele.siblings('.error').addClass('show');
            return false;
        } else {
            ele.siblings('.error').removeClass('show');
            return true;
        }
    }

    $('#nameCn').on('blur', checkNameCn);
    // $('#nameEn').on('blur', checkNameEn);
    $('#phone').on('blur', checkPhone);
    $('#email').on('blur', checkEmail);
    $('#id-value').on('blur', checkIdValue);
    $('#issueDepart').on('blur', checkIssueDepart);
    $('#address').on('blur', checkAddress);
    $('#sendAddress').on('blur', checkSendAddress);

    var i, l;
    for (i = 1960, l = 2010; i <= l ; i++ ) {
        $('#years').append('<option value="' + i + '">' + i + '</option>');
    }

    for (i = 1, l = 12; i <= l ; i++ ) {
        if (i < 10) {
            i = '0' + i;
        }
        $('#months').append('<option value="'+ i +'">'+ i +'</option>');
    }

    for (i = 1, l = 31; i <= l ; i++ ) {
        if (i < 10) {
            i = '0' + i;
        }
        $('#days').append('<option value="'+i+'">'+i+'</option>');
    }

    $('#application-form-btn').on('click', function() {
        if (checkNameCn() && 
            checkPhone() && 
            checkEmail() && 
            checkIdValue() && 
            checkIssueDepart() &&
            checkAddress() && 
            checkSendAddress()) {
            var obj = {
                nameCn: $('#nameCn').val(),
                nameEn: String($('#nameEnXing').val() + ' ' + $('#nameEnMing').val()).toUpperCase(),
                mobile: $('#phone').val(),
                email: $('#email').val(),
                // 0 只开证券账户，1 只开期货账户， 2 两个都开。
                accountType: 0,
                country: $('#country').val(),
                // 证件类型
                idKind: $('#id-kind').val(),
                idValue: $('#id-value').val(),
                // 签发机构，xxx 公安局
                issueDepart: $('#issueDepart').val(),
                // 0 男，1 女，2 其他
                sex: 0,
                birthday: $('#years').val() + '-' + $('#months').val() + '-' + $('#days').val(),
                // 就业状况
                employment: $('#employment').val(),
                // 常住地址
                address: $('#address').val(),
                // 通讯地址
                sendAddress: $('#sendAddress').val(),
                brokerId: getBrokerId(),
                sourceCode: getSourceCode()
            };
            if ($('#uiIsSecurity').prop('checked') && $('#uiIsFutures').prop('checked')) {
                obj.accountType = 2;
            } else if ($('#uiIsSecurity').prop('checked') && !$('#uiIsFutures').prop('checked')) {
                obj.accountType = 0;
            } else if (!$('#uiIsSecurity').prop('checked') && $('#uiIsFutures').prop('checked')) {
                obj.accountType = 1;
            }
            if ($('#uiMale').prop('checked')) {
                obj.sex = 0;
            } else {
                obj.sex = 1;
            }
            $('#application-form').hide();
            $('#witness-form').show();
            $(window).scrollTop(0);
            $.post('/account/register_detailed', obj, function(data) {
                if (data.code !== 0) {
                    alert('开户失败，请重试！');
                    $('#application-form').show();
                    $('#witness-form').hide();
                }
            });
        }
    });

});