function Item(){}
let descriptionText='';
Item.prototype.description=function(index){
	descriptionText ="This is a "+this.manufacturer+" "+this.name+"\n$"+this.price;
	$(function(){
		$("."+index).text(descriptionText);
		$("."+index).slideToggle(300);
		$("#buy"+index).slideToggle(300);
	});
}
function Knives(name, manufacturer, price){
	this.name=name;
	this.manufacturer=manufacturer;
	this.price=price;
}
Knives.prototype=Object.create(Item.prototype);

let replicant = new Knives("Replicant", "BRS","230");

let basilisk = new Knives("Basilisk","HOM","400");

let bm42 = new Knives("42","Benchmade","420");

let tachyon3 = new Knives("Tachyon 3","Microtech","310");

let alphabeast = new Knives("Alpha Beast","BRS","330");

let arcangel = new Knives("Arc Angel","Cold Steel","500");

$(function(){
	$("#replicantBox").click(function(){
		replicant.description(1);
	})
});

$(function(){
	$("#basiliskBox").click(function(){
		basilisk.description(2);
	})
});

$(function(){
	$("#bm42Box").click(function(){
		bm42.description(3);
	})
});

$(function(){
	$("#tach3Box").click(function(){
		tachyon3.description(4);
	})
});

$(function(){
	$("#alphabeastBox").click(function(){
		alphabeast.description(5);
	})
});

$(function(){
	$("#angelBox").click(function(){
		arcangel.description(6);
	})
});

let cost = 0;

function addItem(knife){
	cost+=Number(knife.price);
	document.getElementById("cost").innerHTML="Cost: $"+cost;
	let newListItem=$('<div>Remove: '+knife.name+'</div>');
	$(newListItem).on('click',function(){
		removeItem(knife);
		$(this).remove();
	});
	$('#items').append(newListItem);
}

function removeItem(knife){
	cost-=Number(knife.price);
	document.getElementById("cost").innerHTML="Cost: $"+cost;

}

function buy(){
	let funds=Number(document.getElementById("money").getAttribute('value'));
	if(cost<=funds){
		funds=funds-cost;
		cost=0;
		document.getElementById('money').innerHTML="Funds: $"+funds;
		document.getElementById('money').setAttribute('value',funds.toString());
		document.getElementById('cost').innerHTML="Cost: $"+cost;
		$('#items div').remove();
		alert("Thank you for your purchase!");
	}
	else alert("Insufficient funds.");
}