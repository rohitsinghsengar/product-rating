var productRating = (function(){
    
  function updateRating(node,rating){
  	var elem = node.childNodes;
      for(var i=0; i<elem.length; i++){
      	if(i<rating)
              elem[i].className="star";
          else
              elem[i].className="";
      }
  }
    
  function sendRatings(ratingNode,rating){
      var formData = new FormData(); 
      formData.append('productId', ratingNode.getAttribute('product-id'));
      formData.append('rating', rating);
  	  var req= new XMLHttpRequest();
      req.open("POST","https://xyz",true); //change according to your own site settings
      req.send(formData);
      req.onreadystatechange = function(){
      	if((4==req.readyState)&& (200==req.status)){
          	updateRating(ratingNode,rating);
          }
      }
  }
    
  function eventHandler(e){
  	var elem = e.target || e.srcElement;
      var elemParent = elem.parentElement;
      var k=0;
      while(elem = elem.previousSibling){
      	k++;
      }
      sendRatings(elemParent, k+1);
  }
    
	function init(){
  	var rNodes = document.getElementsByClassName("rating");
      for(var i=0;i<rNodes.length;i++){
      	rNodes[i].addEventListener('click',eventHandler);
      }  
  }
    
  function destroy(){
  	var rNodes = document.getElementsByClassName("rating");
      for(var i=0;i<rNodes.length;i++){
      	rNodes[i].removeEventListener('click',eventHandler);
      }
  }
    
	return {
  	init: init,
    destroy: destroy
  };
  
})();

productRating.init(); // to initialise ratings on all rating divs, call whenever page is fully loaded and other features are initialized
//productRating.destory(); // to remove event handlers from rating divs hence dis-abling the rating system
