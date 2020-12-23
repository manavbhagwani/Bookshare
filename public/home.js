window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".navbar").classList.add("navbarscroll");
  }
  else
  {
      document.querySelector(".navbar").classList.remove("navbarscroll");
  }
}
if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
  document.querySelector(".navbar").classList.add("navbarscroll");
}
