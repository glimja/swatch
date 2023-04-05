/* ==============================
ver : 1.00
============================== */



/***********************************************
	* onload
	* 화면 로드 후 onload 함수 실행
************************************************/


$(function(){
	//개발단 화면 로드후 실행
	onload();
});


/***********************************************
	* 온로드 실행 함수
************************************************/
function onload(){
	__fn_toggleBtn();
    __fn_levelOpenBtn();
    __fn_levelCloseBtn();
    __fn_chkboxAll();
	__fn_chkAllWeek();
}

// 버튼 토글
function __fn_toggleBtn() {
	var $target = $('.btnToggle');
	$target.each(function () {
		$(this).off().on('click', function (event) {
			$target.removeClass("active");
			// 이벤트 버블링 방지
			event.stopPropagation();
			$(this).toggleClass('active')
		})
	});
}

// 조직관리 : 부서관리 : 등록 Level 열기
function __fn_levelOpenBtn() {
	var $target = $('.btnLevelOpen');
	$target.each(function () {
		$(this).off().on('click', function (event) {
			// 이벤트 버블링 방지
			event.stopPropagation();
			$(this).parent().siblings().find(".btnLevelOpentarget").addClass('active');
		})
	});
}

// 조직관리 : 부서관리 : 등록 Level 닫기
function __fn_levelCloseBtn() {
    var $target = $(".btnLevelClose");
    $target.each(function(){
        $(this).off().on('click', function(event){
			// 이벤트 버블링 방지
			event.stopPropagation();
            $(this).parent().parent(".btnLevelOpentarget").removeClass('active');
        })
    });
}

// 전체 선택
function __fn_chkboxAll(){
	$('.checkAll').on('click', function(){
		if($('#checkAll').prop('checked')){
			$("input[name=checkAll]:checkbox").prop("checked", true);
			$(this).siblings("label").addClass("active");
		} else{
			$("input[name=checkAll]:checkbox").prop("checked", false);
			$(this).siblings("label").removeClass("active");
		}
	});
}

// 전체 요일 선택
function __fn_chkAllWeek(){
	$("input[name=chkAllWeek]").click(function(){
		var checkYn = $("input[name=chkAllWeek]").prop("checked");
		if(checkYn){
			$("input[name$=SendYn]").each(function(item, index){
				$(this).prop("checked", true);
			});
		}else{
			$("input[name$=SendYn]").each(function(item, index){
				$(this).prop("checked", false);
			});
		}
	});
}

function setDatepicker(obj) {
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		showMonthAfterYear: true,
		changeYear: false,
		changeMonth: false,
		showOn: "both",
		buttonText: "날짜선택",
		yearSuffix: '.',
		monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		/*
		//주말 비활성
		beforeShowDay: function(date){
			var day = date.getDay();
			return [(day != 0 && day != 6)];
		},
		*/
		//maxDate: 0, //오늘이후날짜 비활성
		//minDate: 0, //오늘이전날짜 비활성
	});
	$('#' + obj + '').datepicker();
	
	$('.openDatePicker').datepicker();

	$(".dateNotBefore").datepicker({
		minDate: 0,
	});
	$(".dateNotNext").datepicker({
		maxDate: 0,
	});

	//일간
	$('#searchDt, #searchStartDt, #searchEndDt, #searchDate').datepicker({
		format: "yyyy-mm-dd",
		autoclose: true,
	});
	//월간
	$( "#searchYyyyMm" ).datepicker({
		format: "yyyy-mm",
		startView: "months", 
		minViewMode: "months",
		autoclose: true,
	});

	
	// 긴급연락망 추가 클릭
	fn__addTblObjAdd();
	function fn__addTblObjAdd(){
	  var $trigger = $(".addTblObjAdd"),
		  $target = $(".tbldeladdTarget tbody");

	  $trigger.on("click", function(){
		$target.each(function(){
		  var lengthTr = $(this).find("tr").length;
		  
		  $(this).append(
			$("<tr>" +
				"<th scope='row'>" + (++lengthTr)  + "</th>" +
				"<td>" + "이름" + "</td>" +
				"<td>" + "0000000000" + "</td>" +
				"<td>" + "<button type='button' class='btn btn-outline-danger btn-sm addTblObjDel addDel'>삭제</button>" + "</td>" +
			  "</tr>")
		  );
		}); 
		fn_addDel()
	  })
	}

	// 긴급연락망 삭제 클릭
	fn__addTblObjDel();
	function fn__addTblObjDel(){
	  var $trigger = $(".addTblObjDel"),
		  $target = $(".tbldeladdTarget tbody");
	  
	  $trigger.on("click", function(){
		$(this).parent().parent().remove();
		
		$target.find("tr").each(function(idx){
		  $(this).find("th").text(++idx);            
		});
	  })
	}
	
	// 긴급연락망 추가 생성후 삭제 클릭
	function fn_addDel(){
	  var $trigger = $(".addDel"),
		  $target = $(".tbldeladdTarget tbody");

	  $trigger.on("click", function(){
		$(this).parent().parent().remove();

		$target.find("tr").each(function(idx){
		  $(this).find("th").text(++idx);
		});
	  })
	}
}

// today
function fn__date() {
	var today = new Date(),
		weeks = new Array('일', '월', '화', '수', '목', '금', '토');
		year = today.getFullYear(), "년",
		month = today.getMonth() + 1, "월",
		date = today.getDate(), "일",
		ymd = year + '.' + month + '.' + date + ' ' + weeks[today.getDay()] + "요일";				
	$('.fn_date').append("<span>" + ymd + "</span>");
}fn__date();

// time
function fn__time() {
	var now = new Date(),
		hours = now.getHours(),
		minutes = now.getMinutes(),
		seconds = now.getSeconds();
		hms = hours + ':' + minutes + ':' + seconds;
	$('.fn_time').text(hms);
}fn__time();
setInterval(fn__time, 1000);