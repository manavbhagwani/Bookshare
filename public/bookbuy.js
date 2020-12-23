//parallax js
// $(document).ready(function(){
var x='<%=username%>';
// console.log(x)
  var $window = $(window);
    $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        });
    });
//});

if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
  document.querySelector(".navbar").classList.add("bg-primary");
}

// window.onscroll = function() {myFunction()};
//
// function myFunction() {
//   if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) {
//     console.log("hello");
//   }
//   else
//   {
//       console.log("hey")
//   }
// }

//menu transition js
//$(document).ready(function(){
  $(window).scroll(function(){
  	var scroll = $(window).scrollTop();
    	  if (scroll > 100) {
	    $(".navbar").addClass("navbar-scroll");
        }
    	  else{
		  $(".navbar").removeClass("navbar-scroll");
	  }
	  if (scroll > 200) {
	    $(".navbar").addClass("bg-primary");
	  }

	  else{
		  $(".navbar").removeClass("bg-primary");
	  }
  })
//})

async function getItem(){
    const res=await axios.get("downloads");
    // console.log(res.data);
    // <div class="card m-4 w18rem">
        // <img src=res.data[i].img class="card-img-top h350px">
        // <div class="card-body">
        //     <h5 class="card-title"><strong>res.data[i].title</strong></h5>
        //     <p class="card-text"><cite style="font-size:0.8em;">- res.data[i].author</cite></p>
        // </div>
        // <ul class="list-group list-group-flush">
        //     <li class="list-group-item">res.data[i].course</li>
        //     <li class="list-group-item">res.data[i].semester</li>
        //     <li class="list-group-item">res.data[i].branch</li>
        // </ul>
    // </div>
    const paren=document.querySelector(".floa");
    for(let i=res.data.length-1;i>=0;i--)
    {
        // let div=document.createElement("div");
        // div.classList.add("card");
        // div.classList.add("m-4");
        // div.classList.add("w18rem");
        // let imag=document.createElement("img");
        // imag.classList.add("card-img-top");
        // imag.classList.add("h350px");
        // imag.src=res.data[i].img;
        // div.appendChild(imag);
        // let innerdiv=document.createElement("div");
        // innerdiv.classList.add("card-body");
        // let h5=document.createElement("h5")
        // h5.classList.add("card-title");
        //
        // paren.appendChild(div);
        let div=document.createElement("div");
        div.classList.add("card");
        div.classList.add("m-4");
        div.classList.add("w18rem");
        div.innerHTML="<img src="+res.data[i].img.trim()+" class=\"card-img-top h350px\"><div class=\"card-body\"><h5 class=\"card-title\"><strong>"+res.data[i].title.trim()+" </strong></h5><p class=\"card-text\"> <cite style=\"font-size:0.8em;\">-"+res.data[i].author.trim()+"  </cite></p></div><ul class=\"list-group list-group-flush\"><li class=\"list-group-item\">"+res.data[i].course.trim()+" </li><li class=\"list-group-item\">"+res.data[i].semester.trim()+" </li><li class=\"list-group-item\">"+res.data[i].branch.trim()+" </li></ul>"
        paren.appendChild(div);
    }
    const sb=document.querySelector("#search");
    var crd=document.querySelectorAll(".w18rem");
    var prom=document.querySelector(".prom")
    let coun=0;
    sb.addEventListener("keyup",(e)=>{
        let flag=false;
        // console.log(sb.value);
        for(let i=0;i<res.data.length;i++)
        {
            // console.log(crd[i].textContent.toLowerCase());
            if(!crd[i].textContent.toLowerCase().includes(sb.value.toLowerCase().trim()))
                crd[i].classList.add("togg");
            else if(crd[i].classList.contains("togg"))
            {
                if(!prom.classList.contains("togg"))
                    document.querySelector(".prom").classList.add("togg");
                crd[i].classList.remove("togg");
                flag=true;
            }
            else
            {
                if(!prom.classList.contains("togg"))
                    document.querySelector(".prom").classList.add("togg");
                flag=true;
            }
        }
        if(!flag)
            prom.classList.remove("togg");
    });
}
getItem();
