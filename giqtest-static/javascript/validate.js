function validate(form_name) {

// ***********************************************************************
// ***********************************************************************
   // ALL VALIDATION STARTS HERE.
   // SHOULD NOT NEED TO MODIFY ANYTHING BELOW HERE.
// ***********************************************************************
// ***********************************************************************

   // CHECK IF SELECT OPTIONS ARE SELECTED.
   for(k=0; k<isSelect.length; k++) {
      if(isSelect[k][1]==form_name) {

s=document.forms[form_name].elements[isSelect[k][0]][document.forms[form_name].elements[isSelect[k][0]].selectedIndex].value;
         if(s.length<1) {
            alert(isSelect[k][2]);
            //clearField(isSelect[k][0],form_name);
            return false;
         }
      }
   }

   // CHECK IF RADIOBOX FORM ELEMENT IS SELECTED.
   // REQUIRED FIELDS GO IN THE isRadio ARRAY.
   for(p=0; p<isRadio.length; p++) {
      if(isRadio[p][1]==form_name) {
        //alert("radio:"+document.forms[form_name].elements[isRadio[p][0]]);
        //alert("radio length:"+document.forms[form_name].elements[isRadio[p][0]].length);
	//alert("req:"+req); 
	
	j=document.forms[form_name].elements[isRadio[p][0]].length
	for (i=0; i<j; i++){
		if(document.forms[form_name].elements[isRadio[p][0]][i].checked)
			return true;
	}
	//if we didn't find anything return false
	alert(isRadio[p][2]);
	return false;
      }
   }
   
   // CHECK IF TEXT-BASED FORM ELEMENT IS AN EMPTY STRING.
   // REQUIRED FIELDS GO IN THE isRequired ARRAY.
   for(p=0; p<isRequired.length; p++) {
      if(isRequired[p][1]==form_name) {
         req=document.forms[form_name].elements[isRequired[p][0]].value;
         if(req.length<1) {
            alert(isRequired[p][2]);
            //clearField(isRequired[p][0],form_name);
            return false;
         }
      }
   }
   
   // CHECK IF TEXT-BASED FORM ELEMENT IS A NUMBER.
   // ANYTHING IN THE isNum ARRAY SHOULD BE AN ELEMENT THAT HAS TO BE A NUMBER.
   for(m=0;m<isNum.length;m++) {
      if(isNum[m][1]==form_name) {
         tin=document.forms[form_name].elements[isNum[m][0]].value;
         if(isNaN(tin)==true) {
            alert(isNum[m][2]);
            //clearField(isNum[m][0],form_name);
            return false; 
         }
      }
   }

   // CHECK EMAIL FIELD FOR AN '@' SYMBOL.
   for(i=0;i<isEmail.length;i++) {
      if(isEmail[i][1]==form_name) {
         t=document.forms[form_name].elements[isEmail[i][0]].value;
         // looks for '@' and '.' in string
         if((t.indexOf('@') == -1) || (t.indexOf('.') == -1)) {
            alert(isEmail[i][2]);
            //clearField(isEmail[i][0],form_name);
            return false;
         }
         // looks for at least 2 characters before the '@' symbol
         if(t.indexOf('@') < 2) {
            alert(isEmail[i][2]);
            //clearField(isEmail[i][0],form_name);
            return false;
         }
         // looks for at least 2 characters after '.' symbol
         if(((t.length-1)-t.indexOf('.')) <= 1) {
            alert(isEmail[i][2]);
            //clearField(isEmail[i][0],form_name);
            return false;
         }
      }
   }
   
   return customValidate();

}

// clears a field then puts the focus on it.
function clearField(element_name,form_name) {
   document.forms[form_name].elements[element_name].value="";
   document.forms[form_name].elements[element_name].focus();
}