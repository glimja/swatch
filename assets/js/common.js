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
		if($('.checkAll').prop('checked')){
			$("input[name=checkList]:checkbox").prop("checked", true);
			$(this).siblings("label").addClass("active");
		} else{
			$("input[name=checkList]:checkbox").prop("checked", false);
			$(this).siblings("label").removeClass("active");
		}
	});
}