var GetMax=function(arr){
	var i;
	var max=arr[0]
	for (i=1; i<arr.length; i++)
		if (arr[i-1]<arr[i])
			max=arr[i];
	console.log("Максимальное значение: "+max);
}

GetMax([2,5,65]);