"use strict";(self["webpackChunkkinks"]=self["webpackChunkkinks"]||[]).push([[27],{1645:function(e,n,l){l.r(n),l.d(n,{default:function(){return L}});var s=l(6252),i=l(6612);const r={class:"section"},o={class:"title"},t={class:"columns"},u={class:"column"},a={class:"column"},c={class:"column"},f={class:"columns"},d={class:"column"},k={class:"columns"},m={class:"column"},p={key:0,class:"column"},K={class:"column"},_={class:"columns"},g={class:"column"},v={class:"column"},P={class:"columns"},M={class:"column"};function S(e,n,l,S,b,h){const w=(0,s.up)("ProfilesSaveMenu"),U=(0,s.up)("ProfilesResetMenu"),Z=(0,s.up)("ProfilesLoadMenu"),D=(0,s.up)("ProfilesShareMenu"),z=(0,s.up)("ProfilesImportMenu"),W=(0,s.up)("ProfilesUploadMenu"),y=(0,s.up)("ProfilesDownloadMenu"),I=(0,s.up)("ProfilesDebugMenu");return(0,s.wg)(),(0,s.iD)("section",r,[(0,s._)("h1",o,(0,i.zw)(S.t("profiles_title")),1),(0,s._)("div",t,[(0,s._)("div",u,[(0,s.Wm)(w,{defaultKinks:b.defaultKinks,user:h.localUser,"onUpdate:user":n[0]||(n[0]=e=>h.localUser=e)},null,8,["defaultKinks","user"])]),(0,s._)("div",a,[(0,s.Wm)(U,{defaultKinks:b.defaultKinks},null,8,["defaultKinks"])]),(0,s._)("div",c,[(0,s.Wm)(Z,{profileImported:l.profileImported,defaultKinks:b.defaultKinks,allKinks:h.localAllKinks,"onUpdate:allKinks":n[1]||(n[1]=e=>h.localAllKinks=e)},null,8,["profileImported","defaultKinks","allKinks"])])]),(0,s._)("div",f,[(0,s._)("div",d,[(0,s._)("div",k,[(0,s._)("div",m,[(0,s.Wm)(D,{curKinks:S.curKinks},null,8,["curKinks"])]),S.profileString?((0,s.wg)(),(0,s.iD)("div",p,[(0,s.Wm)(z,{profileString:S.profileString,profileName:l.profileName},null,8,["profileString","profileName"])])):(0,s.kq)("",!0)])]),(0,s._)("div",K,[(0,s._)("div",_,[(0,s._)("div",g,[(0,s.Wm)(W,{curKinks:S.curKinks,"onUpdate:curKinks":n[2]||(n[2]=e=>S.curKinks=e)},null,8,["curKinks"])]),(0,s._)("div",v,[(0,s.Wm)(y,{curKinks:S.curKinks},null,8,["curKinks"])])])])]),(0,s._)("div",P,[(0,s._)("div",M,[b.isDebug?((0,s.wg)(),(0,s.j4)(I,{key:0})):(0,s.kq)("",!0)])])])}var b=l(2557),h=l.n(b),w=l(4938),U=l(3907),Z=l(2931),D=l(4233),z=l(961),W=l(3690),y=l(6351),I=l(9462),A=l(2043),F=l(1827),N=l(4175),C=(l(3202),{name:"Profiles",props:{profileName:{type:String},profileString:{type:String},profileImported:{type:String}},data(){return{defaultKinks:h(),isDebug:!1}},setup(e){const{t:n}=(0,w.QT)({}),l=(0,U.oR)(),i=(0,Z.iH)(!1);return{t:n,curKinks:(0,s.Fl)((()=>l.state.CurKinks.curKinks)),allKinks:(0,s.Fl)((()=>l.state.AllKinks.userKinks)),user:(0,s.Fl)((()=>l.state.User.currentUsername)),profileString:(0,s.Fl)((()=>e.profileString)),showModal:i}},components:{ProfilesSaveMenu:D.Z,ProfilesLoadMenu:z.Z,ProfilesResetMenu:W.Z,ProfilesDebugMenu:y.Z,ProfilesShareMenu:A.Z,ProfilesDownloadMenu:I.Z,ProfilesUploadMenu:F.Z,ProfilesImportMenu:N.Z},methods:{},computed:{localUser:{get(){return this.user},set(e){this.$emit("update:user",e)}},localAllKinks:{get(){return this.allKinks},set(e){this.$emit("update:allKinks",e)}}}});function G(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{button_kinkmanagement:e=>{const{normalize:n}=e;return n(["Kinks verwalten"])},button_edit_mode:e=>{const{normalize:n}=e;return n(["Aendern aktivieren"])},profiles_title:e=>{const{normalize:n}=e;return n(["Profile"])}},en:{button_kinkmanagement:e=>{const{normalize:n}=e;return n(["Manage kinks"])},button_edit_mode:e=>{const{normalize:n}=e;return n(["Toggle edit mode"])},profiles_title:e=>{const{normalize:n}=e;return n(["Profiles"])}}}})}var R=l(3744);"function"===typeof G&&G(C);const q=(0,R.Z)(C,[["render",S]]);var L=q}}]);