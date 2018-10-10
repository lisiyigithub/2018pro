$(document).ready(function() {
  $('.introduction li').hover(function(){
    $(this).children().next().css('display','block');
  },function() {
    $(this).children().next().css('display','none');
  })
})  