var lin=document.getElementById('output').src;
var loadFile = function(event)
{
    var output = document.getElementById('output');
    try{
        output.src = URL.createObjectURL(event.target.files[0]);
    }catch(error)
    {
        return;
    }
    output.onload = function()
    {
        URL.revokeObjectURL(output.src) // free memory
    }
};

var btt=document.querySelector("#bt");
btt.addEventListener("click",()=>{
    if(!document.getElementById('output').src.includes("technology-icons-2.png"))
        document.getElementById('output').src=lin;
})


$(document).on("keydown", "form", function(event) {
    return event.key != "Enter";
});

(function ( $ ) {
	var elActive = '';
    $.fn.selectCF = function( options ) {

        // option
        var settings = $.extend({
            color: "#FFF", // color
            backgroundColor: "grey", // background
			change: function( ){ }, // event change
        }, options );

        return this.each(function(){

			var selectParent = $(this);
				list = [],
				html = '';

			//parameter CSS
			var width = $(selectParent).width();

			$(selectParent).hide();
			if( $(selectParent).children('option').length == 0 ){ return; }
			$(selectParent).children('option').each(function(){
				if( $(this).is(':selected') ){ s = 1; title = $(this).text(); }else{ s = 0; }
				list.push({
					value: $(this).attr('value'),
					text: $(this).text(),
					selected: s,
				})
			})

			// style
			var style = " background: "+settings.backgroundColor+"; color: "+settings.color+" ";

			html += "<ul class='selectCF'>";
			html += 	"<li>";
			html += 		"<span class='arrowCF ion-chevron-right' style='"+style+"'></span>";
			html += 		"<span class='titleCF' style='"+style+"; width:"+width+"px'>"+title+"</span>";
			html += 		"<span class='searchCF' style='"+style+"; width:"+width+"px'><input style='color:"+settings.color+"' /></span>";
			html += 		"<ul>";
			$.each(list, function(k, v){ s = (v.selected == 1)? "selected":"";
			html += 			"<li value="+v.value+" class='"+s+"'>"+v.text+"</li>";})
			html += 		"</ul>";
			html += 	"</li>";
			html += "</ul>";
			$(selectParent).after(html);
			var customSelect = $(this).next('ul.selectCF'); // add Html
			var seachEl = $(this).next('ul.selectCF').children('li').children('.searchCF');
			var seachElOption = $(this).next('ul.selectCF').children('li').children('ul').children('li');
			var seachElInput = $(this).next('ul.selectCF').children('li').children('.searchCF').children('input');

			// handle active select
			$(customSelect).unbind('click').bind('click',function(e){
				e.stopPropagation();
				if($(this).hasClass('onCF')){
					elActive = '';
					$(this).removeClass('onCF');
					$(this).removeClass('searchActive'); $(seachElInput).val('');
					$(seachElOption).show();
				}else{
					if(elActive != ''){
						$(elActive).removeClass('onCF');
						$(elActive).removeClass('searchActive'); $(seachElInput).val('');
						$(seachElOption).show();
					}
					elActive = $(this);
					$(this).addClass('onCF');
					$(seachEl).children('input').focus();
				}
			})

			// handle choose option
			var optionSelect = $(customSelect).children('li').children('ul').children('li');
			$(optionSelect).bind('click', function(e){
				var value = $(this).attr('value');
				if( $(this).hasClass('selected') ){
					//
				}else{
					$(optionSelect).removeClass('selected');
					$(this).addClass('selected');
					$(customSelect).children('li').children('.titleCF').html($(this).html());
					$(selectParent).val(value);
					settings.change.call(selectParent); // call event change
				}
			})

			// handle search
			$(seachEl).children('input').bind('keyup', function(e){
				var value = $(this).val();
				if( value ){
					$(customSelect).addClass('searchActive');
					$(seachElOption).each(function(){
						if( $(this).text().search(new RegExp(value, "i")) < 0 ) {
							// not item
							$(this).fadeOut();
						}else{
							// have item
							$(this).fadeIn();
						}
					})
				}else{
					$(customSelect).removeClass('searchActive');
					$(seachElOption).fadeIn();
				}
			})

		});
    };
	$(document).click(function(){
		if(elActive != ''){
			$(elActive).removeClass('onCF');
			$(elActive).removeClass('searchActive');
		}
	})
}( jQuery ));

