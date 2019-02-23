//If the session storage variables are not defined, define them
try{
	var cost=Number(sessionStorage.getItem("cost"));
	var shoppingCart=JSON.parse(sessionStorage.getItem("shoppingCart"));
	var funds=Number(sessionStorage.getItem("funds"));
	if(!shoppingCart) throw "Cost, Cart, and Funds now defined.";
}
catch(error){
	var cost=0;
	var shoppingCart=[];
	var funds=800;
	sessionStorage.setItem("funds",funds);
	console.log(error);
}

let items=[];
const item=function(title,summary,price){
	this.title=title,
	this.summary=summary,
	this.price=price,
	items.push(this);
}

const plant=new item('Plant','A green cactus','20');
const shoe=new item('Shoe','A sports shoe','120');
const blanket=new item('Blanket','A soft and warm blanket','23');
const tv=new item('TV','An LCD flatscreen','180');
const fan=new item('Fan','An electric powered fan','10');
const baseball=new item('Baseball','A regulation size baseball','5');



window.onload=function(){
	
	//Update funds and define elements that will be hidden or shown according to cart
	document.getElementById('money').innerHTML="Funds: $"+funds;
	const cartCountIcon=document.getElementById('cartCount');
	const checkoutBuyBtn=document.getElementById('buyBtn');
	toggleCountIcon();
	toggleBuyButton();

	function addItem(item){
		cost+=Number(item.price);
		sessionStorage.setItem("cost", cost);
		shoppingCart.push(item);
		sessionStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
		toggleCountIcon();
	}

	//Click Event Listeners for buy buttons
	$('#Plant > .buy').click(function(){addItem(plant)});
	$('#Shoe > .buy').click(function(){addItem(shoe)});
	$('#Blanket > .buy').click(function(){addItem(blanket)});
	$('#TV > .buy').click(function(){addItem(tv)});
	$('#Fan > .buy').click(function(){addItem(fan)});
	$('#Baseball > .buy').click(function(){addItem(baseball)});
	//And the final purchase buy button
	$('#buyBtn').click(buy);


	function removeItem(item){
		cost-=Number(item.price);
		sessionStorage.setItem("cost", cost);
		shoppingCart.splice(shoppingCart.indexOf(item),1);
		sessionStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
		document.getElementById("cost").innerHTML="Cost: $"+cost;
		toggleCountIcon();
		toggleBuyButton();
	}

	function buy(){
		if(cost<=funds){
			funds=funds-cost;
			cost=0;
			document.getElementById('money').innerHTML="Funds: $"+funds;
			document.getElementById('cost').innerHTML="Cost: $"+cost;
			$('#items div').remove();
			sessionStorage.setItem("cost", cost);
			shoppingCart=[];
			sessionStorage.setItem("funds",funds);
			sessionStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
			toggleCountIcon();
			toggleBuyButton();
			alert("Thank you for your purchase!");
		}
		else alert("Insufficient funds.");
	}

	//Hide or show the buy button if the user has items
	function toggleBuyButton(){
		if(checkoutBuyBtn){
			if(shoppingCart.length==0){
				checkoutBuyBtn.style.visibility='hidden';
			}
			else checkoutBuyBtn.style.visibility=='visible';
		}
	}


	//Hide or show the shopping cart count icon if the user has items
	function toggleCountIcon(){
		if(shoppingCart.length==0){
			cartCountIcon.style.visibility='hidden';
		}
		else{
			cartCountIcon.style.visibility='visible';
			cartCountIcon.innerHTML=shoppingCart.length;
		}
	}

	//Adds the slide toggle feature to items and shows buy button
	$(function(){
		$('.itemBox').click(function(){
			$('#'+this.id+' > .descBox').slideToggle(300);
			$('#'+this.id+' > button').toggle();
		});
	});

	const homePageIndicator=document.getElementById('content');
	if(homePageIndicator){
		for(i=0;i<items.length;i++){
			let description=document.getElementById(items[i].title).firstElementChild;
			description.innerHTML=items[i].title+"<br/>"+items[i].summary+"<br/>$"+items[i].price;
		}
	}

	const checkoutIndicator=document.getElementById('items');
	if(checkoutIndicator){
		document.getElementById("cost").innerHTML="Cost: $"+cost;
		for(i=0; i<shoppingCart.length;i++){
			let checkOutItem=shoppingCart[i];
			let newListItem=$('<div>Remove: '+checkOutItem.title+'</div>');
			$(newListItem).on('click',function(){
				removeItem(checkOutItem);
				$(this).remove();
			});
			$('#items').append(newListItem);
		}
	}
}