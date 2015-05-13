//Age: 18-100
//Stage:
//•	Stage 0
//•	Stage I (Stage IA, Stage IB)
//•	Stage II (Stage IIA, Stage IIB)
//•	Stage III (Stage IIIA, Stage IIIB, Stage IIIC)
//•	Stage IV
//Primary Tumor (T): TX, T0, Tis, Tis (DCIS), Tis (LCIS), Tis (Paget’s) T1, T2, T3, T4
//Regional Lymph Nodes (N): NX, N0, N1, N2, N3
//Distant Metastasis (M): M0, M1
//Laterality: 0, 1, 2
//Grade: 1, 2, 3, 4
//Charlson Comorbidity Index (CCI): 0-37
//Treatment: 
//•	No treatment
//•	Surgery
//•	Radiation therapy
//•	Chemotherapy
//o	Hormone therapy
//o	Targeted therapy
//o	Oral chemotherapy
//o	Chemotherapy regimens
//o	Chemotherapy regimens containing trastuzumab
//o	Single chemotherapy agents
//o	Other chemotherapy


//Handle incoming data, send request to Manager function
//return content to display
function makeInfoRequest (theValuesFromTheHTMLPAGE) { //this is were values are delt with
//not yet using values from HTML page

//standards not incorporated in this version
var ptData = {
	{"disMetastasisrange":"M1"},
	{"tumorSize":"T4"},
	{"regionalLN":"N3"},
	{"stage":"Stage IV"}
};

var resultPath = infographicLogic(ptData); //retrieve graph

graphAppears(resultPath); //put graph on page in div with id survivalGraph
}

//place content on page	
function graphAppears(path) {
		d3.select("#survivialGraph").append("div").attr("id","survivorDiv")
			.style("float","left")
			.style("width", "430px")
			.style("height", "200px")
			.style("overflow","auto")
			.style("display","block")
			.append("img").attr("id","bundleGraphic")
				.attr('width', "410px")
				.attr('height', "800px")
				.attr("src",path);
}


////////THE BELOW CODE IS HIGHLY PORTABLE///////
///////serves as basis for future resource to deliver content/////
//infographicLogic.js
//contact: Bret Heale
//Match look-up data with resource graphic
//returns graphic
//this acts similarly to an infobutton manager but is more of a retrieval engine
//in real-life the request comes as a get or a post HTML request. Here we keeping it basic and doing everything client side.
//This limits how the resource graphs can be accessed - but that's okay for now.
function infographicLogic (requestParameters) {
	
//The construction of the resource profile is written to accommodate 
//future changes where the input may need parsing, such as mapping to UMLS concepts
var resourceParameter = function(parameterKeyValue) {
	//var key = Object.getOwnPropertyNames(parameterKeyValue);
	//var value = parameterKeyValue;
	for (key in parameterKeyValue) {
		this[key] = parameterKeyValue[key];
	}
	//in the future instead of this.key = value use something like
	//this.key = {code:##,codesystem:###,value:###};
}
var resourceProfile = function (parametersToUse) {
	var index = 0;
	for (index =  0; index < parametersToUse.length; ++index){
		this.resourceParameter = new resourceParameter(parametersToUse[index]);
	}
}

//here's the array of resources with their range definitions
//for now profiles are defined by strings or arrays of strings, but later the profile should use HL7 compliant concepts and values
var resourceArray = new Array(
    new resourceProfile({"title":"Patients with invasive breast cancer"},{"resourceLocation":"/resources/resource1.png"},{"disMetastasisrange":"M0"},{"tumorSize":["T1*","T0","T2","T3"]},{"regionalLN":["N0","N1mi","N1**","N1"]},{"stage":["Stage I","Stage IA","Stage IB","Stage IIA","Stage IIB","Stage IIIA"]}),
    new resourceProfile("title":"Patients with stage III invasive breast cancer","resourceLocation":"/resources/resource2.png",{"disMetastasisrange":"M0"},{"tumorSize":["T1*","T0","T2","T3","T4"]},{"regionalLN":["N0","N1","N2","N3"]},{"stage":["Stage IIA","Stage IIB","Stage IIIA","Stage IIIC"]}),
    new resourceProfile("title":"Patients with metastatic or recurrent breast cancer","resourceLocation":"/resources/resource3.png",{"disMetastasisrange":"M1"},{"tumorSize":["T1*","T0","T2","T3","T4"]},{"regionalLN":["N0","N1","N2","N3"]},{"stage":["Stage IV","Recurrent breast cancer"]})
);

//process requestParameters into a resource profile like object
var incomingRequest = new resourceProfile(requestParameters);
//then iterate through resource profiles to find best match
//LOGIC LOGIC LOGIC STEP
var param =""; //////////////////////WORKING HERE WORKING HERE
for (param in incomingRequest) {
  if (incomingRequest.hasOwnProperty(param)) {
	  if incomingRequest[param]
	  for (param in incomingRequest) {
	  }
  }	
}


} //infographicLogic