/**
 *  * Created by sogo on 9/24/14.
 *   */

$(document).ready(function(){
    $("li a").mouseover(function(){
        $("#botoomSheep").animate({
            right: '+=50'
        },1500).animate({
            right: '+=31'
        },1000).removeClass('flipped');
    });
    $("li a").mouseout(function(){
        $("#botoomSheep").animate({
            right: '-=30'
        },1000).animate({
            right: '-=50'
        },1500).addClass('flipped');
    });
});

$(function() {
    $( "#registrationForm" ).dialog({
        autoOpen: false,
        position: {my: 'top', at: 'top+130' },
        width:350,
        show: {
            effect: "fade",
            duration: 1000
        },
        closeOnEscape: false,
        beforeClose: function (event, ui) { return false; },
        dialogClass: "noclose",
        draggable: false
    });

    $( "#register" ).click(function() {
        $( "#registrationForm" ).dialog( "open" );
        $( "#contentBody").foggy();
        $( "#mainMenu").foggy();
        $( "#foot").foggy();
    });
});

$(function() {
    $( "#Datepicker" ).datepicker({
        dateFormat: 'yy-mm-dd', // 데이터는 yyyy-MM-dd로 나옴
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        closeText: '닫기',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        yearSuffix: '년',
        showOn: "both",
        changeYear: true,
        changeMonth: true,
        yearRange: 'c-55:c',
        showButtonPanel: true
    });
});
