function reportMenu(node) {
  //alert('Node id ' + node.id);
  // build your menu depending on node id
  return {
    createItem : {
      "label" : "Ausgewählte Treffer markieren",
      "action" : function(obj) { /*this.create(obj); alert(obj.text())*/
      	alert(JSON.stringify(obj));
      },
      "_class" : "class"
    },
    renameItem : {
      "label" : "Alle Markierungen entfernen",
      "action" : function(obj) { this.rename(obj);}
    },
    deleteItem : {
      "label" : "Verdachtsanzeige erstellen",
      "action" : function(obj) { this.remove(obj); }
    }
  };  
}

$(function() {
  $("#jstree").jstree({
    plugins: ["grid", "checkbox", "dnd", "sort", "search"],
    'grid': {
      'columns': [{
        'header': 'Nodes'
      }, {
        'header': 'Price',
        'value': function(node) {
        	if (node.data) {
          	return node.data.price;
          }
        },
        format: function(value) {
          return value && "$" + value;
        }
      }, {
        'header': 'Price in cents',
        'value': function(node) {
        	if (node.data) {
          	return node.data.price * 100;
          }
        },
        format: function(value) {
          return value && value + "¢";
        }
      }]
    },
    'contextmenu':{
    	'items':reportMenu
    },
    'core': {

      'data': [{
        'text': 'Monitoring target',
        'icon': 'https://a.fsdn.com/allura/p/rfc5424syslogviewer/icon?1381471974?&w=90',
        'data': {},
        'state': {
          'opened': true
        },

        'children': [{
          'text': 'Issuer 1',
          'icon': 'http://www.dealstantra.com/wp-content/themes/CP/framework/img/icons/16s.png',
          'data': {},
          'state':{
          	'opened': false
          },
          'children':[{
            	'text': 'Entry 1',
              'icon': 'http://icocentre.com/Icons/f-target.png?size=16',
              'data':{'price':15}
            }]
        }, {
          'text': 'Issuer 2',
          'icon': 'http://www.dealstantra.com/wp-content/themes/CP/framework/img/icons/16s.png',
          'data': {},
          'children':[{
            	'text': 'Entry 2a',
              'icon': 'http://icocentre.com/Icons/f-target.png?size=16',
              'data':{'price':15}
            },{
            	'text': 'Entry 2b',
              'icon': 'http://icocentre.com/Icons/f-target.png?size=16',
              'data':{'price':28}
            }]
        },
        {
          'text': 'Issuer 3',
          'icon': 'http://www.dealstantra.com/wp-content/themes/CP/framework/img/icons/16s.png',
          'data': {},
          'children':[{
            	'text': 'Entry 3',
              'icon': 'http://icocentre.com/Icons/f-target.png?size=16',
              'data':{'price':15}
            }]
        }
        ]
      }]
    }
  });
  
  //add search functionality to the input fields
        $('#searchFields input').keyup(function (e) {
        	//get all input fields
          var inputFields = $('#searchFields input');
          searchValues = {};
          //create for each input a key value pair with the key in the name attribute of the input (also 		being the index of the column)
          inputFields.each(function(){
            var field = $(this);
            searchValues[field.attr('name')] = field.val();
          });
          //use the new searchColumn method
          $('#jstree').jstree(true).searchColumn(searchValues);
});
  
});
//var jstreeId = $("#j1_1_anchor").parent().attr("id");
var $treeview = $("#jstree");
//Provide arrays
var childNodesArr = [];
var curNodesIdArr = [];
var selLastNodes = [];

