// alert("JavaScript works!");

// Jamal Moubarak
// Project 2
// VFW 1303

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Establish Variable Defaults & Run Initial Functions
	var installGroups = ["--Type of System--", "Audio / Video", "Network", "POS"],
		warrantyValue,
		installedValue
	;
	
	//Create select field and give items.
	function installType(){
		var formTag = document.getElementsByTagName("form"),
			chooseLi = $("install"),
			chooseSelect = document.createElement("install");
		chooseSelect.setAttribute("id", "groups");
		for ( var i=0, j=installGroups.length; i<j; i++) {
			var chooseOption = document.createElement("option");
			var optList = installGroups[i];
			chooseOption.setAttribute("value", installGroups[i]);
			chooseOption.innerHTML = optList;
			chooseSelect.appendChild(chooseOption);
		}
		chooseLi.appendChild(chooseSelect);
	}
	
	//Find the value of radio button that is selected.
	function getRadio(){
		var radios = document.forms[0].warranty;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
				warrantyValue = radios[i].value;
			}
		}
	}
	
	//Get the value of the checkbox when clicked.
	function getChecks(){
		if($("installed").checked){
			installedValue = $("installed").value;
		}else{
			installedValue = "No Items Installed";
		}
	}
	
	//Turn the links on or off.
	function linkControls(n){
		switch(n){
			case "on":
				$("installForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayData").style.display = "none";
				$("addClient").style.display = "inline";
				break;
			case "off":
				$("installForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayData").style.display = "inline";
				$("addClient").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Saves the form data into local storage.
	function saveData(key){
		var is = Math.floor(Math.random()*100000001);
		var id = key;
		getRadio();
		getChecks();
		var item 				= {};
			item.install 		= ["Install:", $("installed").value];
			item.compname		= ["Company Name:", $("compname").value];
			item.contname		= ["Contact Name:", $("contname").value];
			item.contphone		= ["Contact Phone #:", $("contphone").value];
			item.contemail		= ["Contact Email:", $("contemail").value];
			item.date			= ["Install Date:", $("date").value];
			item.ipaddress		= ["Ip Address:", $("ipaddress").value];
			item.sysuser		= ["System Username:", $("sysuser").value];
			item.syspass		= ["System Password:", $("syspass").value];
			item.installed 		= ["The client has these systems installed:", installedValue];
			item.warranty 		= ["The client has this warranty:", warrantyValue];
			item.quanity 		= ["Quantity (# of Cameras, TV's, POS Terminals, etc):", $("quanity").value];
			item.price			= ["Price:", $("price").value];
			item.notes			= ["Notes:", $("notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Client Information is Saved!");
	}
	
	//JSON DATA: Create an object to test when no data is saved in Local Storage.
	function autoFillData(){
		var json = {
			"client1": {
				"install": ["Install:", "POS"],
				"compname": ["Company Name:", "Eskatech"],
				"contname": ["Contact Name:", "Jamal Moubarak"],
				"contphone": ["Contact Phone #", "734-819-1211"],
				"contemail": ["Contact Email:", "jamal@eskatech.com"],
				"date": ["Install Date:", "2013-03-14"],
				"ipaddress": ["Ip Address:", "192.168.001.099"],
				"sysuser": ["System Username:", "admin"],
				"syspass": ["System Password:", "admin"],
				"installed": ["The client has these systems installed:", "POS"],
				"warranty": ["The client has this warranty:", "3 Year"],
				"quanity": ["Quanity:", "4"],
				"price": ["Price", "$4595.00"],
				"notes": ["Notes:", "We installed 4 POS systems at the from counter off of a network switch we installed"]			
			},
			"client2":{
				"install": ["Install:", "Surveillance"],
				"compname": ["Company Name:", "Fairfield Inn"],
				"contname": ["Contact Name:", "John Smith"],
				"contphone": ["Contact Phone #", "555-555-2233"],
				"contemail": ["Contact Email:", "john@gmail.com"],
				"date": ["Install Date:", "2013-03-10"],
				"ipaddress": ["Ip Address:", "192.168.001.100"],
				"sysuser": ["System Username:", "john"],
				"syspass": ["System Password:", "123456"],
				"installed": ["The client has these systems installed:", "Surveillance"],
				"warranty": ["The client has this warranty:", "5 Year"],
				"quanity": ["Quanity:", "32"],
				"price": ["Price", "$7995.00"],
				"notes": ["Notes:", "Installed 8 cams 1st floor, 8 2nd floor, 8 3rd floor, 8 outside"]
			}
		};
		//Store the test data into Local Storage
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	
	//Retrieve data from Local Storage.
	function showData(){
		linkControls("on");
		if(localStorage.length === 0){
			autoFillData();
			alert("No Clients have been entered yet.");
		}
		//Insert data from Local Storage to the browser window.
		var chooseDiv = document.createElement("div");
		chooseDiv.setAttribute("id", "items");
		var chooseList = document.createElement("ul");
		chooseDiv.appendChild(chooseList);
		document.body.appendChild(chooseDiv);
		for (var i=0, len=localStorage.length; i<len; i++) {
			var q = -1;
			var chooseli = document.createElement("li");
			chooseList.appendChild(chooseli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Change the string from Local Storage back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var chooseSubList = document.createElement("ul");
			chooseli.appendChild(chooseSubList);
			for (var n in obj){
				q++;
				var chooseSubli = document.createElement("li");
				chooseSubList.appendChild(chooseSubli);
				var optSubText = obj[n][0] +" "+ obj [n][1];
				chooseSubli.innerHTML = optSubText;
			}
		}
	}
	
	//Clear all stored data
	function clearStorage() {
		if(localStorage.length === 0){
			alert("You have no Clients to Clear.");
		}else{
			localStorage.clear();
			alert("All clients have been deleted.");
			window.location.reload();
			return false;
		}
	}
	

	
	//Set Link & Submit Click Events
	var displayData = $("displayData");
	displayData.addEventListener("click", showData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearStorage);
	var save = $("submitButton");
	save.addEventListener("click", saveData);
	//Set Checkbox & Radio Click Events: Attach event listener to each radio button & checkbox.
	var checks = $("installed");
	checks.addEventListener("click", getChecks);
	var radios = document.forms[0].warranty;
	for (var i=0; i<radios.length; i++){
		radios[i].addEventListener("click", getRadio);
	}
	//Run installType();
	installType();	
	
});

