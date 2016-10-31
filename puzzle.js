class example{
	constructor(x){
		var tabla = `<table border="0" cellspacing="2" bgcolor="black">`
		for(let i=0;i<x;i++){
			tabla +=`<tr height="50">`;
			for(let j=0;j<x;j++){
				if(i==(x-1) && j==(x-1)){
					tabla +=`<td width="50" bgcolor="white"></td>`;
				}else{
					tabla +=`<td width="50" bgcolor="white">${i}.${j}</td>`;
				}
			}
			tabla +=`</tr>`;
		}
		tabla += `</table>`;
		document.getElementById("tableTry").innerHTML=tabla;
	}
}

class board{
	constructor(x){
		this.build(x)
		this.con=controlator;
		
	}
	build(x){
		var table = `<table border="0" style="margin: 0 auto;" cellspacing="2" bgcolor="black">`
		for(let i=0;i<x;i++){
			table +=`<tr height="50">`;
			for(let j=0;j<x;j++){
					table +=`<td width="50" bgcolor="white" id =${i}.${j} ></td>`;
			}
			table +=`</tr>`;
		}
		table += `</table>`;
		document.getElementById("tablePlay").innerHTML=table;
	}
	paint(list, x){
		var list1 = list.slice();
		for (let i=0;i<x;i++){
			for(let j=0;j<x;j++){
				var elem=list1.shift();
				document.getElementById(`${i}.${j}`).innerHTML=elem;
			}
		}
	}
	
}

class controlator{
	constructor(){
		let x = prompt("Type de row it will have:");
		new example(x);
		this.board = new board(x);
		this.puz = new puzzle(x);
		this.board.paint(this.randomList(this.puz.listPlay, x), x);
		this.createEvent(x);
	}
	createEvent(x){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				document.getElementById(`${i}.${j}`).addEventListener("click", (e)=>this.puz.play(e,x));
			}
		}
	}

	randomList(list, x){
		var listCopy=[];
		var listFinal=[];

		for (let i=0;i<x;i++){
			var element=list.shift();
			for (let j=0;j<x;j++){
				listCopy.push(element.shift());
			}
		}

		var end=listCopy.length-1
		for (let i=0;i<end;i++){
			var ran=Math.floor(Math.random() * (listCopy.length - 1)) + 1
			listFinal.push(listCopy.splice(ran,1).toString());
		}
		listFinal.push("0.0");
		this.changeList(listFinal, x);
		return listFinal;
	}
	changeList(list, x){
		this.puz.listPlay=[];
		var listCopy=[];
		var list1 = list.slice();
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				listCopy.push(list1.shift());
			}
			this.puz.listPlay.push(listCopy);
			listCopy=[];
		}
	}

}

class puzzle{
	constructor(x){
		this.listPlay=[];
		this.listWin=[];
		this.createLists(x);
	}

	createLists(x){
		var list = [];
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				if(i==(x-1) && j==(x-1)){
					list.push(``);
				}else{
					list.push(parseFloat(`${i}.${j}`));
				}
			}
			var copy=list.slice();
			this.listPlay.push(list);
			this.listWin.push(copy);
			list=[];
		}

	}

	play(event,x){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				if(document.getElementById(`${i}.${j}`).innerHTML == ""){
					var a = parseFloat(event.target.getAttribute("id"));
					var num = parseFloat(event.target.innerHTML);
					var b = Math.abs(a-parseFloat(`${i}.${j}`)).toFixed(1);
					if (b == 0.1 || b == 1.0){
						document.getElementById(`${i}.${j}`).innerHTML=num;
						this.listPlay[i].splice(j,1,num);
						event.target.innerHTML = "";
						this.listPlay[event.target.getAttribute("id")[0]].splice(
							event.target.getAttribute("id")[2],1, "");
						this.checkWin(x);
					}
				}
			}
		}
	}
	checkWin(x){
		console.log(this.listPlay);
		console.log(this.listWin);
		var cont=0;
		for (let i=0;i<x;i++){
			for(let j=0;j<x;j++){
				if(this.listPlay[i][j] == this.listWin[i][j]){
					cont++
					if (cont== (x*x)){
						document.getElementById("text").innerHTML="WINNER!!";
					}
						
				}
			}
		}
		
	}
}





window.onload=function(){
	new controlator();
}