$(function(){
  var event_change = $('#event-change');
  $( ".select" ).selectCF({
    change: function(){
      var value = $(this).val();
      var text = $(this).children('option:selected').html();
      //console.log(value+' : '+text);
      event_change.html(value+' : '+text);
    }
  });
  $( ".test" ).selectCF({
    color: "#FFF",
    backgroundColor: "#663052",
  });
})


// const res=await axios.post("/signup",{
//     name:document.querySelector("#name").value,
//     regno:document.querySelector("#regno").value,
//     mobno:document.querySelector("#mobno").value,
//     email:document.querySelector("#email").value,
//     password:document.querySelector("#password").value
// });

var curr=0;
btn=document.querySelector(".btn-block");
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    var formData = new FormData();
    var imagefile = document.querySelector('input[type=file]');
    formData.append("myImage", imagefile.files[0]);
    formData.append("title",document.querySelector("#title").value);
    formData.append("course",document.querySelector("#course").value);
    formData.append("author",document.querySelector("#author").value);
    formData.append("branch",document.querySelectorAll(".titleCF")[0].textContent);
    formData.append("semester",document.querySelectorAll(".titleCF")[1].textContent);
    async function send(){
    const res=await axios.post('booksell', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
     console.log(res.data);
    document.querySelectorAll(".selectCF")[0].addEventListener("click",clearspan);
    document.querySelectorAll(".selectCF")[1].addEventListener("click",clearspan);
    if(res.data=="Image Only!" && curr!=1)
    {
        curr=1;
        let field=document.querySelector(".fieldimg");
        span=document.createElement("div");
        span.textContent="Format accepted : jpeg/jpg/png/gif" ;
        span.classList.add("removeimg");
        span.classList.add("mt-2");
        field.appendChild(span);
    }
    else if(res.data=="Add an image" && curr!=2)
    {
        curr=2;
        let field=document.querySelector(".fieldimg");
        span=document.createElement("div");
        span.textContent="Fill in the required field";
        span.classList.add("removeimg");
        span.classList.add("mt-2");
        field.appendChild(span);
    }
    else if(res.data=="1" && curr!=3)
    {
        curr=3;
        let field=document.querySelector(".line1");
        addmsg(field);
    }
    else if(res.data=="2" && curr!=3)
    {
        curr=3;
        let field=document.querySelector(".line2");
        addmsg(field);
    }
    else if(res.data=="3" && curr!=5)
    {
        curr=5;
        let field=document.querySelector(".line3");
        addmsg(field);span.classList.add("remove");
        span.classList.add("mt-2");curr=1;
        field.parentElement.appendChild(span);
    }
    else if(res.data=="4" && curr!=6)
    {
        curr=6;
        let field=document.querySelector(".line4");
        span=document.createElement("div");
        span.textContent="Select the appropriate Branch";
        span.classList.add("remove");
        span.classList.add("rm");
        span.classList.add("mt-2");
        field.appendChild(span);
    }
    else if(res.data=="5" && curr!=7)
    {
        curr=7;
        let field=document.querySelector(".line4");
        span=document.createElement("div");
        span.textContent="Select the appropriate Semester";
        span.classList.add("remove");
        span.classList.add("rm");
        span.classList.add("mt-2");
        field.appendChild(span);
    }
    else if(res.data=="successful")
    {
        btn.remove();
        pop=document.querySelector(".prompthidden");
        blurr=document.querySelector(".blurinsert");
        pop.classList.remove("prompthidden");
        blurr.classList.remove("blurinsert");
        pop.classList.add("prompt");
        blurr.classList.add("blur");
        document.addEventListener("click",()=>{
            window.location.reload();
        });
    }
    }
    send();
})
function addmsg(field){
    span=document.createElement("div");
    span.textContent="Fill in the required field";
    span.classList.add("remove");
    span.classList.add("mt-2");
    field.parentElement.appendChild(span);
}
const ael=document.querySelectorAll("input");
for(let i=0;i<ael.length;i++)
    ael[i].addEventListener("click",clearscreen);
function clearscreen()
{
    curr=0;
    var arr=document.querySelectorAll(".remove");
    var err=document.querySelectorAll(".removeimg");
    for(let i=0;i<arr.length;i++)
        arr[i].remove();
    for(let i=0;i<err.length;i++)
        err[i].remove();
}
function clearspan(){
    curr=0;
    if(document.querySelector(".rm"))
        document.querySelector(".rm").remove();
}
