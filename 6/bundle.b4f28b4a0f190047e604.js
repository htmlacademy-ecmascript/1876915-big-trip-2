(()=>{var e={353:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",a="hour",r="day",o="week",c="month",d="quarter",f="year",l="date",u="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,b={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},v={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,c),a=n-s<0,r=t.clone().add(i+(a?-1:1),c);return+(-(i+(n-s)/(a?s-r:r-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:f,w:o,d:r,D:l,h:a,m:s,s:i,ms:n,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",$={};$[y]=b;var _=function(e){return e instanceof M},g=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var a=t.toLowerCase();$[a]&&(s=a),n&&($[a]=n,s=a);var r=t.split("-");if(!s&&r.length>1)return e(r[0])}else{var o=t.name;$[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},T=function(e,t){if(_(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new M(n)},w=v;w.l=g,w.i=_,w.w=function(e,t){return T(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var M=function(){function b(e){this.$L=g(e.locale,null,!0),this.parse(e)}var m=b.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(h);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return w},m.isValid=function(){return!(this.$d.toString()===u)},m.isSame=function(e,t){var n=T(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return T(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<T(e)},m.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,d=!!w.u(t)||t,u=w.p(e),h=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return d?i:i.endOf(r)},p=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},b=this.$W,m=this.$M,v=this.$D,y="set"+(this.$u?"UTC":"");switch(u){case f:return d?h(1,0):h(31,11);case c:return d?h(1,m):h(0,m+1);case o:var $=this.$locale().weekStart||0,_=(b<$?b+7:b)-$;return h(d?v-_:v+(6-_),m);case r:case l:return p(y+"Hours",0);case a:return p(y+"Minutes",1);case s:return p(y+"Seconds",2);case i:return p(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,d=w.p(e),u="set"+(this.$u?"UTC":""),h=(o={},o[r]=u+"Date",o[l]=u+"Date",o[c]=u+"Month",o[f]=u+"FullYear",o[a]=u+"Hours",o[s]=u+"Minutes",o[i]=u+"Seconds",o[n]=u+"Milliseconds",o)[d],p=d===r?this.$D+(t-this.$W):t;if(d===c||d===f){var b=this.clone().set(l,1);b.$d[h](p),b.init(),this.$d=b.set(l,Math.min(this.$D,b.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[w.p(e)]()},m.add=function(n,d){var l,u=this;n=Number(n);var h=w.p(d),p=function(e){var t=T(u);return w.w(t.date(t.date()+Math.round(e*n)),u)};if(h===c)return this.set(c,this.$M+n);if(h===f)return this.set(f,this.$y+n);if(h===r)return p(1);if(h===o)return p(7);var b=(l={},l[s]=e,l[a]=t,l[i]=1e3,l)[h]||1,m=this.$d.getTime()+n*b;return w.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||u;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),a=this.$H,r=this.$m,o=this.$M,c=n.weekdays,d=n.months,f=function(e,n,s,a){return e&&(e[n]||e(t,i))||s[n].slice(0,a)},l=function(e){return w.s(a%12||12,e,"0")},h=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},b={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:f(n.monthsShort,o,d,3),MMMM:f(d,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,c,2),ddd:f(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(a),HH:w.s(a,2,"0"),h:l(1),hh:l(2),a:h(a,r,!0),A:h(a,r,!1),m:String(r),mm:w.s(r,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(e,t){return t||b[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,l,u){var h,p=w.p(l),b=T(n),m=(b.utcOffset()-this.utcOffset())*e,v=this-b,y=w.m(this,b);return y=(h={},h[f]=y/12,h[c]=y,h[d]=y/3,h[o]=(v-m)/6048e5,h[r]=(v-m)/864e5,h[a]=v/t,h[s]=v/e,h[i]=v/1e3,h)[p]||v,u?y:w.a(y)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return $[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=g(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return w.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},b}(),D=M.prototype;return T.prototype=D,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",r],["$M",c],["$y",f],["$D",l]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),T.extend=function(e,t){return e.$i||(e(t,M,T),e.$i=!0),T},T.locale=g,T.isDayjs=_,T.unix=function(e){return T(1e3*e)},T.en=$[y],T.Ls=$,T.p={},T}()},522:function(e){e.exports=function(){"use strict";var e,t,n=1e3,i=6e4,s=36e5,a=864e5,r=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,c=2592e6,d=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,f={years:o,months:c,days:a,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},l=function(e){return e instanceof y},u=function(e,t,n){return new y(e,n,t.$l)},h=function(e){return t.p(e)+"s"},p=function(e){return e<0},b=function(e){return p(e)?Math.ceil(e):Math.floor(e)},m=function(e){return Math.abs(e)},v=function(e,t){return e?p(e)?{negative:!0,format:""+m(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},y=function(){function p(e,t,n){var i=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return u(e*f[h(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){i.$d[h(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(d);if(s){var a=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=a[0],this.$d.months=a[1],this.$d.weeks=a[2],this.$d.days=a[3],this.$d.hours=a[4],this.$d.minutes=a[5],this.$d.seconds=a[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*f[n]}),0)},m.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=b(e/o),e%=o,this.$d.months=b(e/c),e%=c,this.$d.days=b(e/a),e%=a,this.$d.hours=b(e/s),e%=s,this.$d.minutes=b(e/i),e%=i,this.$d.seconds=b(e/n),e%=n,this.$d.milliseconds=e},m.toISOString=function(){var e=v(this.$d.years,"Y"),t=v(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=v(n,"D"),s=v(this.$d.hours,"H"),a=v(this.$d.minutes,"M"),r=this.$d.seconds||0;this.$d.milliseconds&&(r+=this.$d.milliseconds/1e3);var o=v(r,"S"),c=e.negative||t.negative||i.negative||s.negative||a.negative||o.negative,d=s.format||a.format||o.format?"T":"",f=(c?"-":"")+"P"+e.format+t.format+i.format+d+s.format+a.format+o.format;return"P"===f||"-P"===f?"P0D":f},m.toJSON=function(){return this.toISOString()},m.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(r,(function(e,t){return t||String(i[e])}))},m.as=function(e){return this.$ms/f[h(e)]},m.get=function(e){var t=this.$ms,n=h(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?b(t/f[n]):this.$d[n],0===t?0:t},m.add=function(e,t,n){var i;return i=t?e*f[h(t)]:l(e)?e.$ms:u(e,this).$ms,u(this.$ms+i*(n?-1:1),this)},m.subtract=function(e,t){return this.add(e,t,!0)},m.locale=function(e){var t=this.clone();return t.$l=e,t},m.clone=function(){return u(this.$ms,this)},m.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}();return function(n,i,s){e=s,t=s().$utils(),s.duration=function(e,t){var n=s.locale();return u(e,{$l:n},t)},s.isDuration=l;var a=i.prototype.add,r=i.prototype.subtract;i.prototype.add=function(e,t){return l(e)&&(e=e.asMilliseconds()),a.bind(this)(e,t)},i.prototype.subtract=function(e,t){return l(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)}}}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(353),t=n.n(e),i=n(522),s=n.n(i);t().extend(s());const a=(e=[],t=0)=>{const n=[];for(;e.length&&t--;){const t=Math.round(Math.random()*(e.length-1));n.push(e[t]),e.splice(t,1)}return n},r=[{id:"c7fcf894-e8ef-4347-94cf-8c76aa6c6833",description:"Chamonix - a perfect place to stay with a family",name:"Chamonix",pictures:[]},{id:"82a3bad6-6498-4989-ae4f-815082508c30",description:"",name:"Venice",pictures:[]},{id:"ec9110f7-4767-4179-b856-5d8bb23324ec",description:"",name:"Moscow",pictures:[]},{id:"070ea513-2210-42df-bad4-ede76ba22a3e",description:"Sochi - is a beautiful city",name:"Sochi",pictures:[]},{id:"e4bc89ed-4df2-40a4-b8d1-21b953502799",description:"Berlin - for those who value comfort and coziness",name:"Berlin",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/18.jpg",description:"Berlin a perfect place to stay with a family"},{src:"https://22.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Berlin with a beautiful old town"}]},{id:"13a37338-b4b1-466e-aafe-092f3c247708",description:"Geneva - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Geneva",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/18.jpg",description:"Geneva middle-eastern paradise"},{src:"https://22.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Geneva a true asian pearl"},{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Geneva with crowded streets"}]},{id:"64a8701c-632e-48ae-9052-353c1a3465df",description:"Frankfurt - for those who value comfort and coziness",name:"Frankfurt",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Frankfurt a perfect place to stay with a family"}]},{id:"fdd837e1-fd2d-463c-9a2d-555cf8efa89e",description:"Valencia - a true asian pearl",name:"Valencia",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/20.jpg",description:"Valencia with an embankment of a mighty river as a centre of attraction"},{src:"https://22.objects.htmlacademy.pro/static/destinations/15.jpg",description:"Valencia for those who value comfort and coziness"},{src:"https://22.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Valencia famous for its crowded street markets with the best street food in Asia"}]},{id:"fed714ef-b342-45dc-8788-633def721433",description:"",name:"Monaco",pictures:[]},{id:"466c2985-2db8-47fa-85e4-0d07cb9e48fe",description:"Vien - is a beautiful city",name:"Vien",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/1.jpg",description:"Vien a true asian pearl"}]}],o=[{type:"taxi",offers:[{id:"df01f087-8af8-4024-ade2-434e572a1939",title:"Upgrade to a business class",price:187},{id:"0690c5cc-879c-4aa5-80c1-244935547967",title:"Choose the radio station",price:193},{id:"bba6b2a4-115c-4470-9e70-bab52e7b6da9",title:"Choose temperature",price:36},{id:"61a27c8e-492d-4194-8d09-c85e8fbc0ed2",title:"Drive quickly, I'm in a hurry",price:133},{id:"428136ce-b310-4e4e-bb3e-e09946178b81",title:"Drive slowly",price:50}]},{type:"bus",offers:[{id:"3529d1ca-96d4-4530-8cf5-3f3b0f570ed4",title:"Infotainment system",price:68},{id:"32f9d674-3739-427f-903f-daa3c2cf722b",title:"Order meal",price:116},{id:"199e8e51-dc14-4795-9638-5f707452da51",title:"Choose seats",price:134}]},{type:"train",offers:[{id:"b64cbb73-09c3-4d68-be36-95d4478d344c",title:"Book a taxi at the arrival point",price:42},{id:"f7429a41-90e3-448e-af6a-91f77c1d1f49",title:"Order a breakfast",price:139},{id:"5093df18-a4d0-42f7-b9cd-b6ef378563fa",title:"Wake up at a certain time",price:69}]},{type:"flight",offers:[{id:"9b77d7bc-4650-465d-98da-c12fe7f3495c",title:"Choose meal",price:63},{id:"1021812a-82b3-4fb5-a657-51d6b005d366",title:"Choose seats",price:122},{id:"4dc8e801-b123-489e-816a-1b900e12d270",title:"Upgrade to comfort class",price:157},{id:"151f488d-e03a-4347-8837-2e7171061983",title:"Upgrade to business class",price:140},{id:"7511ff9e-227d-4732-9e27-d4cd1b78c220",title:"Add luggage",price:158},{id:"52cfccc0-c186-4dea-9fe4-b04528650af9",title:"Business lounge",price:41}]},{type:"check-in",offers:[{id:"e3dbdc12-23b8-453f-afd1-e0dcb281bf7a",title:"Choose the time of check-in",price:195},{id:"56b72afa-d7d0-4dab-9d80-e64a2442783e",title:"Choose the time of check-out",price:155},{id:"73522a17-f05d-49b9-a141-5ebccae6fb24",title:"Add breakfast",price:107},{id:"d658acef-46f7-4c88-b7ed-df131ffabe0c",title:"Laundry",price:183},{id:"4a956f99-a055-4143-969f-b29f2be5da50",title:"Order a meal from the restaurant",price:101}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"ed0ddafb-1f70-4d26-b212-c40f42b92c4f",title:"Choose meal",price:146},{id:"35aa9a64-dbfd-4059-bb77-117e839bfcc2",title:"Choose seats",price:60},{id:"0a72ec19-d026-4a7b-9158-f00431ff883f",title:"Upgrade to comfort class",price:160},{id:"1ca8aa30-0131-4b9f-956a-b7f90d2bf6a8",title:"Upgrade to business class",price:57},{id:"00fdf487-91f5-4175-97cc-4b8cf30240a0",title:"Add luggage",price:81},{id:"6e21cc5e-e5ef-453d-a401-86846f294d02",title:"Business lounge",price:146}]},{type:"drive",offers:[{id:"50cd2308-6764-4111-9800-4027c4516b90",title:"With automatic transmission",price:34},{id:"d82abaa6-4c4e-4bb4-a49d-83e80c37cdd5",title:"With air conditioning",price:101}]},{type:"restaurant",offers:[{id:"89b4eb84-3d09-475f-814a-879bcf96a900",title:"Choose live music",price:110},{id:"d1d46527-003a-43e2-a3c1-714db831a54e",title:"Choose VIP area",price:33}]}],c=[{id:"8220b3c4-7c8b-43b9-a36c-87860c29a201",basePrice:7863,dateFrom:"2024-12-03T11:14:08.471Z",dateTo:"2024-12-05T04:59:08.471Z",destination:"82a3bad6-6498-4989-ae4f-815082508c30",isFavorite:!1,offers:[],type:"sightseeing"},{id:"7bd944c8-0d45-426b-aaf7-a87f096e8c53",basePrice:67,dateFrom:"2024-12-06T08:46:08.471Z",dateTo:"2024-12-06T16:52:08.471Z",destination:"070ea513-2210-42df-bad4-ede76ba22a3e",isFavorite:!1,offers:["89b4eb84-3d09-475f-814a-879bcf96a900","d1d46527-003a-43e2-a3c1-714db831a54e"],type:"restaurant"},{id:"33280e36-1490-4a7a-b497-d2c0e38f5442",basePrice:3087,dateFrom:"2024-12-07T04:06:08.471Z",dateTo:"2024-12-09T00:49:08.471Z",destination:"466c2985-2db8-47fa-85e4-0d07cb9e48fe",isFavorite:!0,offers:[],type:"sightseeing"},{id:"939e4b88-b4d0-49e7-97bb-3544cc12e1a1",basePrice:2921,dateFrom:"2024-12-09T14:04:08.471Z",dateTo:"2024-12-10T12:35:08.471Z",destination:"ec9110f7-4767-4179-b856-5d8bb23324ec",isFavorite:!1,offers:[],type:"sightseeing"},{id:"8319ffe9-6f6b-4fc7-bc7e-6266c4ac0fab",basePrice:1499,dateFrom:"2024-12-10T18:44:08.471Z",dateTo:"2024-12-12T16:09:08.471Z",destination:"e4bc89ed-4df2-40a4-b8d1-21b953502799",isFavorite:!0,offers:["35aa9a64-dbfd-4059-bb77-117e839bfcc2","0a72ec19-d026-4a7b-9158-f00431ff883f","1ca8aa30-0131-4b9f-956a-b7f90d2bf6a8","00fdf487-91f5-4175-97cc-4b8cf30240a0","6e21cc5e-e5ef-453d-a401-86846f294d02"],type:"ship"},{id:"b4fae42a-bfa8-48eb-8b53-c01c591185b6",basePrice:1350,dateFrom:"2024-12-13T19:10:08.471Z",dateTo:"2024-12-15T17:23:08.471Z",destination:"64a8701c-632e-48ae-9052-353c1a3465df",isFavorite:!1,offers:["199e8e51-dc14-4795-9638-5f707452da51"],type:"bus"},{id:"58bae41c-eb1d-4ef5-ac46-b22681b052b1",basePrice:3905,dateFrom:"2024-12-17T11:38:08.471Z",dateTo:"2024-12-17T21:26:08.471Z",destination:"82a3bad6-6498-4989-ae4f-815082508c30",isFavorite:!1,offers:["73522a17-f05d-49b9-a141-5ebccae6fb24","d658acef-46f7-4c88-b7ed-df131ffabe0c","4a956f99-a055-4143-969f-b29f2be5da50"],type:"check-in"},{id:"ab96a7c9-cd35-4ae0-8ca6-33e50c3376a5",basePrice:8353,dateFrom:"2024-12-19T14:12:08.471Z",dateTo:"2024-12-21T11:32:08.471Z",destination:"c7fcf894-e8ef-4347-94cf-8c76aa6c6833",isFavorite:!1,offers:["d1d46527-003a-43e2-a3c1-714db831a54e"],type:"restaurant"},{id:"bcc01238-cfd9-4432-b53e-fcea1b958e08",basePrice:330,dateFrom:"2024-12-21T23:11:08.471Z",dateTo:"2024-12-23T20:10:08.471Z",destination:"ec9110f7-4767-4179-b856-5d8bb23324ec",isFavorite:!1,offers:["d82abaa6-4c4e-4bb4-a49d-83e80c37cdd5"],type:"drive"},{id:"91214a0f-dec3-4402-873c-a66f63a024f4",basePrice:1387,dateFrom:"2024-12-25T07:41:08.471Z",dateTo:"2024-12-27T08:06:08.471Z",destination:"82a3bad6-6498-4989-ae4f-815082508c30",isFavorite:!1,offers:[],type:"bus"},{id:"fc4b109b-7a99-444d-a583-caa344411cb8",basePrice:12,dateFrom:"2024-12-27T21:44:08.471Z",dateTo:"2024-12-29T10:43:08.471Z",destination:"ec9110f7-4767-4179-b856-5d8bb23324ec",isFavorite:!1,offers:["e3dbdc12-23b8-453f-afd1-e0dcb281bf7a","56b72afa-d7d0-4dab-9d80-e64a2442783e","73522a17-f05d-49b9-a141-5ebccae6fb24","d658acef-46f7-4c88-b7ed-df131ffabe0c","4a956f99-a055-4143-969f-b29f2be5da50"],type:"check-in"},{id:"0de5090a-72e9-418b-89b0-5926aea97d4a",basePrice:4884,dateFrom:"2024-12-31T10:15:08.471Z",dateTo:"2025-01-01T23:58:08.471Z",destination:"82a3bad6-6498-4989-ae4f-815082508c30",isFavorite:!1,offers:[],type:"drive"},{id:"4df8e4e0-bbca-4b72-91c3-ef2654b4d60f",basePrice:6597,dateFrom:"2025-01-02T10:15:08.471Z",dateTo:"2025-01-02T19:36:08.471Z",destination:"070ea513-2210-42df-bad4-ede76ba22a3e",isFavorite:!1,offers:["6e21cc5e-e5ef-453d-a401-86846f294d02"],type:"ship"},{id:"da0271c3-fc37-4eaa-a2be-290c8903b02f",basePrice:7863,dateFrom:"2025-01-03T22:15:08.471Z",dateTo:"2025-01-04T19:50:08.471Z",destination:"fdd837e1-fd2d-463c-9a2d-555cf8efa89e",isFavorite:!0,offers:["5093df18-a4d0-42f7-b9cd-b6ef378563fa"],type:"train"},{id:"5a73c621-2544-4995-990e-3ffaf72464f9",basePrice:9488,dateFrom:"2025-01-05T19:34:08.471Z",dateTo:"2025-01-06T16:19:08.471Z",destination:"466c2985-2db8-47fa-85e4-0d07cb9e48fe",isFavorite:!1,offers:["df01f087-8af8-4024-ade2-434e572a1939","0690c5cc-879c-4aa5-80c1-244935547967","bba6b2a4-115c-4470-9e70-bab52e7b6da9","61a27c8e-492d-4194-8d09-c85e8fbc0ed2","428136ce-b310-4e4e-bb3e-e09946178b81"],type:"taxi"},{id:"cf1362d0-2e46-4f39-aa39-85e2c602b7e8",basePrice:6644,dateFrom:"2025-01-08T06:43:08.471Z",dateTo:"2025-01-09T13:18:08.471Z",destination:"82a3bad6-6498-4989-ae4f-815082508c30",isFavorite:!1,offers:[],type:"sightseeing"},{id:"c6b22ee7-7613-4853-8baf-291c479d879a",basePrice:5731,dateFrom:"2025-01-10T14:06:08.471Z",dateTo:"2025-01-12T12:22:08.471Z",destination:"070ea513-2210-42df-bad4-ede76ba22a3e",isFavorite:!0,offers:["1021812a-82b3-4fb5-a657-51d6b005d366","4dc8e801-b123-489e-816a-1b900e12d270","151f488d-e03a-4347-8837-2e7171061983","7511ff9e-227d-4732-9e27-d4cd1b78c220","52cfccc0-c186-4dea-9fe4-b04528650af9"],type:"flight"},{id:"0e475bfd-d99a-412c-8270-efab3cfe7399",basePrice:3306,dateFrom:"2025-01-14T04:58:08.471Z",dateTo:"2025-01-14T18:23:08.471Z",destination:"ec9110f7-4767-4179-b856-5d8bb23324ec",isFavorite:!0,offers:["00fdf487-91f5-4175-97cc-4b8cf30240a0","6e21cc5e-e5ef-453d-a401-86846f294d02"],type:"ship"},{id:"4402d983-2d5e-46da-8c96-3c06f2b24e51",basePrice:1890,dateFrom:"2025-01-15T13:06:08.471Z",dateTo:"2025-01-16T01:26:08.471Z",destination:"070ea513-2210-42df-bad4-ede76ba22a3e",isFavorite:!0,offers:["61a27c8e-492d-4194-8d09-c85e8fbc0ed2","428136ce-b310-4e4e-bb3e-e09946178b81"],type:"taxi"},{id:"fdae4f8a-f63b-418c-8a92-2d4001eecad4",basePrice:5102,dateFrom:"2025-01-17T17:21:08.471Z",dateTo:"2025-01-19T05:47:08.471Z",destination:"ec9110f7-4767-4179-b856-5d8bb23324ec",isFavorite:!0,offers:["56b72afa-d7d0-4dab-9d80-e64a2442783e","73522a17-f05d-49b9-a141-5ebccae6fb24","d658acef-46f7-4c88-b7ed-df131ffabe0c","4a956f99-a055-4143-969f-b29f2be5da50"],type:"check-in"},{id:"59a69467-c2cc-45d2-bde2-10cb698e7260",basePrice:2276,dateFrom:"2025-01-21T04:56:08.471Z",dateTo:"2025-01-22T00:39:08.471Z",destination:"c7fcf894-e8ef-4347-94cf-8c76aa6c6833",isFavorite:!1,offers:["7511ff9e-227d-4732-9e27-d4cd1b78c220","52cfccc0-c186-4dea-9fe4-b04528650af9"],type:"flight"},{id:"f7737a0d-3124-49eb-8487-d16d1c690d42",basePrice:1237,dateFrom:"2025-01-22T22:40:08.471Z",dateTo:"2025-01-24T16:43:08.471Z",destination:"64a8701c-632e-48ae-9052-353c1a3465df",isFavorite:!1,offers:["6e21cc5e-e5ef-453d-a401-86846f294d02"],type:"ship"},{id:"73edeee1-d1fe-4371-a2f3-1012eaef876f",basePrice:2489,dateFrom:"2025-01-26T06:26:08.471Z",dateTo:"2025-01-27T18:41:08.471Z",destination:"fdd837e1-fd2d-463c-9a2d-555cf8efa89e",isFavorite:!0,offers:["151f488d-e03a-4347-8837-2e7171061983","7511ff9e-227d-4732-9e27-d4cd1b78c220","52cfccc0-c186-4dea-9fe4-b04528650af9"],type:"flight"},{id:"3a88f1e1-5926-43aa-aa65-be250ff0947f",basePrice:5807,dateFrom:"2025-01-28T23:33:08.471Z",dateTo:"2025-01-30T12:51:08.471Z",destination:"e4bc89ed-4df2-40a4-b8d1-21b953502799",isFavorite:!0,offers:["4dc8e801-b123-489e-816a-1b900e12d270","151f488d-e03a-4347-8837-2e7171061983","7511ff9e-227d-4732-9e27-d4cd1b78c220","52cfccc0-c186-4dea-9fe4-b04528650af9"],type:"flight"},{id:"413b04c2-c606-48f9-b0b7-d2a062bbbf6a",basePrice:7758,dateFrom:"2025-01-31T09:26:08.471Z",dateTo:"2025-02-02T04:15:08.471Z",destination:"64a8701c-632e-48ae-9052-353c1a3465df",isFavorite:!0,offers:["4a956f99-a055-4143-969f-b29f2be5da50"],type:"check-in"}],d="YYYY-MM-DDTHH:mm",f="HH:mm",l="YY/MM/DD HH:mm",u="DD MMM",h="everything",p="future",b="present",m="past",v={[h]:"Click New Event to create your first point",[m]:"There are no past events now",[b]:"There are no present events now",[p]:"There are no future events now"},y={DAY:"day",EVENT:"event",TIME:"time",PRICE:"price",OFFER:"offers"},$={CREATE:"CREATE",EDIT:"EDIT"},_={basePrice:0,destination:null,isFavorite:!1,offers:[],type:"flight"},g=e=>new Date(e.dateTo)<new Date,T=e=>new Date(e.dateFrom)>new Date,w=e=>{const t=new Date;return new Date(e.dateFrom)<=t&&new Date(e.dateTo)>=t},M={[h]:e=>e,[m]:e=>e.filter(g),[b]:e=>e.filter(w),[p]:e=>e.filter(T)},D=(e,t)=>M[t](e),E=(e,t)=>new Date(e.dateFrom)-new Date(t.dateFrom),F=(e,t)=>t.basePrice-e.basePrice,S=(e,t)=>{const n=Math.abs(new Date(e.dateFrom)-new Date(e.dateTo));return Math.abs(new Date(t.dateFrom)-new Date(t.dateTo))-n},C={[y.DAY]:e=>e.toSorted(E),[y.PRICE]:e=>e.toSorted(F),[y.TIME]:e=>e.toSorted(S),[y.EVENT]:()=>[],[y.OFFER]:()=>[]},Z=(e,t)=>C[t](e);class k{#e=null;#t=new Map;constructor(){if(new.target===k)throw new Error("Can't instantiate AbstractView, class instance only")}get element(){return this.#e||(this.#e=this.createElement(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template()")}#n=e=>{const t=e instanceof Element?e:this.element?.querySelector(e);if(!(t instanceof Element))throw new Error("Unable to create/remove event listener for non DOM Element");return t};createElement=e=>{if("string"==typeof e){const t=document.createElement("div");if(t.innerHTML=e,t.firstElementChild===t.lastElementChild)return t.firstElementChild;throw new Error("Can't create component from several sibling elements")}return null};removeElement(){this.#e&&(this.removeEventListeners(),this.#e.remove(),this.#e=null)}createEventListener=(e,t,n,i)=>{const{isPreventDefault:s=!1,isStopPropagation:a=!1,eventOptions:r}=i||{};if("function"!=typeof n)throw new Error('Argument "callback" is not a function');const o=this.#n(e),c=this.#t.get(o)||[];c.some((([e,i])=>e===t&&i===n))||(c.push([t,n]),this.#t.set(o,c),o.addEventListener(t,(e=>{s&&e.preventDefault(),a&&e.stopPropagation(),n(e)}),r))};removeEventListeners=()=>{for(const[e,t]of this.#t.entries())t.forEach((([t,n])=>e.removeEventListener(t,n)));this.#t.clear()}}function O(e,t,n="beforeend"){if(e=e instanceof k?e.element:e,t=t instanceof k?t.element:t,!(e instanceof Element&&t instanceof Element))throw new Error("Container or component aren't instance of Element");e.insertAdjacentElement(n,t)}const P=(e,t)=>{if(!e||!t)throw new Error("Can't replace non-existing elements");const n=e instanceof k?e.element:e,i=t instanceof k?t.element:t;if(!(n instanceof Element&&i instanceof Element))throw new Error("Can't replace non-Element instance");n.replaceWith(i)};class H extends k{#i=[];#s="";constructor(e,t){super(),this.#i=e,this.#s=t}get template(){return`\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${((e,t)=>e.map((({type:e,count:n})=>`\n    <div class="trip-sort__item  trip-sort__item--${e}">\n      <input id="sort-${e}" class="trip-sort__input  visually-hidden"\n        type="radio" name="trip-sort" value="sort-${e}" ${e===t?"checked":""} ${0===n?"disabled":""}>\n        <label class="trip-sort__btn" for="sort-${e}">${e}</label>\n    </div>`)).join(""))(this.#i,this.#s)}\n  </form>`}}let x=(e=21)=>{let t="",n=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&n[e]];return t};t().extend(s());const Y=(e,n,i,s)=>{const{id:a,basePrice:r,dateFrom:o,dateTo:c,destination:d,offers:f,type:u}=e||{},h=s===$.EDIT?"Delete":"Cancel",p=((e,t)=>`\n  <div class="event__type-list">\n    <fieldset class="event__type-group">\n      <legend class="visually-hidden">Event type</legend>\n        ${((e,t=[])=>t.map((t=>{const n=x();return`\n    <div class="event__type-item">\n      <input id="event-type-taxi-${n}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${e===t?"checked":""}>\n        <label class="event__type-label  event__type-label--${t}" for="event-type-taxi-${n}">${i=t,i?.replace(/^./i,(e=>e.toUpperCase()))}</label>\n    </div>`;var i})).join(""))(e,t)}\n    </fieldset>\n  </div>`)(u,i),b=(({type:e,destination:t},n=[])=>{const[i,s]=[x(),x()];return`\n    <div div class="event__field-group  event__field-group--destination" >\n      <label class="event__label  event__type-output" for="event-destination-${i}">${e}</label>\n      <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value="${t?t.name:""}" list="destination-list-${s}">\n      <datalist id="destination-list-${s}">\n          ${n.map((({name:e})=>`<option value="${e}"></option>`)).join("")}\n      </datalist>\n    </div>`})({type:u,destination:d},n),m=f.length>0?(e=>`\n    <section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n      <div class="event__available-offers">\n        ${(e=>e.map((({id:e,title:t,price:n,isChecked:i})=>`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}" type="checkbox" name="event-offer-${e}" ${i?"checked":""}>\n      <label class="event__offer-label" for="event-offer-${e}">\n        <span class="event__offer-title">${t}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${n}</span>\n      </label>\n    </div>`)).join(""))(e)}\n      </div>\n    </section>`)(f):"",v=d&&(d.pictures.length||d.description)?(({description:e,pictures:t})=>`\n    <section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      ${e?`<p class="event__destination-description">${e}</p>`:""}\n      ${t.length>0?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${((e=[])=>e.map((({src:e,description:t})=>`<img class="event__photo" src="${e}" alt="${t}">`)).join(""))(t)}\n        </div>\n      </div>`:""}\n    </section>`)(d):"",y=r>0?r:"",_=((e,t)=>{const n=x();return`\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-${n}">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-${n}" type="text" name="event-start-time" value="${e}">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-${n}">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-${n}" type="text" name="event-end-time" value="${t}">\n    </div>`})(t()(o).format(l),t()(c).format(l)),g=(e=>{const t=x();return`\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-${t}">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-${t}" type="text" name="event-price" value="${e}">\n    </div>`})(y);return`\n    <form class="event event--edit" action="#" method="post" data-event-id = ${a}>\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-${a}">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${u}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${a}" type="checkbox">\n          ${p}\n        </div>\n\n        ${b}\n        ${_}\n        ${g}\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">${h}</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Close event</span>\n        </button>\n      </header>\n\n      ${v||m?`\n        <section class="event__details">\n          ${m}\n          ${v}\n        </section>`:""}\n    </form>`};class j extends k{#a="";#r=[];#o=[];#c=[];#d=$.EDIT;#f=null;constructor(e,t,n,i=$.EDIT){super(),this.#a=e.id,this.#r=e,this.#o=t,this.#c=n,this.#d=i in $?i:$.EDIT,this.createEventListener(this.element,"submit",this.#l,{isPreventDefault:!0})}get template(){return Y(this.#r,this.#o,this.#c,this.#d)}setOnFormSubmitHandler=e=>{this.#f=e};#l=()=>{this.#f?.(this.#a)}}class I extends k{#u=null;#h=null;constructor(e){super(),this.#u=e}get template(){return(e=>{const{id:n,basePrice:i,destination:{name:s},dateFrom:a,dateTo:r,isFavorite:o,offers:c,type:l}=e||{},u=t()(a).format("YYYY-MM-DD"),h=t()(a).format("MMM DD"),[p,b,m]=((e,n)=>{const[i,s]=[t()(e),t()(n)],{days:a,hours:r,minutes:o}=t().duration(s.diff(i)).$d;return[i,s,`${a?`${a}D`.padStart(3,"0"):""} ${r?`${r}H`.padStart(3,"0"):""} ${o?`${o}M`.padStart(3,"0"):""}`]})(a,r),v=p.format(d),y=b.format(d),$=o?"event__favorite-btn--active":"";return`\n    <div class="event" data-event-id = ${n}>\n      <time class="event__date" datetime="${u}">${h}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${l}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${l} ${s}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${v}">${p.format(f)}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${y}">${b.format(f)}</time>\n        </p>\n        <p class="event__duration">${m}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${i}</span>\n      </p>\n      ${c.length>0?`\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${(e=>`${e.map((({title:e,price:t})=>`\n    <li class="event__offer">\n      <span class="event__offer-title">${e}</span>\n        &plus;&euro;&nbsp;\n      <span class="event__offer-price">${t}</span>\n    </li>`)).join("")}`)(c)}\n        </ul>`:""}\n      <button class="event__favorite-btn ${$}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>`})(this.#u)}setOnRemoveHandler=e=>{this.#h=e};removeElement=()=>{this.#h(),super.removeElement()}}class L extends k{#p=null;constructor(e){super(),this.#p=e}get template(){return'\n  <ul class="trip-events__list">\n  </ul>'}add=e=>{const t=new this.#p;O(this.element,t),O(t,e),e.setOnRemoveHandler((()=>t.removeElement()))};setEventToggleHandler=e=>{this.createEventListener(this.element,"click",e)};setEscKeyDownHandler=e=>{this.createEventListener(document.body,"keydown",e)}}class A extends k{#b="";constructor(e){super(),this.#b=e}get template(){return`<p class="trip-events__msg">${this.#b}</p>`}}class B extends k{constructor(){super()}get template(){return'<li class="trip-events__item"></li>'}}class V extends k{#m;constructor(e=!1){super(),this.#m=e}get template(){return`\n  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${this.#m?"disabled":""}>\n    New Event\n  </button>\n `}disable(){this.element.disabled=!0}enable(){this.element.disabled=!1}}class W extends k{#v=[];#y="";constructor(e,t){super(),this.#v=e,this.#y=t}get template(){return`\n  <form class="trip-filters" action="#" method="get">\n    ${((e,t)=>e.map((({type:e,count:n})=>`\n    <div class="trip-filters__filter">\n      <input id="filter-${e}" class="trip-filters__filter-input  visually-hidden"\n        type="radio" name="trip-filter" value="${e}" ${e===t?"checked":""} ${0===n?"disabled":""}>\n      <label class="trip-filters__filter-label" for="filter-${e}">${e}</label>\n    </div>`)).join(""))(this.#v,this.#y)}\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>`}}class R extends k{#$=null;constructor(e){super(),this.#$=e}get template(){return(()=>{const e=start?.destination.name,n=end?.destination.name,i=middle?middle?.destination.name:"...",s=start?.dateFrom===start?.dateTo?"DD":u;return`\n    <section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">${e} &mdash; ${i} &mdash; ${n}</h1>\n\n        <p class="trip-info__dates">${t()(start?.dateFrom).format(s)}&nbsp;&mdash;&nbsp;${t()(end?.dateTo).format(u)}</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>\n      </p>\n    </section>`})(this.#$)}}const U=document.querySelector(".trip-main"),N=U.querySelector(".trip-controls__filters"),z=document.querySelector(".trip-events"),q=new class{#$=[];#_=[];#o=[];#g=[];#T=h;get events(){return this.#$}get destinations(){return this.#o}get filters(){return e=this.#$,Object.entries(M).map((([t,n])=>({type:t,count:n(e).length})));var e}get sortItems(){return e=this.#$,Object.values(y).map((t=>({type:t,count:C[t](e).length})));var e}get filterType(){return this.#T}get offerTypes(){return this.#g.map((({type:e})=>e))}get tripInfo(){return 0===this.#$.length?null:{events:Z(this.#$,y.DAY),price:this.#$.reduce(((e,{basePrice:t})=>e+t),0)}}getDefaultEvent=()=>{const e=(new Date).toISOString(),t=this.#g.some((e=>e.type===_.type))?_.type:this.#g[0];return{..._,dateFrom:e,dateTo:e,offers:this.#w(t,_.offers),type:t}};#w=(e,t)=>(this.#g.find((t=>t.type===e))?.offers||[]).map((e=>({...e,isChecked:t.some((t=>t===e.id))})));init(){[this.#_,this.#g,this.#o]=((e=5)=>[a(c,e),o,r])(),this.#$=this.#_.map((e=>({...e,destination:this.#o.find((({id:t})=>t===e.destination)),offers:this.#w(e.type,e.offers)})))}};q.init();const G=new class{#M=null;#D=null;#E=null;#v=[];#$=[];#F=null;constructor(e,t,n){this.#M=e,this.#D=t,this.#F=n}init(){this.#$=Z(this.#F.events,y.DAY),0!==this.#$&&(this.#E=new R(this.#$),O(this.#M,this.#E,"afterbegin")),this.#v=new W(this.#F.filters,this.#F.filterType),O(this.#D,this.#v)}}(U,N,q);G.init();const J=new class{#S=null;#C=null;#s=y.PRICE;#Z=null;#t=new L(B);#k=new V;#$=[];#o=[];#c=[];#F=null;#O=new Map;#P="";constructor(e,t,n){this.#S=e,this.#F=n,this.#C=t}init(){this.#$=[...this.#F.events],this.#o=[...this.#F.destinations],this.#c=[...this.#F.offerTypes],this.#H(),O(this.#C,this.#k)}#H=()=>{const e=this.#F.filterType,t=D(this.#$,e);if(0===t.length)return this.#Z=new A(v[e]),void O(this.#S,this.#Z);O(this.#S,new H(this.#F.sortItems,this.#s)),O(this.#S,this.#t),this.#t.setEventToggleHandler(this.#x),this.#t.setEscKeyDownHandler(this.#Y),this.#j(Z(t,this.#s))};#j=e=>{for(const t of e){const e=new I(t),n=new j(t,this.#o,this.#c);n.setOnFormSubmitHandler(this.#I),this.#O.set(t.id,[e,n]),this.#t.add(e)}};#I=(e="")=>{const t=this.#P;if(this.#P){const[e,n]=this.#O.get(t);P(n,e),this.#P=""}if(e&&t!==e){const[t,n]=this.#O.get(e);P(t,n),this.#P=e}};#Y=e=>{"Escape"===e.key&&this.#P&&this.#I()};#x=({target:e})=>{if(e.matches(".event__rollup-btn")){const t=e.closest(".event"),n=t?.dataset.eventId;this.#I(n)}}}(z,U,q);J.init()})()})();
//# sourceMappingURL=bundle.b4f28b4a0f190047e604.js.map