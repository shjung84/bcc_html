$(function(){
	fileInclude();	// File Include
	navAction();	// Nav
	pathAction();	// Path
	tabs();			// Tab
	addFile();
	addFileImg();
});

/* File Include */
function fileInclude(){
	$(".header").load("../../bcc/inc/inc_header.html");
	$(".footer").load("../../bcc/inc/inc_footer.html");
}

/* NAV */
function navAction(){
	var nav = $(".nav");
	var item = $(".nav__item",nav);
	var link = $(".nav__link",nav);
	var sub = $(".nav__sub",nav);
	var active = "active";
	var state = ".active";
	var current = ".current";
	item.each(function(){
		if($(this).is(current)){$(this).addClass(active);}
	});
	link.on("click",function(){
		var ths = $(this);
		var btn = ths.closest(item);
		if(btn.is(state)){
			btn.find(sub).slideUp(100,function(){
				btn.removeClass(active);
			});
		}else{
			item.removeClass(active);
			sub.slideUp(100);
			btn.find(sub).slideDown(100,function(){
				btn.addClass(active);
			});
		}
		if(ths.attr("href") === "#") return false;
	});
}

/* Path */
function pathAction(){
	var path = $(".path");
	var select = $(".path__select",path);
	var selected = $(".path__selected",path);
	var option = $(".path__option",path);
	var optionList = $(".path__option a",path);

	select.on("mouseenter", function(){
		$(this).find(option).stop().slideDown(200,function(){
			$(this).addClass("on");
		});
	}).on("mouseleave",function(){
		$(this).find(option).stop().slideUp(200,function(){
			$(this).removeClass("on");
		});
	})
	optionList.on("click",function(){
		var ths = $(this);
		var box = ths.closest(select);
		var opt = box.find(option);
		box.find(selected).text($(this).text());
		opt.stop().slideUp(100,function(){
			box.removeClass("on");
		});
	});
}

/* TAB */
function tabs(){
	var tabs = $(".tabs");
	var btn = $(".tabs__btn",tabs);
	var box = $(".tabs__contents",tabs);
	var act = "tabs--active";

	btn.on("click",function(){
		var idx = $(this).index();
		btn.eq(idx).addClass(act).siblings().removeClass(act);
		box.eq(idx).addClass(act).siblings().removeClass(act);
		return false;
	});
}

/* toggle list */
toggleList();
function toggleList(){
	var list =  $(".toggle__list");
	var item = $(".toggle__item",list);
	var btn = $(".toggle__btn",list);
	var board = $(".board__list",list);
	var active = "toggle--active";
	var state = ".toggle--active";

	btn.on("click",function(){
		var box = $(this).closest(item);
		if(box.is(state)){
			box.removeClass(active);
			box.find(board).slideUp(100);
		}else{
			item.removeClass(active);
			board.slideUp(100);
			box.addClass(active);
			box.find(board).slideDown(100);
		}
	});
}

/* POPUP */
function modalPopup(fileurl,popId){
	var body = $("body");
	if(!body.is(".modal")){body.append($("<div class='trplayer'></div>"))}
	if(!popId){popId = "modalPopup-01"}
	body.addClass("modal");
	body.append($("<div class='trplayerw' aria-pop-name="+popId+"></div>"));

	$(".trplayerw[aria-pop-name="+popId+"]").append($("<div class='pop__modal' aria-pop-name="+popId+"></div>"));
	$(".pop__modal[aria-pop-name="+popId+"]").load(fileurl,function(){
		var ths = $(this);
		var modalpopWidth = ths.width();
		var modalpopHeight = ths.height();
		ths.css("margin-left",-modalpopWidth/2+"px");
		ths.css("margin-top",-modalpopHeight/2+"px");

		function modalCssChange(width,height) {
			var width = parseInt(width);
			var height = parseInt(height);
			if(height < modalpopHeight){
				body.addClass("a-height");
			}else{
				body.removeClass("a-height");
			}
			if(width < modalpopWidth){
				body.addClass("a-width");
			}else{
				body.removeClass("a-width");
			}
		}
		$(function() {
			$(window).resize(function() {
				modalCssChange($(this).width(), $(this).height());
			}).resize();
		});
		modalHide();
	});
}
function modalHide(){
	var close = $("[aria-pop-close]");
	close.click(function(){
		var x = $(".trplayerw").length;
		if(x <= 1){
			$("body").removeClass("modal");
			$(".trplayer").remove();
		}
		$(this).closest(".trplayerw").remove();
	});
}

function addFile(){
	var file = $("[class^=input__set__file]");
	var btn = $("[class^=input__btn-del]",file);
	var text = $("[class^=input__file-name]",file);
	var target = $(".input__file-hidden",file);
	var active = "active";

	target.on("change",function(){
		var _file = $(this).closest(file);
		var _text = _file.find(text);
		if(window.FileReader){var fileName = $(this)[0].files[0].name;}
		_file.addClass(active);
		_text.text(fileName);
	});

	btn.on("click",function(){
		var _file = $(this).closest(file);
		var _text = _file.find(text);
		_file.removeClass(active);
		_text.text("");
	});
}

function addFileImg(){
	var imgTarget = $('.input__set__photo .input__file-hidden');
	var box = $("[aria-photobox]");
	imgTarget.on('change', function(){
		box.children('img').remove();
		if(window.FileReader){
			var reader = new FileReader();
			reader.onload = function(e){
				var src = e.target.result;
				box.prepend('<img src="'+src+'">');
			}
			reader.readAsDataURL($(this)[0].files[0]);
		}
	});
}

