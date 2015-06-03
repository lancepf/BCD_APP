//Age: 18-100
//Stage:
//•	Stage 0
//•	Stage I (Stage IA, Stage IB)
//•	Stage II (Stage IIA, Stage IIB)
//•	Stage III (Stage IIIA, Stage IIIB, Stage IIIC)
//•	Stage IV
/*     Stage<span class="asterisk">*</span>: <select name="Stage.Group.pathology" required>
    	<option value="">Please select below</option>
        <option value="Stage I">Stage I (Stage IA, Stage IB)</option>
        <option value="Stage II">Stage II (Stage IIA, Stage IIB)</option>
        <option value="Stage III">Stage III (Stage IIA, Stage IIB, Stage IIC)</option>
        <option value="Stage IV">Stage IV</option>
        </select> */
//Primary Tumor (T): TX, T0, Tis, Tis (DCIS), Tis (LCIS), Tis (Paget’s) T1, T2, T3, T4
/* Primary Tumor (T)<span class="asterisk">*</span>: <select name="Primary.tumor.pathology" required>
   	<option value="">Please select below</option>
       <option value="TX">TX</option>
       <option value="T0">T0</option>
       <option value="Tis">Tis</option>
       <option value="Tis DCIS">Tis (DCIS)</option>
       <option value="Tis LCIS">Tis (LCIS)</option>
       <option value="Tis Paget">Tis (Paget's)</option>
       <option value="T1">T1</option>
       <option value="T2">T2</option>
       <option value="T3">T3</option>
       <option value="T4">T4</option>
   </select> */
//Regional Lymph Nodes (N): NX, N0, N1, N2, N3
/*     Regional Lymph Nodes (N)<span class="asterisk">*</span>: <select name="Regional.lymph.nodes" required>
    	<option value="none selected"> </option>
        <option value="NX">NX</option>
        <option value="N0">N0</option>
        <option value="N1">N1</option>
        <option value="N2">N2</option>
        <option value="N3">N3</option>
    </select> */
//Distant Metastasis (M): M0, M1
 /*    Distant Metastasis (M)<span class="asterisk">*</span>: <select name="Distant.metastases.clinical" required>
    	<option value=""> </option>
        <option value="M0">M0</option>
        <option value="M1">M1</option>
    </select> */
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
function makeInfoRequest (fromForm) { 
//this is were values are delt with

console.log(fromForm);
//standards not incorporated in this version
var ptData = [
	//context for graph
	["disMetastasisrange",fromForm["Distant.metastases.clinical"].options[fromForm["Distant.metastases.clinical"].selectedIndex].text,"notUsed","notUsed"], //"Distant.metastases.clinical" fromForm.Distant.metastases.clinical.selectedIndex
	["tumorSize",fromForm["Primary.tumor.pathology"].options[fromForm["Primary.tumor.pathology"].selectedIndex].text,"notUsed","notUsed"], //"Primary.tumor.pathology" 
	["regionalLN",fromForm["Regional.lymph.nodes"].options[fromForm["Regional.lymph.nodes"].selectedIndex].text,"notUsed","notUsed"], //Regional.lymph.nodes
	["stage",fromForm["Stage.Group.pathology"].options[fromForm["Stage.Group.pathology"].selectedIndex].text,"notUsed","notUsed"], //Stage.Group.pathology
	
	["age",fromForm["age"].value,"notUsed","notUsed"], //age
	["gender","F","notUsed","notUsed"] //gender female

];
//<category scheme="patientPerson.administrativeGenderCode.c" term="M"/>
//<category scheme="ageGroup.v.c" term="D000328"/>
//<category scheme="taskContext.c.c" term="PROBLISTREV"/>
//<category scheme="mainSearchCriteria.v.c" term="C50"/>
//<category scheme="mainSearchCriteria.v.cs" term="2.16.840.1.113883.6.90"/>
console.log("ptdata", ptData);

//["resourceLocation","/resources/resource1.png","notUsed","notUsed"]
var resultPath = infographicLogic(ptData); //retrieve graph
console.log("result",resultPath);
graphAppears(resultPath); //put graph on page in div with id survivalGraph

var infoButtonUrl = armInfoButton(ptData);
var iframeInfoUrl = armInfoFrame(ptData);
console.log("armInfoButton", infoButtonUrl);
console.log("armInfoFrame", iframeInfoUrl);
}

