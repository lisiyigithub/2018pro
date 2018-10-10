$(document).ready(function() {
  $('.nav_catalog').hover(function() {
    $('.catalog').css('display','block');
  },function() {
    $('.catalog').css('display','none');
  })

  $('.nav_subgrade').hover(function() {
    $('.subgrade').css('display','block');
  }, function() {
    $('.subgrade').css('display','none');
  })
})  