var IsElementsSame=function(arr){
	var i;
	var result=true;
	for (i=1; i<arr.length; i++)
		if (arr[i-1]!==arr[i])
			result=false;
	console.log(result);	
}

IsElementsSame([5,5,5]);
IsElementsSame([0,0,null]); 