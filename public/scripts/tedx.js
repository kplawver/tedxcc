var tedx = {
  nodes:[],
  bodyHeight:0,
  scrollHeight:0
};

tedx.init=function() {
  tedx.window = $(window);
  tedx.document = $(document);
	tedx.bios.init();
  tedx.toolBar.init();
  tedx.parallax.init();
  tedx.countdown();
  setTimeout("tedx.news.init()",3000);
}

tedx.toolBar={
  init:function() {
    tedx.toolBar.node = $("#main-navigation");
    tedx.toolBar.headerNode = $("#main-header");
    tedx.toolBar.headerHeight = tedx.toolBar.headerNode.height();
    setTimeout("tedx.toolBar.check()",250);
    tedx.toolBar.node.find('a').bind('click', function(e) {
      e.preventDefault();
      // destination = ($(this).attr('href') == '#speakers') ? 682 : $(this).attr('href') ;
      $.scrollTo($(this).attr('href'), 500);
    });
  },
  check:function() {
    if (tedx.window.scrollTop() > tedx.toolBar.headerHeight) {
      if (!tedx.toolBar.node.hasClass("fixed")) {
        tedx.toolBar.node.fadeOut("fast",function() {
          tedx.toolBar.node.addClass("fixed").fadeIn("fast");
          tedx.toolBar.node.find('.content').append('<a id="small_register" href="#registration"><img src="/images/register_small.png"></a>');
        })
      }
    } else {
      if (tedx.toolBar.node.hasClass("fixed")) {
        tedx.toolBar.node.fadeOut("fast",function() {
          tedx.toolBar.node.removeClass("fixed").fadeIn("fast");
          tedx.toolBar.node.find('#small_register').fadeOut("fast", function () {
            $('#small_register').remove();
          });
        })
      }
      
    }
    setTimeout("tedx.toolBar.check()",250);
  }
}

tedx.parallax={
  init:function() {
    var i,l=tedx.parallax.selectors.length;
    for (i=0;i<l;i++) {
      var node=$(tedx.parallax.selectors[i]),offset=node.offset();
			if (offset == null) {
				continue;
			}
			var initial_offset=offset.top+tedx.window.height()/2;
      node.css("background-position","50% "+initial_offset+"px");
      node.parallax("50%",initial_offset,0.2,true);
    }
  },
  selectors:["#about-header", "#program-header", "#thankyou-header"]
}

tedx.news={
  url: "http://blog.tedxcreativecoast.com/api/read/json?num=10&callback=tedx.news.cb",
  init:function() {
    tedx.addScript(tedx.news.url);
  },
  cb: function(data) {
    tedx.debug(data);
    if (data.posts && data.posts.length > 0) {
      var l=data.posts.length,out="",dest=$("#news > ul"),i,post,title,date,date_str;
      if (l > 5) {
        l = 6;
      }
      for (i=0;i<l;i++) {
        post = data.posts[i];
        title = post['regular-title'];
        date = new Date(post.date);
        date_str = ""+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
        if (title == undefined) {
          title = "Untitled";
        }
        out+="<li>"+date_str+": <a href=\""+post['url-with-slug']+"\">"+title+"</a></li>"
      }
      dest.html(out);
    }
  }
}

tedx.countdown=function() {
  var now=new Date(),then=new Date(2013,6-1,7), parent=$("#register"), node=parent.find("p.remaining-days span"),destination=$("#countdown");
  
  if (now >= then) {
    parent.hide()
  } else {
    $.countdown.setDefaults({
      description:"",
      labels:[],
      layout:'',
      compact:true
    });
    destination.countdown({until:new Date(2013,6-1,7),format:'D'});
    days = destination.countdown('getTimes')[3]
    node.text(days);
    destination.countdown('destroy')
  }
  
  
}

tedx.bios={
  modal_options:{
    close:true,
    escClose:true,
    overlayClose:true,
    focus:true,
    opacity:50,
    overlayCSS:"background:#000;",
    modal:true,
    closeClass:'modal-close',
    onOpen: function (dialog) {
      dialog.overlay.fadeIn('medium');
      dialog.container.fadeIn('medium');
      dialog.data.fadeIn('medium');
    },
    onClose:function(dialog) {
      dialog.container.fadeOut('medium');
      dialog.overlay.fadeOut('medium',function() {
        $.modal.close();
      });
    }
  }
}

tedx.bios.init=function() {
	$("div.speaker-bios").hide().append("<div class='clear'></div>");
	$(".learn-more").bind('click', function (e) {
    e.preventDefault();
    $.scrollTo($(this).attr('href'), 700);
  });
	var links = $("#speaker-headshot a"),n=links.length, i;
	for (i=0;i<n;i++) {
		link = $(links[i]);
		link.click(function(e) {
			tedx.bios.open($(e.currentTarget).attr("href"));
			return false;
		})
	}
	
}

tedx.bios.open=function(id) {
	$(id).modal(tedx.bios.modal_options);
}

tedx.addScript=function(src,callback) {
  var s=document.createElement("script");
	s.setAttribute("type","text/javascript");
	s.setAttribute("src",src);
	if (callback != null) {
	  s.setAttribute("onload",callback);
	}
	document.getElementsByTagName("head")[0].appendChild(s)
}

tedx.debug=function(msg) {
	try {
    console.log(msg);
	} catch(e) {
		/* ignore.  i don't care if there's an error. */
	}
}

// This will need to be fixed because it's... something.

function OnChange(dropdown)
{

//Clear all existing ticket fields if present
   var node = document.getElementById('createTextfields');
   while (node.hasChildNodes())
   {
   node.removeChild(node.firstChild);
   }


   var myindex  = dropdown.selectedIndex
   var SelValue = dropdown.options[myindex].value

   var out = "<ul>"

   for (var i=1;i<=SelValue;i++)
   {
        out+= "<li>" +"<label>Attendee #" + i + "</label><input type=text name='item_1_attend" + i + "ticketname' id='item_1_attend" + i + "ticketname' maxlength=50/><input type=hidden id='passback" + i + "' name='passsback" + i + "' value='item_1_attend" + i + "ticketname'/>" +
        "<label>Email</label><input type=text name='item_1_attend" + i + "xemail' id='item_1_attend" + i + "xemail' maxlength=75/><input type=hidden id='passback" + (i + 10) + "' name='passback" + (i + 10) + "' value='item_1_attend" + i + "xemail'/></li>";
   }
   
   out +="</ul>";
   
   $("#registration input.purchase-button").css("disply",'inline-block');
   
   node.innerHTML=out;



   document.getElementById('NumberOfTickets').value = SelValue;

}



function myFunction()
{
var grabNumberOfTickets;
grabNumberOfTickets = document.getElementById('NumberOfTickets').value;
alert("numberoftickets!" + grabNumberOfTickets );
}



function validateForm()
{

   if (document.getElementById('item_1_qty').selectedIndex == 0)
   {
       alert("Please select a ticket quantity");
       return false;
   }

   else
   {
       var grabNumberOfTickets;
       grabNumberOfTickets = document.getElementById('NumberOfTickets').value;

       for (var i = 1; i <= grabNumberOfTickets; i++)
       {
           var x = document.getElementById('item_1_attend' + i + 'ticketname').value;
           if (x == null || x == "")
           {
               alert("Attendee #" + i + " must be filled out.");
               return false;
           }

           var xemail = document.getElementById('item_1_attend' + i + 'xemail').value;
           if (xemail == null || xemail == "")
           {
               alert("Attendee #" + i + " email must be filled out.");
               return false;
           }


       }

   }

}


$(document).ready(function() {
  tedx.init();
})