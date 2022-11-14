"use strict";(self["webpackChunkkinks"]=self["webpackChunkkinks"]||[]).push([[408],{4519:function(e,t,n){n.d(t,{Z:function(){return p}});n(1703);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return t.get?t.get.call(e):t.value}function s(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function a(e,t){var n=s(e,t,"get");return o(e,n)}let c;function i(e,t,n){l(e,t),t.set(e,n)}function l(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}var u=new WeakMap;c=Symbol.iterator;class p{*iterator(){for(const e in a(this,u)){const t=a(this,u)[e];yield t}}[c](){return this.iterator()}constructor(e,t){i(this,u,{writable:!0,value:[this.none,this.preference,this.nested]}),this.name=e,this.comperator=t}toString(){return`SortValue.${this.name}`}static compCategory(e,t){return e.category.toUpperCase()<t.category.toUpperCase()?-1:e.category.toUpperCase()>t.category.toUpperCase()?1:0}static compSubcategory(e,t){return e.subcategory.toUpperCase()<t.subcategory.toUpperCase()?-1:e.subcategory.toUpperCase()>t.subcategory.toUpperCase()?1:0}static compKink(e,t){return e.kink.toUpperCase()<t.kink.toUpperCase()?-1:e.kink.toUpperCase()>t.kink.toUpperCase()?1:0}static compVariant(e,t){return e.variant.toUpperCase()<t.variant.toUpperCase()?-1:e.variant.toUpperCase()>t.variant.toUpperCase()?1:0}static compPreference(e,t){return e.sortValue-t.sortValue}static compPreferenceFirst(e,t){return e["sortValue-first"]-t["sortValue-first"]}static compPreferenceSecond(e,t){return e["sortValue-second"]-t["sortValue-second"]}static compNone(e,t){return 0}static compComment(e,t){return""===e.comment||1-t.comment===""?0:1}}r(p,"preference",new p("preference",p.compPreference)),r(p,"nested",new p("nested",((e,t)=>p.compCategory(e,t)||p.compSubcategory(e,t)||p.compKink(e,t)||p.compVariant(e,t)))),r(p,"none",new p("none",p.compNone))},1408:function(e,t,n){n.r(t),n.d(t,{default:function(){return J}});var r=n(6252),o=n(6612),s=n(8061);const a=(0,r._)("h1",{class:"title suppress-print"},"ListView",-1),c={class:"table-container"},i={class:"table"},l={class:"button is-fullwidth"},u=(0,r._)("span",null," Category ",-1),p=(0,r.Uk)(),m={class:"icon"},f={class:"button is-fullwidth"},h=(0,r._)("span",null," Subcategory ",-1),k=(0,r.Uk)(),g={class:"icon"},y={class:"button is-fullwidth"},w=(0,r._)("span",null," Kink ",-1),b=(0,r.Uk)(),d={class:"icon"},v={class:"button is-fullwidth"},_=(0,r._)("span",null," Variant ",-1),C=(0,r.Uk)(),U={class:"icon"},S={class:"is-clickable icon-text-no",scope:"row"},V=(0,r._)("span",null," Role ",-1),E=[V],P=["value"],L={class:"button is-fullwidth"},R=(0,r._)("span",null," Preference ",-1),K=(0,r.Uk)(),T={class:"icon"},z=["value"],F={class:"is-clickable icon-text-no",scope:"row"},N=(0,r._)("span",null," Comment ",-1),O=(0,r.Uk)(),H={class:"icon"};function j(e,t,n,V,j,Z){const x=(0,r.up)("svg-icon");return(0,r.wg)(),(0,r.iD)(r.HY,null,[a,(0,r._)("div",c,[(0,r._)("table",i,[(0,r._)("caption",null,(0,o.zw)(V.t("listview_caption")),1),(0,r._)("thead",null,[(0,r._)("tr",null,[(0,r._)("th",{onClick:t[0]||(t[0]=()=>V.sortCategory=V.cycleTristate(V.sortCategory)),class:"is-clickable icon-text-no",scope:"row"},[(0,r._)("button",l,[u,p,(0,r._)("span",m,[(0,r.Wm)(x,{type:"mdi",path:V.chevronFromTristate(V.sortCategory)},null,8,["path"])])])]),(0,r._)("th",{onClick:t[1]||(t[1]=()=>V.sortSubcategory=V.cycleTristate(V.sortSubcategory)),class:"is-clickable icon-text-no",scope:"row"},[(0,r._)("button",f,[h,k,(0,r._)("span",g,[(0,r.Wm)(x,{type:"mdi",path:V.chevronFromTristate(V.sortSubcategory)},null,8,["path"])])])]),(0,r._)("th",{onClick:t[2]||(t[2]=()=>V.sortKink=V.cycleTristate(V.sortKink)),class:"is-clickable icon-text-no",scope:"row"},[(0,r._)("button",y,[w,b,(0,r._)("span",d,[(0,r.Wm)(x,{type:"mdi",path:V.chevronFromTristate(V.sortKink)},null,8,["path"])])])]),(0,r._)("th",{onClick:t[3]||(t[3]=()=>V.sortVariant=V.cycleTristate(V.sortVariant)),class:"is-clickable icon-text-no",scope:"row"},[(0,r._)("button",v,[_,C,(0,r._)("span",U,[(0,r.Wm)(x,{type:"mdi",path:V.chevronFromTristate(V.sortVariant)},null,8,["path"])])])]),(0,r._)("th",S,[(0,r._)("button",{class:"button is-fullwidth",onClick:t[4]||(t[4]=e=>V.showSelection=!V.showSelection)},E),V.showSelection?(0,r.wy)(((0,r.wg)(),(0,r.iD)("select",{key:0,class:"select is-multiple is-fullwidth","onUpdate:modelValue":t[5]||(t[5]=e=>V.selectedRoles=e),multiple:""},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(V.roles,(e=>((0,r.wg)(),(0,r.iD)("option",{value:e},(0,o.zw)(V.t([V.ROLEPREFIX,e].join("-"),e)),9,P)))),256))],512)),[[s.bM,V.selectedRoles]]):(0,r.kq)("",!0)]),(0,r._)("th",{onClick:t[7]||(t[7]=()=>V.sortPreference=V.cycleTristate(V.sortPreference)),class:"is-clickable icon-text-no",scope:"row"},[(0,r._)("button",L,[R,K,(0,r._)("span",T,[(0,r.Wm)(x,{type:"mdi",path:V.chevronFromTristate(V.sortSubcategory)},null,8,["path"])])]),V.showSelection?(0,r.wy)(((0,r.wg)(),(0,r.iD)("select",{key:0,class:"select is-multiple is-fullwidth","onUpdate:modelValue":t[6]||(t[6]=e=>V.selectedPreferenceLevels=e),multiple:""},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(V.preferenceLevels,(e=>((0,r.wg)(),(0,r.iD)("option",{value:e.value},(0,o.zw)(V.t(e.name)),9,z)))),256))],512)),[[s.bM,V.selectedPreferenceLevels]]):(0,r.kq)("",!0)]),(0,r._)("th",F,[(0,r._)("button",{onClick:t[8]||(t[8]=()=>V.sortComment=V.cycleTristate(V.sortComment)),class:"button is-fullwidth"},[N,O,(0,r._)("span",H,[(0,r.Wm)(x,{type:"mdi",path:V.chevronFromTristate(V.sortComment)},null,8,["path"])])])])])]),(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(V.curKinksList,((e,t)=>((0,r.wg)(),(0,r.iD)("tr",{key:[e.category,e.subcategory,e.kink,e.variant,e.roleName].join("-")},[(0,r._)("td",null,(0,o.zw)(V.t([e.category,"name"].join("-"),e.category)),1),(0,r._)("td",null,(0,o.zw)(""!==e.subcategory?V.t([e.category,e.subcategory,"name"].join("-"),e.subcategory):""),1),(0,r._)("td",null,(0,o.zw)(V.t([e.category,e.subcategory,e.kink,"name"].join("-"),e.kink)),1),(0,r._)("td",null,(0,o.zw)(""!==e.variant?V.t([e.category,e.subcategory,e.kink,e.variant,"name"].join("-"),e.variant):""),1),(0,r._)("td",null,(0,o.zw)(V.t([V.ROLEPREFIX,e.roleName].join("-"),e.roleName)),1),(0,r._)("td",{class:(0,o.C_)(["preferencelevel-"+e["preferenceLevel"]])},(0,o.zw)(e.preferenceLevel),3),(0,r._)("td",null,(0,o.zw)(e.comment),1)])))),128))])])])],64)}n(6699);var Z=n(4073),x=n.n(Z),D=n(3907),W=n(2931),Y=n(8633),q=n(9517),I=n(4938),M=n(4519),G=n(2273),X=n(5317),A={name:"ListView",setup(){const e=(0,D.oR)(),t=(0,W.iH)(0),n=(0,W.iH)(0),o=(0,W.iH)(0),s=(0,W.iH)(0),a=(0,W.iH)(0),c=(0,W.iH)(0),i=(0,r.Fl)((()=>e.getters["CurKinks/getCurKinksList"].sort(((e,r)=>(0,W.SU)(t)*M.Z.compCategory(e,r)||(0,W.SU)(n)*M.Z.compSubcategory(e,r)||(0,W.SU)(o)*M.Z.compKink(e,r)||(0,W.SU)(s)*M.Z.compVariant(e,r)||(0,W.SU)(a)*M.Z.compPreference(e,r)||(0,W.SU)(c)*M.Z.compComment(e,r))))),{t:l}=(0,I.QT)({messages:(0,W.SU)(i).map((e=>e.messages)).concat((0,W.SU)(i).map((e=>e.roleMessages))).concat((0,W.SU)(x()).preferenceLevels.map((e=>e.messages))).reduce(((e,t)=>(0,Y.YC)(e,t)),{}),useScope:"global"});function u(e){return(e+2)%3-1}function p(e){return-1===e?X.CW:1===e?X.Waq:X.VYU}const m=(0,W.qj)([...(0,W.SU)(i).filter((e=>"NOROLES"!==e.roleName)).map((e=>e.roleName)).filter(((e,t,n)=>n.indexOf(e)===t))]),f=(0,W.iH)([...(0,W.SU)(m)]),h=(0,W.qj)([...(0,W.SU)(x()).preferenceLevels.map((e=>({name:e.name,value:e.sortValue}))).filter(((e,t,n)=>n.indexOf(e)===t)).concat({name:"NOPREFERENCE",value:0}).sort(M.Z.compPreference)]),k=(0,W.iH)([...h.map((e=>e.value))]),g=(0,r.Fl)((()=>(0,W.SU)(i).filter((e=>0===(0,W.SU)(f).length||(0,W.SU)(f).includes(e.roleName))).filter((e=>0===(0,W.SU)(k).length||(0,W.SU)(k).includes(e.sortValue))))),y=(0,W.iH)(!1);return{showSelection:y,selectedRoles:f,roles:m,selectedPreferenceLevels:k,preferenceLevels:h,curKinksList:g,SortValues:Object.values(M.Z),SortValue:M.Z,t:l,ROLEPREFIX:q.dr,sortCategory:t,sortSubcategory:n,sortKink:o,sortVariant:s,sortPreference:a,sortComment:c,cycleTristate:u,chevronFromTristate:p}},components:{SvgIcon:G.Z}};function Q(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{listview_caption:e=>{const{normalize:t}=e;return t(["Übersicht der Kinks"])},NOPREFERENCE:e=>{const{normalize:t}=e;return t(["Ohne Auswahl"])}},en:{listview_caption:e=>{const{normalize:t}=e;return t(["Kink preference overview"])},"role-NOROLES":e=>{const{normalize:t}=e;return t([])},NOPREFERENCE:e=>{const{normalize:t}=e;return t(["Empty"])}}}})}var $=n(3744);"function"===typeof Q&&Q(A);const B=(0,$.Z)(A,[["render",j]]);var J=B}}]);