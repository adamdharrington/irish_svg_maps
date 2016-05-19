(function(){
  var $svg = d3.select('#county_solids').selectAll('g'),
      data = {"Armagh":{"county":"Armagh", "province":"Ulster"}, "Carlow":{"county":"Carlow", "county town":"Carlow", "province":"Leinster"}, "Cavan":{"county":"Cavan", "county town":"Cavan", "province":"Ulster"}, "Clare":{"county":"Clare", "county town":"Ennis", "province":"Munster"}, "Cork":{"county":"Cork", "county town":"Cork", "province":"Munster"}, "Donegal":{"county":"Donegal", "county town":"Lifford","province":"Ulster"}, "Down":{"county":"Down", "county town":"Downpatrick", "province":"Ulster"}, "Dublin":{"county":"Dublin", "county town":"Dublin", "province":"Leinster"}, "Fermanagh":{"county":"Fermanagh", "county town":"Enniskillen","province":"Ulster"},"Galway":{"county":"Galway","county town":"Galway","province":"Connacht ", }, "Kerry":{"county":"Kerry","county town":"Tralee","province":"Munster"}},
      County = function(node){
        var name = node.id.substring(0,1).toUpperCase() 
          + node.id.substring(1);
        this.name = name;
      },
      counties = {};
  $svg.each(function(){
    var c = new County(this);
    this.data = data[c.name] || {};
    counties[c.name] = c;
  });
})();
mapper = (function(){
  var _map ={
        "x0":0,
        "x1":416,
        "y0":0,
        "y1":540
      },
      _geo = {
        "x0": -10.47821045,
        "x1":-5.4341125463,
        "y0":55.3767450343,
        "y1":51.443709624
      },
      MakePoint = function(lat,long){
        var w,h,x,y;
        if (lat > _geo.x0 && lat < _geo.x1) {
          w= Math.abs(_geo.x0 - _geo.x1); 
          x = _map.x1 * (Math.abs(_geo.x0- lat) /w );
        }
        if (long < _geo.y0 && long > _geo.y1) {
          h= Math.abs(_geo.y0 - _geo.y1); 
          y = _map.y1 * (Math.abs(_geo.y0 - long) /h );
        }
        return {
          x:x,
          y:y
        }
      };
  
  return{
    makePoint: function(x,y){return new MakePoint(x,y);}
  }
})();