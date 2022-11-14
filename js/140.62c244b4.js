"use strict";(self["webpackChunkkinks"]=self["webpackChunkkinks"]||[]).push([[140],{4398:function(e,t,n){n.d(t,{RN:function(){return T}});var s=n(6252),o=n(8061),r=n(6612);const a=["innerHTML"];function i(e,t,n,i,l,u){return(0,s.wg)(),(0,s.j4)(o.uT,{"enter-active-class":u.transition.enter,"leave-active-class":u.transition.leave},{default:(0,s.w5)((()=>[(0,s.wy)((0,s._)("div",{class:(0,r.C_)(["c-toast",`c-toast--${n.type}`,`c-toast--${n.position}`]),onMouseover:t[0]||(t[0]=e=>u.toggleTimer(!0)),onMouseleave:t[1]||(t[1]=e=>u.toggleTimer(!1)),onClick:t[2]||(t[2]=(...e)=>u.click&&u.click(...e)),role:"alert",innerHTML:n.message},null,42,a),[[o.F8,l.isActive]])])),_:1},8,["enter-active-class","leave-active-class"])}const l=e=>{"undefined"!==typeof e.remove?e.remove():e.parentNode.removeChild(e)};class u{constructor(e,t){this.startedAt=Date.now(),this.callback=e,this.delay=t,this.timer=setTimeout(e,t)}pause(){this.stop(),this.delay-=Date.now()-this.startedAt}resume(){this.stop(),this.startedAt=Date.now(),this.timer=setTimeout(this.callback,this.delay)}stop(){clearTimeout(this.timer)}}const c={TOP_RIGHT:"top-right",TOP:"top",TOP_LEFT:"top-left",BOTTOM_RIGHT:"bottom-right",BOTTOM:"bottom",BOTTOM_LEFT:"bottom-left"};var d=Object.freeze(c);function p(e,t,n){let s=null;switch(e){case c.TOP:case c.TOP_RIGHT:case c.TOP_LEFT:s=t;break;case c.BOTTOM:case c.BOTTOM_RIGHT:case c.BOTTOM_LEFT:s=n;break}return s}class h{constructor(){this.queue={}}$on(e,t){this.queue[e]=this.queue[e]||[],this.queue[e].push(t)}$off(e,t){if(this.queue[e])for(var n=0;n<this.queue[e].length;n++)if(this.queue[e][n]===t){this.queue[e].splice(n,1);break}}$emit(e,t){this.queue[e]&&this.queue[e].forEach((function(e){e(t)}))}}var m=new h,f={name:"toast",props:{message:{type:String,required:!0},type:{type:String,default:"default"},position:{type:String,default:d.BOTTOM_RIGHT,validator(e){return Object.values(d).includes(e)}},maxToasts:{type:[Number,Boolean],default:!1},duration:{type:[Number,Boolean],default:4e3},dismissible:{type:Boolean,default:!0},queue:{type:Boolean,default:!1},pauseOnHover:{type:Boolean,default:!0},useDefaultCss:{type:Boolean,default:!0},onClose:{type:Function,default:()=>{}},onClick:{type:Function,default:()=>{}}},data(){return{isActive:!1,parentTop:null,parentBottom:null,isHovered:!1,timer:null}},beforeMount(){this.createParents(),this.setDefaultCss(),this.setupContainer()},mounted(){this.showNotice(),m.$on("toast-clear",this.close)},methods:{createParents(){this.parentTop=document.querySelector(".c-toast-container--top"),this.parentBottom=document.querySelector(".c-toast-container--bottom"),this.parentTop&&this.parentBottom||(this.parentTop||(this.parentTop=document.createElement("div"),this.parentTop.className="c-toast-container c-toast-container--top"),this.parentBottom||(this.parentBottom=document.createElement("div"),this.parentBottom.className="c-toast-container c-toast-container--bottom"))},setDefaultCss(){const e=this.useDefaultCss?"add":"remove";this.parentTop.classList[e]("v--default-css"),this.parentBottom.classList[e]("v--default-css")},setupContainer(){const e=document.body;e.appendChild(this.parentTop),e.appendChild(this.parentBottom)},shouldQueue(){return!(!this.queue&&!1===this.maxToasts)&&(!1!==this.maxToasts?this.maxToasts<=this.parentTop.childElementCount+this.parentBottom.childElementCount:this.parentTop.childElementCount>0||this.parentBottom.childElementCount>0)},showNotice(){this.shouldQueue()?this.queueTimer=setTimeout(this.showNotice,250):(this.correctParent.insertAdjacentElement("afterbegin",this.$el),this.isActive=!0,this.timer=!1!==this.duration?new u(this.close,this.duration):null)},click(){this.onClick.apply(null,arguments),this.dismissible&&this.close()},toggleTimer(e){this.timer&&this.pauseOnHover&&(e?this.timer.pause():this.timer.resume())},stopTimer(){this.timer&&this.timer.stop(),clearTimeout(this.queueTimer)},close(){this.stopTimer(),this.isActive=!1,setTimeout((()=>{this.onClose.apply(null,arguments),l(this.$el)}),150)}},computed:{correctParent(){return p(this.position,this.parentTop,this.parentBottom)},transition(){return p(this.position,{enter:"fadeInDown",leave:"fadeOut"},{enter:"fadeInUp",leave:"fadeOut"})}},beforeUnmount(){m.$off("toast-clear",this.close)}},_=n(3744);const v=(0,_.Z)(f,[["render",i]]);var b=v;const k=()=>"undefined"!==typeof document&&document.createElement("div"),g=(e,{props:t,children:n,element:r,app:a}={})=>{let i=r||k(),l=(0,s.h)(e,t,n);a&&a._context&&(l.appContext=a._context),(0,o.sY)(l,i);const u=()=>{i&&(0,o.sY)(null,i),i=null,l=null};return{vNode:l,destroy:u,el:i}};var w=g;const y=(e={})=>({show(t,n={}){let s={message:t,...n};const o=w(b,{props:{...e,...s}});return o},clear(){m.$emit("toast-clear")},success(e,t={}){return t.type="success",this.show(e,t)},error(e,t={}){return t.type="error",this.show(e,t)},info(e,t={}){return t.type="info",this.show(e,t)},warning(e,t={}){return t.type="warning",this.show(e,t)}});var T=y;const z=(e,t={})=>{let n=T(t);e.$toast=n,e.config.globalProperties.$toast=n};b.install=z},6351:function(e,t,n){n.d(t,{Z:function(){return m}});var s=n(6252),o=n(6612);const r={class:"box"},a={class:"field"},i={class:"control"};function l(e,t,n,l,u,c){return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",a,[(0,s._)("div",i,[(0,s._)("button",{class:"button",onClick:t[0]||(t[0]=(...e)=>c.dumpMyKinks&&c.dumpMyKinks(...e))},(0,o.zw)(l.t("button_dump")),1)])])])}var u=n(4938),c={name:"ProfilesDebugMenu",setup(){const{t:e}=(0,u.QT)({});return{t:e}},methods:{dumpMyKinks(){console.log(this.myKinks)}}};function d(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{button_dump:e=>{const{normalize:t}=e;return t(["Kinks dumpen"])}},en:{button_dump:e=>{const{normalize:t}=e;return t(["Dump my kinks"])}}}})}var p=n(3744);"function"===typeof d&&d(c);const h=(0,p.Z)(c,[["render",l]]);var m=h},9462:function(e,t,n){n.d(t,{Z:function(){return b}});var s=n(6252),o=n(6612);const r={class:"box"},a={class:"field"},i={class:"control"},l={class:"icon"};function u(e,t,n,u,c,d){const p=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",a,[(0,s._)("div",i,[(0,s._)("button",{class:"button is-fullwidth",onClick:t[0]||(t[0]=e=>d.downloadCurKinks(u.encodedKinks,u.user))},[(0,s._)("span",l,[(0,s.Wm)(p,{type:"mdi",path:u.downloadIconPath},null,8,["path"])]),(0,s._)("span",null,(0,o.zw)(u.t("button_download")),1)])])])])}var c=n(4938),d=n(3907),p=n(2273),h=n(5317),m={name:"ProfilesDownloadMenu",setup(){const{t:e}=(0,c.QT)({}),t=(0,d.oR)();return{t:e,downloadIconPath:h.ZkO,encodedKinks:(0,s.Fl)((()=>t.getters["CurKinks/getCurKinksAsYAML"])),user:(0,s.Fl)((()=>t.state.User.currentUsername))}},components:{SvgIcon:p.Z},methods:{downloadCurKinks(e,t){function n(e,t){const n=document.createElement("a");n.setAttribute("href",`data:text/plain;charset=utf-8,${encodeURIComponent(t)}`),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}const s=`${t||"kinks"}.yaml`;n(s,e)}}};function f(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{button_download:e=>{const{normalize:t}=e;return t(["Kinks runterladen"])}},en:{button_download:e=>{const{normalize:t}=e;return t(["Download my kinks"])}}}})}var _=n(3744);"function"===typeof f&&f(m);const v=(0,_.Z)(m,[["render",u]]);var b=v},4175:function(e,t,n){n.d(t,{Z:function(){return U}});var s=n(6252),o=n(8061),r=n(6612);const a={class:"box"},i={class:"block"},l={class:"field has-addons"},u={class:"control"},c=(0,s._)("label",{for:"profileImportProfilename",class:"label hidden-visually is-sr-only"}," Profilename ",-1),d={class:"control is-fullwidth"},p=["disabled"],h={class:"icon"},m={class:"is-hidden-touch"};function f(e,t,n,f,_,v){const b=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",i,[(0,s._)("div",l,[(0,s._)("div",u,[c,(0,s.wy)((0,s._)("input",{id:"profileImportProfilename",class:"input",type:"text",placeholder:"Name","onUpdate:modelValue":t[0]||(t[0]=e=>f.user=e)},null,512),[[o.nr,f.user,void 0,{lazy:!0}]])]),(0,s._)("div",d,[(0,s._)("button",{class:"button",disabled:!f.canImportProfile(f.user),onClick:t[1]||(t[1]=e=>f.saveKinksForUser(f.user,f.decodeProfile(n.profileString)))},[(0,s._)("span",h,[(0,s.Wm)(b,{type:"mdi",path:f.importIconPath},null,8,["path"])]),(0,s._)("span",m,(0,r.zw)(f.t("button_importprofilestring")),1)],8,p)])])]),(0,s._)("p",{class:(0,r.C_)({help:1,"is-warning":f.warnReusedName(f.user)})},(0,r.zw)(f.warnReusedName(f.user)||f.t("help_field_profilename")),3)])}n(6699);var _=n(2119),v=n(3907),b=n(4938),k=n(2931),g=n(7385),w=n(4398),y=n(2273),T=n(5317),z={name:"ProfilesImportMenu",props:{profileString:{type:String},profileName:{type:String}},data(){return{}},setup(e){const{t:t}=(0,b.QT)({}),n=(0,_.tv)(),o=(0,v.oR)(),r=(0,k.iH)(e.profileName),a=(0,w.RN)({}),i=(0,s.Fl)((()=>o.getters["AllKinks/users"])),l=(e,s)=>o.dispatch("AllKinks/saveKinksForUser",{username:e,kinks:s}).then(a.show(t("message_import_successfull",{username:e}))&&n.push({name:"profiles",query:{profileName:(0,k.SU)(r),profileImported:e}})),u=e=>!!(0,k.SU)(i).includes((0,k.SU)(e))&&t("message_warn_profilereused"),c=(0,k.iH)(e.profileString),d=e=>e&&""!==e&&(0,k.SU)(c)&&""!==(0,k.SU)(c),p=e=>(0,g.g)(e);return d((0,k.SU)(r))&&l((0,k.SU)(r),p((0,k.SU)(c))),{user:r,importIconPath:T.A6b,t:t,users:i,warnReusedName:u,saveKinksForUser:l,toaster:a,canImportProfile:d,localProfileString:c,decodeProfile:p}},components:{SvgIcon:y.Z}};function K(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{button_importprofilestring:e=>{const{normalize:t}=e;return t(["Profil importieren"])},message_warn_profilereused:e=>{const{normalize:t}=e;return t(["Dieser Profilname ist bereits in Verwendung; der Importvorgang wird das bestehende Profil überschreiben."])},message_import_successfull:e=>{const{normalize:t,interpolate:n,named:s}=e;return t(["Profil ",n(s("username"))," erfolgreich importiert. Es kann nun geladen werden."])},help_field_profilename:e=>{const{normalize:t}=e;return t(["Ein Name oder eine Rolle, um diese Praeferenzen auf dem lokalen Rechner zuordnen zu können"])}},en:{button_importprofilestring:e=>{const{normalize:t}=e;return t(["import profile"])},message_warn_profilereused:e=>{const{normalize:t}=e;return t(["This profilename is already used; importing will overwrite the existing profile."])},help_field_profilename:e=>{const{normalize:t}=e;return t(["A name or role to identify these preferences on the local computer"])},message_import_successfull:e=>{const{normalize:t,interpolate:n,named:s}=e;return t(["Sucessfully imported the profile ",n(s("username")),". You can load it now."])}}}})}var C=n(3744);"function"===typeof K&&K(z);const P=(0,C.Z)(z,[["render",f]]);var U=P},3202:function(e,t,n){n(6252),n(8061);Boolean,n(3744)},961:function(e,t,n){n.d(t,{Z:function(){return U}});var s=n(6252),o=n(6612),r=n(8061);const a={class:"box"},i={class:"block"},l={class:"field has-addons"},u={class:"control is-expanded"},c={class:"select is-fullwidth"},d={disabled:"",value:""},p={class:"control"},h=["disabled"],m={class:"icon"},f={class:"is-hidden-touch"};function _(e,t,n,_,v,b){const k=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",i,[(0,s._)("div",l,[(0,s._)("div",u,[(0,s._)("div",c,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>_.loadUser=e)},[(0,s._)("option",d,(0,o.zw)(_.t("loadUser_choice")),1),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(_.users,(e=>((0,s.wg)(),(0,s.iD)("option",{key:e},(0,o.zw)(e),1)))),128))],512),[[r.bM,_.loadUser]])])]),(0,s._)("div",p,[(0,s._)("button",{class:"button",onClick:t[1]||(t[1]=e=>_.loadKinksForUser(_.loadUser)),disabled:!b.canLoadKinks(_.loadUser)},[(0,s._)("span",m,[(0,s.Wm)(k,{type:"mdi",path:_.loadIconPath},null,8,["path"])]),(0,s._)("span",f,(0,o.zw)(_.t("button_load")),1)],8,h)])])]),(0,s._)("p",{class:(0,o.C_)({help:1,"is-warning":_.warnUnsavedChanges})},(0,o.zw)(_.warnUnsavedChanges||_.t("help_field_loadUser")),3)])}n(6699);var v=n(2119),b=n(4938),k=n(3907),g=n(2931),w=n(4398),y=n(2273),T=n(5317),z={name:"ProfilesLoadMenu",props:{profileImported:{type:String}},setup(e){const{t:t}=(0,b.QT)({}),n=(0,v.tv)(),o=(0,g.iH)(e.profileImported),r=(0,k.oR)(),a=(0,w.RN)({}),i=e=>r.dispatch("AllKinks/loadKinksForUser",e).then(a.show(t("message_load_successfull",{user:e}))&&n.push({name:"profiles",query:{profileName:(0,g.SU)(e)}})),l=(0,s.Fl)((()=>r.getters["AllKinks/users"])),u=(0,s.Fl)((()=>r.getters["CurKinks/getCurKinksChangedState"]));(0,g.SU)(o)&&!(0,g.SU)(u)&&i((0,g.SU)(o));const c=(0,s.Fl)((()=>!!(0,g.SU)(u)&&t("message_warn_unsavedchanges")));return{t:t,loadIconPath:T.IC9,loadKinksForUser:i,loadUser:o,users:l,changed:u,warnUnsavedChanges:c}},components:{SvgIcon:y.Z},methods:{canLoadKinks(e){return this.users.includes(e)}}};function K(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{loadUser_choice:e=>{const{normalize:t}=e;return t(["Bitte waehle den Nutzer aus, dessen Praeferenzen du laden moechtest.\n"])},help_field_loadUser:e=>{const{normalize:t}=e;return t(["Kennzeichnug der Praeferenzen, die geladen werden sollen"])},button_load:e=>{const{normalize:t}=e;return t(["Kinks laden"])},message_load_successfull:e=>{const{normalize:t,interpolate:n,named:s}=e;return t(["Das Profile ",n(s("user"))," wurde erfolgreich geladen"])},message_warn_unsavedchanges:e=>{const{normalize:t}=e;return t(["Das aktuelle Profil wurde seit der letzten Änderung nicht gespeichert, beim Laden werden diese verworfen"])}},en:{loadUser_choice:e=>{const{normalize:t}=e;return t(["Please select the user to load the preferences for\n"])},help_field_loadUser:e=>{const{normalize:t}=e;return t(["Identifier of the saved preferences to load"])},button_load:e=>{const{normalize:t}=e;return t(["Load my kinks"])},message_load_successfull:e=>{const{normalize:t,interpolate:n,named:s}=e;return t(["The profile ",n(s("user"))," was loaded successfully"])},message_warn_unsavedchanges:e=>{const{normalize:t}=e;return t(["The current Profile was not saved since the last change. All changes will be lost on loading."])}}}})}var C=n(3744);"function"===typeof K&&K(z);const P=(0,C.Z)(z,[["render",_]]);var U=P},3690:function(e,t,n){n.d(t,{Z:function(){return b}});var s=n(6252),o=n(6612);const r={class:"box"},a={class:"field"},i={class:"control"},l={class:"icon"};function u(e,t,n,u,c,d){const p=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",a,[(0,s._)("div",i,[(0,s._)("button",{class:"button is-fullwidth",onClick:t[0]||(t[0]=(...e)=>u.resetCurKinks&&u.resetCurKinks(...e))},[(0,s._)("span",l,[(0,s.Wm)(p,{type:"mdi",path:u.restoreIconPath},null,8,["path"])]),(0,s._)("span",null,(0,o.zw)(u.t("button_reset")),1)])])])])}var c=n(4938),d=n(3907),p=n(2273),h=n(5317),m={name:"ProfilesResetMenu",props:{defaultKinks:{type:Object,required:!0}},setup(){const{t:e}=(0,c.QT)({}),t=(0,d.oR)(),n=e=>t.dispatch("CurKinks/resetCurKinks");return{t:e,restoreIconPath:h.mBz,resetCurKinks:n}},components:{SvgIcon:p.Z}};function f(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{button_reset:e=>{const{normalize:t}=e;return t(["Standard wiederherstellen"])}},en:{button_reset:e=>{const{normalize:t}=e;return t(["Reset my kinks"])}}}})}var _=n(3744);"function"===typeof f&&f(m);const v=(0,_.Z)(m,[["render",u]]);var b=v},4233:function(e,t,n){n.d(t,{Z:function(){return K}});var s=n(6252),o=n(8061),r=n(6612);const a={class:"box"},i={class:"field has-addons"},l={class:"control"},u=(0,s._)("label",{for:"profileSaveForName",class:"label hidden-visually is-sr-only"}," Name ",-1),c={class:"control"},d=["aria-label","disabled"],p={class:"icon"},h={class:"is-hidden-touch"},m={class:"help"};function f(e,t,n,f,_,v){const b=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",i,[(0,s._)("div",l,[u,(0,s.wy)((0,s._)("input",{id:"profileSaveForName",placeholder:"Name","onUpdate:modelValue":t[0]||(t[0]=e=>f.user=e),type:"text",class:"input is-expanded"},null,512),[[o.nr,f.user]])]),(0,s._)("div",c,[(0,s._)("button",{class:"button",onClick:t[1]||(t[1]=e=>f.saveKinksForUser(f.user,f.curKinks)),"aria-label":f.t("button_save"),disabled:!v.canSaveKinks(f.user)},[(0,s._)("span",p,[(0,s.Wm)(b,{type:"mdi",path:f.saveIconPath},null,8,["path"])]),(0,s._)("span",h,(0,r.zw)(f.t("button_save")),1)],8,d)])]),(0,s._)("p",m,(0,r.zw)(f.t("help_field_localUser")),1)])}var _=n(4938),v=n(3907),b=n(2931),k=n(2273),g=n(5317),w={name:"ProfilesSaveMenu",setup(){const{t:e}=(0,_.QT)({}),t=(0,v.oR)(),n=(0,b.iH)("");return{t:e,saveIconPath:g.Tls,saveKinksForUser:(e,n)=>t.dispatch("AllKinks/saveKinksForUser",{username:e,kinks:n}),user:n,curKinks:(0,s.Fl)((()=>t.state.CurKinks.curKinks))}},components:{SvgIcon:k.Z},methods:{canSaveKinks(e){return!!(e&&e.length>0)}}};function y(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{help_field_localUser:e=>{const{normalize:t}=e;return t(["Ein Name oder eine Rolle, um diese Praeferenzen auf dem lokalen Rechner oder beim Teilen zuordnen zukoennen\n"])},button_save:e=>{const{normalize:t}=e;return t(["Kinks speichern"])}},en:{help_field_localUser:e=>{const{normalize:t}=e;return t(["A name or role to identify these preferences on the local computer or when sharing them\n"])},button_save:e=>{const{normalize:t}=e;return t(["Save my kinks"])}}}})}var T=n(3744);"function"===typeof y&&y(w);const z=(0,T.Z)(w,[["render",f]]);var K=z},2043:function(e,t,n){n.d(t,{Z:function(){return K}});var s=n(6252),o=n(6612);const r={class:"box"},a={class:"field has-addons"},i={class:"control"},l=["value"],u={key:0,class:"control"},c={class:"icon"},d={class:"is-hidden-touch"},p={key:1,class:"control"},h={class:"icon"},m={class:"is-hidden-touch"};function f(e,t,n,f,_,v){const b=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",a,[(0,s._)("div",i,[(0,s._)("input",{class:"input",type:"text",value:f.shareLink,readonly:""},null,8,l)]),v.clipboardApiSupported?((0,s.wg)(),(0,s.iD)("div",u,[(0,s._)("button",{class:"button",onClick:t[0]||(t[0]=(...e)=>v.shareViaClipboard&&v.shareViaClipboard(...e))},[(0,s._)("span",c,[(0,s.Wm)(b,{type:"mdi",path:f.copyIconPath},null,8,["path"])]),(0,s._)("span",d,(0,o.zw)(f.t("button_copy")),1)])])):(0,s.kq)("",!0),v.webShareApiSupported?((0,s.wg)(),(0,s.iD)("div",p,[(0,s._)("button",{class:"button",onClick:t[1]||(t[1]=(...e)=>v.shareViaWebShare&&v.shareViaWebShare(...e))},[(0,s._)("span",h,[(0,s.Wm)(b,{type:"mdi",path:f.shareIconPath},null,8,["path"])]),(0,s._)("span",m,(0,o.zw)(f.t("button_share")),1)])])):(0,s.kq)("",!0)])])}var _=n(2119),v=n(4938),b=(n(2300),n(3907)),k=n(2273),g=n(5317),w={name:"ProfilesShareMenu",setup(){const{t:e}=(0,v.QT)({}),t=((0,_.tv)(),(0,_.yj)()),n=(0,b.oR)(),o=(0,s.Fl)((()=>n.state.User.currentUsername));return{t:e,shareIconPath:g.Hmp,copyIconPath:g.a0Z,shareLink:(0,s.Fl)((()=>{const e=n.getters["CurKinks/getCurKinksAsURI"],s=`${window.location.origin}${window.location.pathname}`,r=`${t.path}`.replace("profiles","import");return`${s}#${r}?profileString=${encodeURIComponent(e)}&profileName=${o.value}`}))}},components:{SvgIcon:k.Z},methods:{shareViaWebShare(){navigator.share({title:this.t("share_title",{name:this.user}),text:this.t("share_text"),url:this.shareLink})},shareViaClipboard(){navigator.clipboard.writeText(this.shareLink)}},computed:{webShareApiSupported(){return navigator.share},clipboardApiSupported(){return navigator.clipboard}}};function y(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{button_share:e=>{const{normalize:t}=e;return t(["Kinks teilen"])},button_copy:e=>{const{normalize:t}=e;return t(["Kinklink kopieren"])},share_title:e=>{const{normalize:t,interpolate:n,named:s}=e;return t(["Kinks von ",n(s("name"))])},share_text:e=>{const{normalize:t}=e;return t(["Hier ist eine Liste meiner Kinks"])}},en:{button_share:e=>{const{normalize:t}=e;return t(["Share my kinks"])},button_copy:e=>{const{normalize:t}=e;return t(["Copy kinklink"])},share_title:e=>{const{normalize:t,interpolate:n,named:s}=e;return t(["Kinks for ",n(s("name"))])},share_text:e=>{const{normalize:t}=e;return t(["Here is a list of my kinks"])}}}})}var T=n(3744);"function"===typeof y&&y(w);const z=(0,T.Z)(w,[["render",f]]);var K=z},1827:function(e,t,n){n.d(t,{Z:function(){return C}});var s=n(6252),o=n(6612);const r={class:"box"},a={class:"field has-addons"},i={class:"file has-name is-fullwidth"},l={class:"file-label"},u={class:"file-cta"},c={class:"file-icon"},d={class:"file-label is-hidden-touch"},p={class:"file-name"},h={class:"control"},m=["disabled"],f={class:"icon"},_={class:"is-hidden-touch"};function v(e,t,n,v,b,k){const g=(0,s.up)("svg-icon");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",a,[(0,s._)("div",i,[(0,s._)("label",l,[(0,s._)("input",{class:"file-input",type:"file",name:"resume",onChange:t[0]||(t[0]=(...t)=>e.onFilePicked&&e.onFilePicked(...t))},null,32),(0,s._)("span",u,[(0,s._)("span",c,[(0,s.Wm)(g,{type:"mdi",path:v.fileIconPath},null,8,["path"])]),(0,s._)("span",d,(0,o.zw)(v.t("uploadKinks_field")),1),(0,s._)("span",p,(0,o.zw)(v.t("uploadKinks_placeholder")),1)])])]),(0,s._)("div",h,[(0,s._)("button",{class:"button",onClick:t[1]||(t[1]=e=>k.parseUploadedKinks()),disabled:!b.upload},[(0,s._)("span",f,[(0,s.Wm)(g,{type:"mdi",path:v.uploadIconPath},null,8,["path"])]),(0,s._)("span",_,(0,o.zw)(v.t("button_upload")),1)],8,m)])])])}var b=n(4938),k=n(1272),g=n(2273),w=n(5317),y={name:"ProfilesUploadMenu",data(){return{upload:null}},setup(){const{t:e}=(0,b.QT)({});return{t:e,uploadIconPath:w.ruG,fileIconPath:w.Ket}},components:{SvgIcon:g.Z},methods:{parseUploadedKinks(){const e=k.ZP.load(this.upload);this.localMyKinks=e},uploadKinks(e){this.upload=e.target.files[0]}}};function T(e){e.__i18nGlobal=e.__i18nGlobal||[],e.__i18nGlobal.push({locale:"",resource:{de:{uploadKinks_field:e=>{const{normalize:t}=e;return t(["Datei auswaehlen"])},uploadKinks_placeholder:e=>{const{normalize:t}=e;return t(["Datei"])},button_upload:e=>{const{normalize:t}=e;return t(["Kinks hochladen"])}},en:{uploadKinks_field:e=>{const{normalize:t}=e;return t(["Choose File"])},uploadKinks_placeholder:e=>{const{normalize:t}=e;return t(["File"])},button_upload:e=>{const{normalize:t}=e;return t(["Upload kinks"])}}}})}var z=n(3744);"function"===typeof T&&T(y);const K=(0,z.Z)(y,[["render",v]]);var C=K}}]);