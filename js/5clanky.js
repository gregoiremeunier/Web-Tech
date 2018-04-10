



var server="wt.kpi.fei.tuke.sk";

 $.getJSON("http://"+server+"/api/article/", function(data) {
    var template = $('#personTpl').html();
    var html = Mustache.to_html(template, data);
    $('#sampleArea').html(html);
});