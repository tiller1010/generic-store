// function Item(){}
// let descriptionText='';
// Item.prototype.description=function(index){
// 	descriptionText ="This is a "+this.manufacturer+" "+this.name+"\n$"+this.price;
// 	$(function(){
// 		$("."+index).text(descriptionText);
// 		$("."+index).slideToggle(300);
// 		$("#buy"+index).slideToggle(300);
// 	});
// }

// $(function(){
// 	$("#replicantBox").click(function(){
// 		replicant.description(1);
// 	})
// });

// $(function(){
// 	$("#basiliskBox").click(function(){
// 		basilisk.description(2);
// 	})
// });

// $(function(){
// 	$("#bm42Box").click(function(){
// 		bm42.description(3);
// 	})
// });

// $(function(){
// 	$("#tach3Box").click(function(){
// 		tachyon3.description(4);
// 	})
// });

// $(function(){
// 	$("#alphabeastBox").click(function(){
// 		alphabeast.description(5);
// 	})
// });

// $(function(){
// 	$("#angelBox").click(function(){
// 		arcangel.description(6);
// 	})
// });

// let cost = 0;

// function addItem(item){
// 	cost+=Number(item.price);
// 	}

// function removeItem(knife){
// 	cost-=Number(knife.price);
// 	document.getElementById("cost").innerHTML="Cost: $"+cost;

// }

// function buy(){
// 	let funds=Number(document.getElementById("money").getAttribute('value'));
// 	if(cost<=funds){
// 		funds=funds-cost;
// 		cost=0;
// 		document.getElementById('money').innerHTML="Funds: $"+funds;
// 		document.getElementById('money').setAttribute('value',funds.toString());
// 		document.getElementById('cost').innerHTML="Cost: $"+cost;
// 		$('#items div').remove();
// 		alert("Thank you for your purchase!");
// 	}
// 	else alert("Insufficient funds.");
// }

let items=[];
const item=function(title,summary,price){
	this.title=title,
	this.summary=summary,
	this.price=price,
	items.push(this);
}

const plant=new item('plant','A green fern','20');
const shoe=new item('shoe','A sports shoe','130');

function addItem(item){
	cost+=Number(item.price);
}

function removeItem(item){
	cost-=Number(item.price);
	document.getElementById("cost").innerHTML="Cost: $"+cost;

}

window.onload=function(){
	$(function(){
		$('.itemBox').click(function(){
			$(this).children().slideToggle(300);
			// $("#buy"+index).slideToggle(300);
		});
	});

	if(document.getElementsByClassName('itemBox')){
		for(i=0;i<items.length;i++){
			let description=document.getElementById(items[i].title).firstElementChild;
			description.innerHTML=items[i].title;
		}
	}

	if(document.getElementById('items')){
		document.getElementById("cost").innerHTML="Cost: $"+cost;
		for(i=0; i<items.length;i++){
			let newListItem=$('<div>Remove: '+items[i].name+'</div>');
			$(newListItem).on('click',function(){
				removeItem(item);
				$(this).remove();
			});
			$('#items').append(newListItem);
		}
	}
}