// S : ?????? : ?????? LNB ?????????
function depth(depth1,depth2,depth3){
	console.log(depth1,depth2,depth3)

	//Nav
	var nav = $(".nav");
	var _depth1 = $("[aria-depth="+depth1+"]",nav);
	var _depth2 = depth2 - 1;

	_depth1.addClass("active");
	_depth1.find(".nav__sub li").eq(_depth2).addClass("current");

	//Path
	var path = $(".path");
	var menuType = path.attr("aria-menutype");
	var depth_1_box = $("[aria-depth-01] .path__selected span",path);
	var depth_1_text ;
	var depth_2_box = $("[aria-depth-02] .path__selected span",path);
	var depth_2_text ;
	var depth_2_list = $("[aria-depth-02] .path__option ul",path);
	var depth_2_sub ;
	var depth_3_box = $("[aria-depth-03] .path__selected span",path);
	var depth_3_text ;

	if(menuType == 1){//?????????
		if(depth1 === 1){
			depth_1_text = "????????? ??????";
			if(depth2 === 1){
				depth_2_text = "CCTV ??????";
				if(depth3 === 2){
					depth_3_text = "??????";
				}else if(depth3 === 3){
					depth_3_text = "????????????";
				}

			}else if(depth2 === 2){
				depth_2_text = "???????????????";
			}
			depth_2_sub = [
				["CCTV ??????","../../bcc/cctv/list.html"],
				["???????????????","../../bcc/psystem/interlock.html"]
			]
		}else if(depth1 === 2){
			depth_1_text = "????????? ??????";
			if(depth2 === 1){
				depth_2_text = "?????? ??????";
				console.log(`depth_2_text : ${depth_2_text}, depth3 : ${depth3}`);

				if(depth3 === 2){
					depth_3_text = "????????? ??????";
				}else if(depth3 === 3){
					depth_3_text = "????????????";
				}

			}else if(depth2 === 2){
				depth_2_text = "?????? ?????? ??????";
			}else if(depth2 === 3){
				depth_2_text = "????????? ????????????";
			}else if(depth2 === 4){
				depth_2_text = "IP????????????";
			}else if(depth2 === 5){
				depth_2_text = "CCTV????????????";
			}else if(depth2 === 6){
				depth_2_text = "?????? ?????? ??????";
			}
			depth_2_sub = [
				["?????? ??????","../../bcc/adminMember/list.html"],
				["?????? ?????? ??????","../../bcc/adminMember/permission.html"],
				["????????? ????????????","../../bcc/adminMember/userhistory.html"],
				["IP????????????","../../bcc/adminMember/terminal.html"],
				["CCTV????????????","../../bcc/adminMember/cctvbounds.html"],
				["?????? ?????? ??????","../../bcc/adminMember/deleteperiod.html"]
			]
		}else if(depth1 === 3){
			depth_1_text = "?????? ??????";
			if(depth2 === 1){
				depth_2_text = "????????????";
			}else if(depth2 === 2){
				depth_2_text = "AI????????????";
			}
			depth_2_sub = [
				["????????????","../../bcc/statistics/register.html"],
				["AI????????????","../../bcc/statistics/analysis.html"]
			]
		}
	}else if(menuType == 2){//?????????
		if(depth1 === 1){
			depth_1_text = "????????? ??????";
			if(depth2 === 1){
				depth_2_text = "????????? ??????";
			}else if(depth2 === 2){
				depth_2_text = "????????? ??????";
			}else if(depth2 === 3){
				depth_2_text = "???????????? ????????????";
			}
			depth_2_sub = [
				["????????? ??????","../../bcc/confirmed/list.html"],
				["????????? ??????","../../bcc/confirmed/reg.html"],
				["???????????? ????????????","../../bcc/confirmed/end.html"]
			]
		}else if(depth1 === 2){
			depth_1_text = "????????? ??????";
			if(depth2 === 1){
				depth_2_text = "????????????";
			}
			depth_2_sub = [
				["????????????","../../bcc/contact/list.html"]
			]
		}else if(depth1 === 3){
			depth_1_text = "????????????";
			if(depth2 === 1){
				depth_2_text = "?????????????????? ??????";
			}else if(depth2 === 2){
				depth_2_text = "?????? ????????? ??????";
			}else if(depth2 === 3){
				depth_2_text = "???????????? ????????????";
			}
			depth_2_sub = [
				["?????????????????? ??????","../../bcc/infection/list.html"],
				["?????? ????????? ??????","../../bcc/infection/list_02.html"],
				["???????????? ????????????","../../bcc/infection/list_033.html"]
			]
		}else if(depth1 === 4){
			depth_1_text = "????????????";
			if(depth2 === 1){
				depth_2_text = "?????? ?????? ??????";
			}else if(depth2 === 2){
				depth_2_text = "CCTV ?????? ??????";
			}else if(depth2 === 3){
				depth_2_text = "?????? ?????? ??????";
			}else if(depth2 === 4){
				depth_2_text = "????????? ????????????";
			}
			depth_2_sub = [
				["?????? ?????? ??????","../../bcc/management/register.html"],
				["CCTV ?????? ??????","../../bcc/management/cctvbounds.html"],
				["?????? ?????? ??????","../../bcc/management/deleteperiod.html"],
				["????????? ????????????","../../bcc/management/userhistory.html"]
			]
		}
	}

	if(depth3){
		$("[aria-depth-03]").removeAttr("aria-hidden");
	}else{
		$("[aria-depth-03]").remove();
	}

	depth_1_box.html(depth_1_text);
	depth_2_box.html(depth_2_text);
	depth_3_box.html(depth_3_text);

	for (var i=0;i<depth_2_sub.length;i++){
		depth_2_list.append($("<li><a></a></li>"));
	}
	$.each(depth_2_sub,function(i,fn){
		depth_2_list.find("li:eq("+i+") a").text(fn[0]).attr("href",fn[1]);
	});
}
// E : ?????? LNB ?????????