//place content on page	
function graphAppears(path) {
		d3.select("#survivorDiv").remove();
		
		//d3.select("#survivialGraph")
		//	.style("float","left");

			
		d3.select("#survivialGraph").append("div").attr("id","survivorDiv")
			//.style("float","left")
			//.style("width", "430px")
			//.style("height", "200px")
			//.style("overflow","auto")
			//.style("display","block")
			.append("img").attr("id","survivorGraphic")
			//	.attr('width', "410px")
			//	.attr('height', "800px")
			.attr("src",path);
}

//the next two functions are quick-n-dirty for the demonstration for week 6/1/2015
//armInfoButton provides an openInfoButton request
//Context Here is currently limited to general info on BC
function armInfoButton (incomingRequest) {

	//yes were being redundant but collecting information on how to write this code better later
	function conceptMatch (paramA,paramB) {//this will be more interesting later when trying to match codes from multiple systems, or lack of codes
	if (paramA[0] == paramB[0]) {return 1;}
	else {return 0;}
	}
	//we parse out the criteria we need
		var age = 0;
		var gender = "";
		//short cut but ideally we'd be copying infographicLogic!
		//so its looking like the matching algorithm of infographicLogic should be made into a separate method! COOL!
		for (var index  = 0; index < incomingRequest.length; ++index) { //over parameters
			if(conceptMatch(incomingRequest[index],["age"]) ) {
				age = incomingRequest[index][1];
			}
			if(conceptMatch(incomingRequest[index],["gender"]) ) {
				gender = incomingRequest[index][1];
			}
		}
		var baseURL_BCmainSearchCriteria_task = "http://service.oib.utah.edu:8080/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=126926005&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96";
//http://service.oib.utah.edu:8080/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=C50&mainSearchCriteria.v.cs=2.16.840.1.113883.6.90";

		
		var genderParam = '&patientPerson.administrativeGenderCode.c=' + gender + '' ;
		var ageParam = '&age.v.v=' + age + '&age.v.u=a';
		var providerInfo = "&informationRecipient=PROV&performer=PROV&performer.languageCode.c=en&performer.healthCareProvider.c.c=200000000X&informationRecipient=PROV&xsltTransform=Infobutton_UI";
		var url = baseURL_BCmainSearchCriteria_task + genderParam + ageParam + providerInfo;
	return url;
}
//armInfoFrame puts all entered context into an UpToDate search...this is the quick and dirty approach
function armInfoFrame(incomingRequest) {
	//put values in string for url based search of UptoDate
	var cheapContext = "";
	var paramName = "";
	var paramValue = "";
	function conceptMatch (paramA,paramB) {//this will be more interesting later when trying to match codes from multiple systems, or lack of codes
		if (paramA[0] == paramB[0]) {return 1;}
		else {return 0;}
	}
	//very little context is being used presently - NEED Authorization from UpToDate to use HL7 message for querying!!
	//then would have ability to really get good context into search
	for (var index  = 0; index < incomingRequest.length; ++index) { //over parameters
		if(conceptMatch(incomingRequest[index],["disMetastasisrange"]) ) {
			if (incomingRequest[index][1] == "M1") { cheapContext = cheapContext +" metastatic"; }
		}
		if(conceptMatch(incomingRequest[index],["age"]) ) {
			//age if smaller than 17 use adolescent - child produces strange results with website search engine
			if(incomingRequest[index][1] < 17) { cheapContext = cheapContext +" adolescent "; }
		}
	}
	var url = "http://www.uptodate.com/contents/search?search="+cheapContext+" Breast Cancer&sp=0&searchType=PLAIN_TEXT&source=USER_INPUT&searchControl=TOP_PULLDOWN&searchOffset=";
	return url;
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
//requestParameters must be in the form:
// [nameParam, value_if_used, code_if_used, codesystem_if_used]
// "notUsed" is expected when field is not used for a parameter
// expecting LOINC or SNOMED-CT for codes
//Logic is done with arrays rather than objects for speed/simplicity of logic 
function infographicLogic (requestParameters) {
	
//The construction of the resource profile is written to accommodate 
//future changes where the input may need parsing, such as mapping to UMLS concepts
var resourceProfile = function (parametersToUse) {
	//var arry = new Array(parametersToUse);
	//console.log(parametersToUse);
	return parametersToUse;
}
//here's the array of resources with their range definitions
//later the profile should use HL7 compliant concepts and values
var resourceArray = new Array( //[nameParam, arrayOfAcceptedValues_if_used, code_if_used, codesystem_if_used]
    new resourceProfile(new Array(["title","Patients with invasive breast cancer","notUsed","notUsed"],["resourceLocation","resources/resource1.png","notUsed","notUsed"],["disMetastasisrange","M0","notUsed","notUsed"],["tumorSize",["T1*","T0","T2","T3"],"notUsed","notUsed"],["regionalLN",["N0","N1mi","N1**","N1"],"notUsed","notUsed"],["stage",["Stage I","Stage IA","Stage IB","Stage IIA","Stage IIB","Stage IIIA"],"notUsed","notUsed"])),
    new resourceProfile(new Array(["title","Patients with stage III invasive breast cancer","notUsed","notUsed"],["resourceLocation","resources/resource2.png","notUsed","notUsed"],["disMetastasisrange","M0","notUsed","notUsed"],["tumorSize",["T1*","T0","T2","T3","T4"],"notUsed","notUsed"],["regionalLN",["N0","N1","N2","N3"],"notUsed","notUsed"],["stage",["Stage IIA","Stage IIB","Stage IIIA","Stage IIIC"],"notUsed","notUsed"])),
    new resourceProfile(new Array(["title","Patients with metastatic or recurrent breast cancer","notUsed","notUsed"],["resourceLocation","resources/resource3.png","notUsed","notUsed"],["disMetastasisrange","M1","notUsed","notUsed"],["tumorSize",["T1*","T0","T2","T3","T4"],"notUsed","notUsed"],["regionalLN",["N0","N1","N2","N3"],"notUsed","notUsed"],["stage",["Stage IV","Recurrent breast cancer"],"notUsed","notUsed"]))
);

//process requestParameters into a resource profile like object
//here the processing is very simple as we are using the integrated retrieval system
var incomingRequest = new resourceProfile(requestParameters);
//in next version we will need to ensure that names of parameters are internally standardized
//or see checkit

//then iterate through resource profiles to find best match
//LOGIC LOGIC LOGIC STEP
			
var currentMatch = 0;
var bestMatch = 0;
var bestIndex = 0;
//array based would need to iterate over every single parameter over every profiles parameters
//hybrid where key is name and we could ensure that matching concepts had same name would reduce the complexity of the search to matching keys and then checking values 
//another option check every parameter name, our assumption is that there will not be too many parameter names...

//future use sorting to make matching more efficient//
for (var index2 = 0; index2 < resourceArray.length; ++index2) { //resource profiles
//				console.log("resourceArray[index2]",resourceArray[index2][index3]);
		//console.log("index2",index2);
		currentMatch = 0;
	for (var index3 = 0; index3 < resourceArray[index2].length; ++index3) {//parameters of resources[index3]
		//first check for parameter concept match
		//console.log("index3",index3);
//	console.log("incomingRequest[index]",incomingRequest[index]);		
		for (var index  = 0; index < incomingRequest.length; ++index) { //over parameters
		//console.log("index",index);
			if ( conceptMatch(incomingRequest[index],resourceArray[index2][index3]) ) {
				//now check to see if incomingRequest value is in acceptable range
				if( valueMatch(incomingRequest[index][1],resourceArray[index2][index3][1]) ){
					//notUsed is an acceptable match for values if the concepts match
					++currentMatch;
					if (currentMatch > bestMatch) {
						bestMatch = currentMatch;
						bestIndex = index2;
						//better match found
					}
				}						
			}
			//console.log("currentMatch", currentMatch);
			//console.log("bestMatch",bestMatch);
		}
	}
}
function conceptMatch (paramA,paramB) {
//this will be more interesting later when trying to match codes from multiple systems, or lack of codes
	if (paramA[0] == paramB[0]) {return 1;}
	else {return 0;}
}
function valueMatch (valueA,valuesB) { 
	//currently we are just looking for sting matching. when we start using ranges this function will become interesting
    for (var i = 0; i < valuesB.length; i++) {
        if (valuesB[i] === valueA) {
            return true;
        }
    }
    return false;
}	

//example resource profile
//[
//["title","Patients with invasive breast cancer","notUsed","notUsed"],
//["resourceLocation","/resources/resource1.png","notUsed","notUsed"],
//["disMetastasisrange","M0","notUsed","notUsed"],
//["tumorSize",["T1*","T0","T2","T3"],"notUsed","notUsed"],
//["regionalLN",["N0","N1mi","N1**","N1"],"notUsed","notUsed"],
//["stage",["Stage I","Stage IA","Stage IB","Stage IIA","Stage IIB","Stage IIIA"],"notUsed","notUsed"]
//]
var urlResult = resourceArray[bestIndex][1][1];
console.log("bestIndex",bestIndex);
return urlResult;
} //infographicLogic