// Adds a new image element with its attributes
function addObj(obj) 
    {
    var o = $("<"+obj.type+">");
    // img.attr("src", imgUrl);
    o.addClass(obj.class);
    if (obj.type === "p" || obj.type === "button")
       {
        o.text(obj.text);
       }
    for (var i = 0;i<obj.attr.length;i++)
     {
        o.attr(obj.attr[i].a, obj.attr[i].v);
     }
     return(o);
    }