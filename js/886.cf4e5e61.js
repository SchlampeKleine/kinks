"use strict";(self["webpackChunkkinks"]=self["webpackChunkkinks"]||[]).push([[886],{5886:function(e,t,a){a.r(t),a.d(t,{default:function(){return C}});var s=a(6252),n=a(6612);const o={class:"subcategory column is-variable is-full"},r={key:0,class:"block"},i={class:"buttons is-right"},u={class:"columns is-variable is-multiline"};function l(e,t,a,l,c,g){const d=(0,s.up)("Title"),y=(0,s.up)("LocaleEditor"),b=(0,s.up)("ModalButtonYamlEdit"),m=(0,s.up)("Kink");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s.Wm)(d,{headerLevel:3},{default:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(l.t("name",a.subcategory.name)),1)])),_:1}),l.getEditMode?((0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",i,[(0,s.Wm)(y,{messages:g.localSubCategory.messages,"onUpdate:messages":t[0]||(t[0]=e=>g.localSubCategory.messages=e)},null,8,["messages"]),(0,s.Wm)(b,{dataObject:g.localSubCategory,"onUpdate:dataObject":t[1]||(t[1]=e=>g.localSubCategory=e)},null,8,["dataObject"])])])):(0,s.kq)("",!0),(0,s._)("div",u,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.kinds,(e=>((0,s.wg)(),(0,s.j4)(m,{id:a.id+"-"+e.name,key:[a.category,a.subcategory,e.name].join("-"),kink:e,variants:e.variants,category:a.category,subcategory:a.subcategory.name},null,8,["id","kink","variants","category","subcategory"])))),128))])])}var c=a(4938),g=a(2174),d=a(5476),y=a(8707),b=a(9927),m=a(7729),k={name:"KinkSubCategory",props:{category:{type:String},id:{type:String,required:!0},key:{type:String},subcategory:{type:Object,required:!0},name:{type:String},kinds:{type:Array,default(){return[]}}},setup(e){const{t:t}=(0,c.QT)({messages:e.subcategory.messages||{en:{name:e.subcategory.name}}}),{getEditMode:a}=(0,m.Z)();return{t:t,getEditMode:a}},components:{ModalButtonYamlEdit:b.Z,Kink:(0,s.RC)({loader:()=>a.e(260).then(a.bind(a,6260)),loadingComponent:g.Z}),LocaleEditor:y.Z,Title:d.Z},computed:{localSubCategory:{debug:!1,get(){return this.subcategory?this.subcategory:{}}}}},p=a(3744);const v=(0,p.Z)(k,[["render",l]]);var C=v}}]);