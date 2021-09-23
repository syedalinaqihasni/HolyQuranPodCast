function myReciters(){var input,filter,ul,li,a,i;input=document.getElementById('myInput');filter=input.value.toUpperCase();ul=document.getElementById('myUL');li=ul.getElementsByTagName('tr');console.log(li);for(i=1;i<li.length;i++)
{a=li[i].getElementsByTagName("a")[0];if(a.innerHTML.toUpperCase().indexOf(filter)>-1)
{li[i].style.display="";}
else
{li[i].style.display="none";}}}
function myReciterCountry(){var input,filter,ul,li,a,i;input=document.getElementById('inputReciterCountry');filter=input.value.toUpperCase();ul=document.getElementById('myUL');li=ul.getElementsByTagName('tr');for(i=1;i<li.length;i++)
{a=li[i].getElementsByTagName("td")[1];if(a.innerHTML.toUpperCase().indexOf(filter)>-1||filter=="SELECT")
{li[i].style.display="";}
else
{li[i].style.display="none";}}}