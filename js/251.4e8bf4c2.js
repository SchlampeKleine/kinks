"use strict";(self["webpackChunkkinks"]=self["webpackChunkkinks"]||[]).push([[251],{1251:function(e,a,t){t.r(a),t.d(a,{default:function(){return _}});var l=t(6252),o=t(6612);const n={class:"category section is-centered"},s={class:"block"},r={class:"block"},c={key:0,class:"block"},i={class:"buttons is-right"},d={class:"block"},u={class:"columns is-multiline is-tablet"};function m(e,a,t,m,g,b){const p=(0,l.up)("Title"),k=(0,l.up)("LocaleEditor"),h=(0,l.up)("ModalButtonYamlEdit"),y=(0,l.up)("KinkSubCategory"),v=(0,l.up)("Kink");return(0,l.wg)(),(0,l.iD)("section",n,[(0,l._)("div",s,[(0,l.Wm)(p,{headerLevel:2},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(m.t("name",t.category.name)),1)])),_:1})]),(0,l._)("div",r,[m.getEditMode?((0,l.wg)(),(0,l.iD)("div",c,[(0,l._)("div",i,[(0,l.Wm)(k,{messages:b.localCategory.messages,"onUpdate:messages":a[0]||(a[0]=e=>b.localCategory.messages=e)},null,8,["messages"]),(0,l.Wm)(h,{dataObject:b.localCategory,"onUpdate:dataObject":a[1]||(a[1]=e=>b.localCategory=e)},null,8,["dataObject"])])])):(0,l.kq)("",!0)]),(0,l._)("div",d,[((0,l.wg)(),(0,l.j4)(l.Ob,null,[(0,l._)("div",u,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(b.localCategory.subcategories,(e=>((0,l.wg)(),(0,l.j4)(y,{id:t.id+"-"+e.name,key:"subcategories-"+e.name,subcategory:e,kinds:e.kinds,category:t.category.name},null,8,["id","subcategory","kinds","category"])))),128)),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(b.localCategory.kinds,(e=>((0,l.wg)(),(0,l.j4)(v,{id:t.id+"-"+e.name,key:"kink-"+e.name,kink:e,variants:e.variants,category:t.category.name,subcategory:!1},null,8,["id","kink","variants","category"])))),128))])],1024))])])}var g=t(4938),b=t(2174),p=t(8707),k=t(7729),h=t(9927),y=t(5476),v={name:"KinkCategory",props:{id:{type:String,required:!0},category:{type:Object,required:!0},subcategories:{kind:Array,default(){return[]}},kinds:{kind:Array,default(){return[]}},name:{type:String,required:!0}},setup(e){const{t:a}=(0,g.QT)({messages:e.category.messages||{en:{name:e.category.name}}}),{getEditMode:t}=(0,k.Z)();return{t:a,getEditMode:t}},computed:{localCategory:{get(){const e=this.category?this.category:{};return e.subcategories||(e.subcategories=[]),e.kinds||(e.kinds=[]),e}}},data(){return{debug:!1}},components:{LoaderBar:b.Z,ModalButtonYamlEdit:h.Z,Kink:(0,l.RC)({loader:()=>t.e(260).then(t.bind(t,6260)),loadingComponent:b.Z}),KinkSubCategory:(0,l.RC)({loader:()=>t.e(886).then(t.bind(t,5886)),loadingComponent:b.Z}),LocaleEditor:p.Z,Title:y.Z}},w=t(3744);const f=(0,w.Z)(v,[["render",m]]);var _=f},8707:function(e,a,t){t.d(a,{Z:function(){return x}});var l=t(6252),o=t(6612),n=t(8061);const s=(0,l._)("div",{class:"modal-background"},null,-1),r={class:"modal-content"},c={key:0,class:"box"},i={class:"field"},d={class:"field-label is-normal"},u={class:"label"},m={class:"field-body"},g={class:"field"},b={class:"control"},p=["value","onChange","placeholder"],k={key:1,class:"box"},h=(0,l.Uk)(" TODO: FIX THIS "),y={class:"field"},v={class:"field-label is-normal"},w={class:"label"},f={class:"field-body"},_={class:"field"},C={class:"control"},O=["placeholder"];function z(e,a,t,z,D,j){return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("button",{onClick:a[0]||(a[0]=e=>D.modalOpen=!0),class:"button is-small"},(0,o.zw)(z.t("edit-button")),1),((0,l.wg)(),(0,l.j4)(l.lR,{to:"body"},[(0,l.Wm)(n.uT,{name:"modal"},{default:(0,l.w5)((()=>[D.modalOpen?((0,l.wg)(),(0,l.iD)("div",{key:0,class:(0,o.C_)(["modal",{"is-active":D.modalOpen}])},[s,(0,l._)("div",r,[D.debug?((0,l.wg)(),(0,l.iD)("div",c,(0,o.zw)(z.localMessages),1)):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.messages,((e,a)=>((0,l.wg)(),(0,l.iD)("div",{key:a,class:"box"},[(0,l.Uk)((0,o.zw)(a)+" ",1),((0,l.wg)(),(0,l.iD)(l.HY,null,(0,l.Ko)(["name","description"],(e=>(0,l._)("div",{key:a+"-"+e},[(0,l._)("div",i,[(0,l._)("div",d,[(0,l._)("label",u,(0,o.zw)(z.t("label-"+e)),1),(0,l.Uk)(" "+(0,o.zw)(e)+": ",1)]),(0,l._)("div",m,[(0,l._)("div",g,[(0,l._)("p",b,[(0,l._)("input",{value:z.localMessages[a][e],onChange:t=>{z.localMessages[a][e]=t.target.value},placeholder:z.t("placeholder-"+e)},null,40,p)])])])])]))),64))])))),128)),((0,l.wg)(),(0,l.iD)("div",k,[h,(0,l._)("div",y,[(0,l._)("div",v,[(0,l._)("label",w,(0,o.zw)(z.t("label-locale")),1)]),(0,l._)("div",f,[(0,l._)("div",_,[(0,l._)("p",C,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":a[1]||(a[1]=e=>D.newLocale=e),placeholder:z.t("placeholder-addLocale")},null,8,O),[[n.nr,D.newLocale]])])])]),(0,l._)("button",{onClick:a[2]||(a[2]=a=>(e.$emit("update:messages",{[D.newLocale]:{name:"",description:""},...z.localMessages}),z.localMessages={[D.newLocale]:{name:"",description:""},...t.messages}))},(0,o.zw)(z.t("button-addLocale")),1)])]))]),(0,l._)("button",{class:"button",onClick:a[3]||(a[3]=a=>(e.$emit("update:messages",{...z.localMessages}),D.modalOpen=!1))}," Save "),(0,l._)("button",{class:"button",onClick:a[4]||(a[4]=e=>(D.modalOpen=!1,j.loadMessages))}," Cancel "),(0,l._)("button",{onClick:a[5]||(a[5]=e=>D.modalOpen=!1),class:(0,o.C_)(["modal-close",{"is-active":D.modalOpen}])}," Close ",2)],2)):(0,l.kq)("",!0)])),_:1})]))],64)}var D=t(4938),j=t(2931),L={name:"LocaleEditor",props:{messages:{type:Object,required:!0,default(){return{en:{name:"",description:""}}}}},emits:{"update:messages":null},data(){return{modalOpen:!1,debug:!0,newLocale:null}},methods:{loadMessages(){this.debug&&console.log({...this.messages}),this.localMessages={...this.messages}}},setup(e){const{t:a}=(0,D.QT)({}),t=(0,j.qj)(e.messages);return{t:a,localMessages:t}}};function q(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{"edit-button":e=>{const{normalize:a}=e;return a(["Editieren"])},"button-addLocale":e=>{const{normalize:a}=e;return a(["Sprache hinzufuegen"])},"label-locale":e=>{const{normalize:a}=e;return a(["Sprachenkuerzel"])},"placeholder-addLocale":e=>{const{normalize:a}=e;return a(["z.B. de oder de-AT"])},"placeholder-name":e=>{const{normalize:a}=e;return a(["Bennenung"])},"label-name":e=>{const{normalize:a}=e;return a(["Name"])},"placeholder-description":e=>{const{normalize:a}=e;return a(["Beschreibung des Objekts"])},"label-description":e=>{const{normalize:a}=e;return a(["Beschreibung"])}},en:{"edit-button":e=>{const{normalize:a}=e;return a(["Edit"])},"button-addLocale":e=>{const{normalize:a}=e;return a(["Add locale"])},"label-locale":e=>{const{normalize:a}=e;return a(["Locale Code"])},"placeholder-addLocale":e=>{const{normalize:a}=e;return a(["e.g. en or en-GB"])},"placeholder-name":e=>{const{normalize:a}=e;return a(["Name"])},"label-name":e=>{const{normalize:a}=e;return a(["Name"])},"placeholder-description":e=>{const{normalize:a}=e;return a(["Description of the object"])},"label-description":e=>{const{normalize:a}=e;return a(["Description"])}}}})}var M=t(3744);"function"===typeof q&&q(L);const S=(0,M.Z)(L,[["render",z]]);var x=S},9927:function(e,a,t){t.d(a,{Z:function(){return u}});var l=t(6252);const o={key:0},n={key:0};function s(e,a,t,s,r,c){const i=(0,l.up)("ModalYamlEdit");return t.dataObject?((0,l.wg)(),(0,l.iD)("div",o,[(0,l._)("button",{class:"button is-small",onClick:a[0]||(a[0]=e=>r.modalShow=!0)}," show modal "),((0,l.wg)(),(0,l.j4)(l.lR,{to:"body"},[r.modalShow?((0,l.wg)(),(0,l.iD)("div",n,[(0,l.Wm)(i,{dataObject:c.localDataObject,"onUpdate:dataObject":a[1]||(a[1]=e=>c.localDataObject=e),modalShow:r.modalShow,"onUpdate:modalShow":a[2]||(a[2]=e=>r.modalShow=e)},null,8,["dataObject","modalShow"])])):(0,l.kq)("",!0)]))])):(0,l.kq)("",!0)}var r=t(2174),c={name:"ModalButtonYamlEdit",inheritAttrs:!0,props:{dataObject:{type:Object,required:!0}},data(){return{modalShow:!1}},components:{ModalYamlEdit:(0,l.RC)({loader:()=>t.e(38).then(t.bind(t,3038)),loadingComponent:r.Z})},emits:["update:dataObject"],computed:{localDataObject:{get(){return this.dataObject},set(e){this.$emit("update:dataObject",e)}}}},i=t(3744);const d=(0,i.Z)(c,[["render",s]]);var u=d},5476:function(e,a,t){t.d(a,{Z:function(){return k}});var l=t(6252);const o={class:"column card"},n={class:"block name columns is-centered"},s={key:0,class:"title block has-text-primary has-text-centered column"},r={key:1,class:"title block has-text-primary has-text-centered column"},c={key:2,class:"title block has-text-primary has-text-centered column"},i={key:3,class:"title block has-text-primary has-text-centered column"},d={key:4,class:"title block has-text-primary has-text-centered column"},u={key:5,class:"title block has-text-primary has-text-centered column"};function m(e,a,t,m,g,b){return(0,l.wg)(),(0,l.iD)("div",o,[(0,l._)("div",n,[1===t.headerLevel?((0,l.wg)(),(0,l.iD)("h1",s,[(0,l.WI)(e.$slots,"default")])):(0,l.kq)("",!0),2===t.headerLevel?((0,l.wg)(),(0,l.iD)("h2",r,[(0,l.WI)(e.$slots,"default")])):(0,l.kq)("",!0),3===t.headerLevel?((0,l.wg)(),(0,l.iD)("h3",c,[(0,l.WI)(e.$slots,"default")])):(0,l.kq)("",!0),4===t.headerLevel?((0,l.wg)(),(0,l.iD)("h4",i,[(0,l.WI)(e.$slots,"default")])):(0,l.kq)("",!0),5===t.headerLevel?((0,l.wg)(),(0,l.iD)("h5",d,[(0,l.WI)(e.$slots,"default")])):(0,l.kq)("",!0),6===t.headerLevel?((0,l.wg)(),(0,l.iD)("h6",u,[(0,l.WI)(e.$slots,"default")])):(0,l.kq)("",!0)])])}var g={name:"Title",props:{headerLevel:{type:Number,required:!0}}},b=t(3744);const p=(0,b.Z)(g,[["render",m]]);var k=p}}]);