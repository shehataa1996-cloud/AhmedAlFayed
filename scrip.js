console.log("Website Designed by Ahmed AlFayed 2026");

/* التوقيع */

document.getElementById("signature").innerText =
"تصميم وبرمجة: أحمد الفايد 2026";

/* إنشاء الأهلة */

for(let i=0;i<7;i++){

let moon=document.createElement("div");

moon.className="moon";

moon.innerHTML="🌙";

moon.style.top=Math.random()*80+"%";

document.body.appendChild(moon);

}

/* إنشاء الفوانيس */

for(let i=0;i<4;i++){

let lantern=document.createElement("div");

lantern.className="lantern";

lantern.innerHTML="🏮";

lantern.style.left=Math.random()*90+"%";

lantern.style.top=Math.random()*80+"%";

document.body.appendChild(lantern);

}

/* إنشاء التهنئة */

function createMessage(){

let name=document.getElementById("name").value.trim();

if(name==="") return;

let text=`🌙 عيد فطر سعيد يا ${name}
تقبل الله منا ومنكم
كل عام وأنتم بخير`;

let result=document.getElementById("result");

result.innerText=text;

/* واتساب */

let whatsapp="https://wa.me/?text="+encodeURIComponent(text);

document.getElementById("whatsapp").href=whatsapp;

/* مسنجر */

let messenger="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(text);

document.getElementById("messenger").href=messenger;

/* احتفال */

confetti({

particleCount:200,

spread:120,

origin:{y:0.6}

});

}

/* عداد العيد */

let eidDate=new Date("March 20, 2026 00:00:00").getTime();

setInterval(function(){

let now=new Date().getTime();

let distance=eidDate-now;

if(distance < 0){

document.getElementById("countdown").innerText="عيد مبارك! 🎉";

return;

}

let days=Math.floor(distance/(1000*60*60*24));

let hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

let minutes=Math.floor((distance%(1000*60*60))/(1000*60));

let seconds=Math.floor((distance%(1000*60))/1000);

document.getElementById("countdown").innerText=
"باقي على العيد: "+days+" يوم "+hours+" ساعة "+minutes+" دقيقة "+seconds+" ثانية";

},1000);

/* احتفال عند فتح الصفحة */

window.onload=function(){

confetti({

particleCount:150,

spread:100,

origin:{y:0.5}

});

};
function copyMessage(){

let text = document.getElementById("result").innerText;

if(text===""){

alert("أنشئ التهنئة أولاً");

return;

}

navigator.clipboard.writeText(text);

alert("تم نسخ التهنئة 🎉");

}