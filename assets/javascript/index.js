$(document).ready(function(){

	jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},2000);
	});


		$("#welcome_section").show();

		$("#work").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#work_section").show();
		});

		$("#projects").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#projects_section").show();
		});

		$("#education").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#education_section").show();
		});

		$("#skills").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#skills_section").show();
		});

		$("#courses").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#courses_section").show();
		});

		$("#achievements").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#achievements_section").show();
		});


		$("#activities").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#activities_section").show();
		});

		$("#interests").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#interests_section").show();
		});

		$("#languages").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");

			$(".hide").hide();
			$("#languages_section").show();
		});


});