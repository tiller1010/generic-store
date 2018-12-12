try{
	var cost=Number(sessionStorage.getItem("cost"));
	var shoppingCart=JSON.parse(sessionStorage.getItem("shoppingCart"));
	var funds=Number(sessionStorage.getItem("funds"));
	if(!shoppingCart) throw "Cost, Cart, and Funds now defined.";
}
catch(error){
	var cost=0;
	var shoppingCart=[];
	var funds=1000;
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

const plant=new item('Plant','A green fern','20');
const shoe=new item('Shoe','A sports shoe','130');

function addItem(item){
	cost+=Number(item.price);
	sessionStorage.setItem("cost", cost);
	shoppingCart.push(item);
	sessionStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
	console.log(cost);
}

function removeItem(item){
	cost-=Number(item.price);
	sessionStorage.setItem("cost", cost);
	shoppingCart.splice(shoppingCart.indexOf(item),1);
	sessionStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
	document.getElementById("cost").innerHTML="Cost: $"+cost;

}

function buy(){
	if(cost<=funds){
		funds=funds-cost;
		cost=0;
		document.getElementById('money').innerHTML="Funds: $"+funds;
		document.getElementById('money').setAttribute('value',funds.toString());
		document.getElementById('cost').innerHTML="Cost: $"+cost;
		$('#items div').remove();
		sessionStorage.setItem("cost", cost);
		shoppingCart=[];
		sessionStorage.setItem("funds",funds);
		sessionStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
		alert("Thank you for your purchase!");
	}
	else alert("Insufficient funds.");
}

window.onload=function(){

	document.getElementById('money').innerHTML="Funds: $"+funds;

	$(function(){
		$('.itemBox').click(function(){
			$(this).children().slideToggle(300);
		});
	});

	const homePageIndicator=document.getElementById('content');
	if(homePageIndicator){
		for(i=0;i<items.length;i++){
			let description=document.getElementById(items[i].title).firstElementChild;
			description.innerHTML=items[i].title;
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