//Hide/Show appropriated nodes
$("button").on("click", function(){
	//alert($treeview.jstree().get_bottom_selected());
	if($(this).attr("id") == "selTreeBtn"){
  	//$treeview.jstree().deselect_all();
  	$treeview.jstree('open_all');
  	selLastNodes = [];
  	$.each($(".jstree-leaf"), function(){
    	$jstreeLastNode = $(this).children().next();
    	if($jstreeLastNode.hasClass("jstree-clicked")){
      	$jstreeLastNode.removeClass("jstree-clicked");
      } else{
      	$jstreeLastNode.addClass("jstree-clicked");
      }
      selLastNodes.push($(this).attr("id"));
       //if data-jstreegrid == j1_3 --> addClass("jstree-clicked")
    })
    //alert(JSON.stringify(selLastNodes));
    $.each(selLastNodes, function(index, value){
    	$.each($(".jstree-grid-cell"), function(){
        if($(this).attr("data-jstreegrid") == value){
        	//alert($(this).attr("class"));
          if($(this).hasClass("jstree-clicked")){
          	$(this).removeClass("jstree-clicked");
          }else{
          	$(this).addClass("jstree-clicked");
          }
        }
      });
    });
    //$treeview.jstree().select_all();
  }
	if($(this).hasClass("hide-node")){
     //open all nodes
    $("#jstree").jstree('open_all');

    //Get aria-level from clicked button
    var hideId = $(this).attr("id");
    var ariaLvl = hideId.slice(hideId.length-1, hideId.length);
    childNodesArr = [];
    curNodesIdArr = [];
    //iterate over toggled nodes
    $.each($("li"), function(){
      if($(this).attr("aria-level") == ariaLvl){
        curNodesIdArr.push($(this).parent().parent().attr("id"));
        //Check if appropriated node is hidden or visible and adjust margin from children
        if(!$(this).parent().prev().is(":hidden")){
          $(this).css({"margin-left":"0px"});
        } else{
          $(this).css({"margin-left":"24px"});
        }
        childNodesArr.push($(this).attr("id"));
      }
    })
    //iterate over child nodes
    $.each(childNodesArr, function(index, value){
      //insert child specific adjustments here
    });
    //Remove duplicate values from childNodesArr
    var uniqueCurNodesIdsArr = [];
    $.each(curNodesIdArr, function(i, el){
      if($.inArray(el, uniqueCurNodesIdsArr) === -1) uniqueCurNodesIdsArr.push(el);
    });
    var jstreeId = "";
    //toggle nodes
    $.each(uniqueCurNodesIdsArr, function(index, value){
      jstreeId = value;
      //alert(jstreeId);
      $("#"+jstreeId+"_anchor").prev().toggle();
      $("#"+jstreeId+"_anchor").toggle();
       $.each($(".jstree-grid-cell"), function(){
        if($(this).attr("data-jstreegrid") == jstreeId){
          //alert(jstreeId);
          //[id*=j1_1]
          $(this).toggle();
        }
      });
    })
    //Toggle appropriated jstree grid
  };
	
 
})
$("#markSelItems").on("click", function(){
	submitMe();
})
function submitMe(){ 
				//alert("mark selected items");
        //$("ul").each(function(){
        //get all selected nodes
        //alert($treeview.jstree().get_bottom_selected());
        var $markedTargets = $("#markedTargetsList");
        $markedTargets.empty();
        var checked_nodes = {}; 
        var checked_ids = [];
        $("a").each(function(){
        	if($(this).hasClass("jstree-clicked") && $(this).parent().hasClass("jstree-leaf")){
          	//alert($(this).parent().attr("id"));
            var selNodeId = $(this).parent().attr("id");
            var selNodeNam = $(this).parent().text();
            checked_ids.push(selNodeNam);
            checked_nodes[selNodeId] = selNodeNam;
          }
        });
        //alert(JSON.stringify(checked_nodes));
        var html = "";
        $.each(checked_nodes, function(index, value){
        	html+="<li id='"+index+"'class='markedItemsList'>"+value+"</li>"
        });
        $markedTargets.empty().append(html);
        
        	//$(".jstree-clicked").each(function(){
          	//alert($(this).id);
          //});
        	//if($(this).hasClass("jstree-children")){
          	//$(this).find(".jstree-clicked").each(function(){
            	//alert($(this).text());
            //})
          //}
        //});
        var ref = $("#jstree").jstree(true);
        var sel = ref.get_selected();
        //alert(JSON.stringify(sel));
        
        //$("#jstree").jstree("get_checked",null,true).each 
        		//alert("test");
          	//(function () { 
                //checked_ids.push(this.id); 
        		//}); 
           	//alert(JSON.stringify(checked_ids)); 
            
}
function markSel(){ 
				//alert("mark selected items");
        //$("ul").each(function(){
        //get all selected nodes
        var $markedTargets = $("#markedTargetsList");
        $markedTargets.empty();
        
            
}
$("#deselAll").on("click",{treeGrid:"jstree"}, function(event){
	//alert(event.target.tagName);
  //alert(event.data.foo);
  	//$("#jstree").find(".jstree-clicked").removeClass("jstree-clicked");
    $treeview.jstree().deselect_all();
    $(".jstree-grid-midwrapper").find(".jstree-clicked").removeClass("jstree-clicked");
    
});
$("#markedTargetsList").on("click",".markedItemsList", function(e){
	if(e.ctrlKey){
  	$(this).toggleClass("clickedEntry");
  }
	//alert($(this).html())
  else{
  	$(".markedItemsList").removeClass("clickedEntry");
  	$(this).toggleClass("clickedEntry");
  }
});
$("#deleteFromList").on("click", function(){
	$("#markedTargetsList li").each(function(e){
  	//alert($(this).prop("tagName"));
  	if($(this).hasClass("clickedEntry")){
    	$(this).remove();
    }
  });
});
$("#deleteAll").on("click", function(e){
	$("#markedTargetsList li").each(function(e){
  		$(this).remove();
  })
})
$("#selNodes").on("click", function(e){
 //$treeview.jstree().destroy();
 var selNodeArr = ["j1_5","j1_7"];
 $treeview.jstree().select_node(selNodeArr);
});
$("#testtest").on("click", function(){
	//alert($treeview.jstree().get_selected());
  var node17 = $treeview.jstree().get_node("j1_7");
  alert(JSON.stringify(node17));
  if($treeview.jstree().is_selected("j1_7")){
  	alert("j1_7 is selected");
  }
});
//Get all selected leafs of tree grid
$treeview.on('changed.jstree', function(e, data){
	selNodesAfterChange = data.selected;
	//alert("test");
  //alert(JSON.stringify(data));
  $.each($(".jstree-grid-cell"), function(){
  	$(this).removeClass("jstree-clicked");
  });
  $.each(data.selected, function(index, value){
  	//alert(value);
    $.each($(".jstree-grid-cell"), function(){
    		//$(this).removeClass("jstree-clicked");
        if($(this).attr("data-jstreegrid") == value){
        	//alert($(this).attr("class"));
          //if($(this).hasClass("jstree-clicked")){
          	//$(this).removeClass("jstree-clicked");
          //}else{
          	if($treeview.jstree().is_selected(value)){
            	$(this).addClass("jstree-clicked");
            } else{
            	$(this).removeClass("jstree-clicked");
            }
          	//$(this).addClass("jstree-clicked");
            //if(!$(this).hasClass("jstree-clicked")){
            
            //})
          //}
        }
      });
    if($treeview.jstree().is_leaf(value)){
    	//alert("Data of " + value + " is selected.");
    };
    //if($treeview.jstree().is_selected)
  });
  //alert(data.selected);

});
$("#open-all").on("click", function(){
	$treeview.jstree().open_all();
});
$("#close-all").on("click", function(){
	$treeview.jstree().close_all();
});
$("#open-all-sel").on("click", function(){

	var allLastNodes = [];
  $.each($(".jstree-node"), function(){
  	if($(this).hasClass("jstree-leaf")){
    	allLastNodes.push($(this).attr("id"));
    }
  });
  var hasSelEntryBoolean = "";
  $.each(allLastNodes, function(index, value){
  	var $nodeFirstChild = $("#"+value).parent().prev();
    if($nodeFirstChild.children().hasClass("jstree-undetermined")){
    	hasSelEntryBoolean = "true";
    }else{
    	hasSelEntryBoolean = "";
    }
  	//alert(value);
  	//var curLastNode = $treeview.jstree().get_node(value);
    if(!$treeview.jstree().is_selected(value) && !hasSelEntryBoolean){
    	var unselParentNode = $treeview.jstree().get_parent(value);
      //alert(unselParentNode);
      $treeview.jstree().close_node(unselParentNode);
    }
  });

	//Provide selected entry nodes
	var selBtmNodes = $treeview.jstree().get_bottom_selected();
  //Iterate over selected entry nodes and open parent nodes
  $.each(selBtmNodes, function(index, value){
  	var selBtmNodeFirstParent = $treeview.jstree().get_parent(value);
    var selBtmNodeSecondParent = $treeview.jstree().get_parent(selBtmNodeFirstParent);
    if(selBtmNodeFirstParent){
    	$treeview.jstree().open_node(selBtmNodeFirstParent);
    }
    if(selBtmNodeSecondParent){
    	$treeview.jstree().open_node(selBtmNodeSecondParent);
    } else{
    }
    
  });
  
  //$treeview.jstree().close_all();
  //$treeview.jstree().open_all();
  selLastNodes = [];
  $.each($(".jstree-node"), function(){
  	if(!$(this).hasClass("jstree-leaf")){
    	selLastNodes.push($(this).attr("id"));
    }
    //if data-jstreegrid == j1_3 --> addClass("jstree-clicked")
  })
  //alert(JSON.stringify(selLastNodes));
  $.each(selLastNodes, function(index, value){
    //$treeview.jstree().open_all();
  	var curNode = $treeview.jstree().get_node(value);
    if($treeview.jstree().is_selected(value)){
    	//alert($treeview.jstree().get_parent(value));
    }
    //alert($treeview.jstree()._nextSibling(curNode))
  	//if($treeview.jstree().is_parent(value) && $treeview.jstree().is_selected(value)){
    	//$treeview.jstree().open_node(value);
    //} else if(curNode.id == "j1_1"){
    	//alert("root");
      	//$treeview.jstree().open_node(value);
      //} else if($treeview.jstree().get_parent(value) && $treeview.jstree().is_selected(value)){
      	//$treeview.jstree().open_node(value);
      //} else{
      	//$treeview.jstree().close_node(value);
      //}
      
      
    	//curNode.children
      //if(curNode.id != "j1_1"){
       //if($treeview.jstree().is_selected(value)){
       		//var parentChecked = $treeview.jstree().get_parent(value);
          //alert(JSON.stringify(parentChecked));
          //if(parentChecked){
          
          //}else{
          	//$treeview.jstree().close_node(value);
          //}
       //}
      	
      //}
      
    //}
  });
});

