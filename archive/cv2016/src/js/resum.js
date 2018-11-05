function resizeHandler(e) {
    var sections = document.getElementsByTagName('section');
    for(var i = 0 ; i++; i < sections.length){
        sections.item(i).style.css.height = window.height;
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    resizeHandler(e);
    document.getElementById('burger').addEventListener('click', function(){
        document.getElementById('tabs').classList.toggle('active')
    });
});
window.addEventListener('resize', resizeHandler);