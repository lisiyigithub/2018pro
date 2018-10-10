var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array("HTML5", "Javascript", "JAVA", "Python", "Android", "IOS", "Web" ,"Angular", "Vue", "React", "PHP", "ES8");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
        y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
        1500,
        function() {
            $i.remove();
        });
    });
});