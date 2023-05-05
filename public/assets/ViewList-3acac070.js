import{f as D,h as n,n as c,i as V,t as y,L as $,p as t,T as M,S as z,F as _,D as P,O as S,c as C,g as T,j as e,w as x,N as B,U as L,k as r,I as m,x as b,R as N,M as A,V as F,y as f,l as j,W as I}from"./index-d8e57e78.js";import{p as O}from"./project-f2471255.js";const R=["id"],U=["id"],W=D({__name:"MenuDropdown",props:{state:{type:Boolean,default:!1}},emits:["close"],setup(v){const u=v;return(i,a)=>(n(),c(_,null,[(n(),V(M,{to:"#area"},[y(t("div",{id:`dropdown_blur-${i.$attrs.id}`,class:"dropdown-blur",onClick:a[0]||(a[0]=h=>i.$emit("close"))},null,8,R),[[$,u.state]])])),y(t("div",{id:`dropdown_menu-${i.$attrs.id}`,class:"dropdown-menu"},[z(i.$slots,"default")],8,U),[[$,u.state]])],64))}});const q=["onClick"],G={class:"text-2xl"},H={class:"text-md"},J={class:"card-now-time"},K=["onClick"],Q={class:"flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"},X=["onClick"],Y=t("span",null,"Edite",-1),Z=["onClick"],ee=t("span",null,"Delete",-1),te={key:1,class:"flex flex-col justify-center items-center"},oe=t("h2",{class:"text-xl font-semibold"},"Nothing found",-1),se=t("p",{class:"text-lg"},"Maybe you should look for something else",-1),ne=t("h1",{class:"mb-10 text-2xl"},"Welcome to To-Do-Projects",-1),de=D({__name:"ViewList",setup(v){const u=P(),{projects:i}=S(u),{dropdown:a,remove:h,select:g,modals:l,query:E}=O();let k=C(()=>g.data),w=C(()=>i.value.data.length);return T(()=>u.getAll(!0)),(le,s)=>(n(),c(_,null,[t("div",{class:b([!e(w)&&"flex justify-center items-center","min-h-[48vh] w-full"])},[e(w)?(n(),V(L,{key:0,name:"list",tag:"div",class:"list-project"},{default:x(()=>[(n(!0),c(_,null,B(e(i).data,(o,d)=>(n(),c("div",{key:d,class:"relative"},[t("div",{class:b(["zoom",e(a).get(d)&&"cool-zoom"])},[t("div",{class:"card-project",onClick:p=>e(F)("project-one",{id:o._id})},[t("h2",G,f(e(j.truncate)(o.title,{length:18})),1),t("p",H,f(e(j.truncate)(o.description,{length:53})),1),t("span",J,f(e(I)(o.createdAt)),1)],8,q),t("button",{class:"btn-options btn-one",onClick:p=>e(a).toggle(d)},[r(e(m).MenuVertical)],8,K)],2),r(W,{id:o._id,state:e(a).get(d),onClose:p=>e(a).toggle(d)},{default:x(()=>[t("div",Q,[t("div",{class:"flex justify-between items-center hover:text-white",onClick:p=>e(l).open.update(o,d)},[Y,r(e(m).Edit,{class:"inline"})],8,X),t("div",{class:"flex justify-between items-center hover:text-white",onClick:p=>e(l).open.delete(o._id,d)},[ee,r(e(m).Delete,{class:"inline"})],8,Z)])]),_:2},1032,["id","state","onClose"])]))),128))]),_:1})):(n(),c("div",te,[e(E).search!=""?(n(),c(_,{key:0},[oe,se],64)):(n(),c(_,{key:1},[ne,t("div",{class:"new-card-project zoom",onClick:s[0]||(s[0]=o=>e(l).open.create())},[r(e(m).Plus)])],64))]))],2),r(e(N).ModalAddOrEdit,{id:`modal_add_or_edit-${e(k)._id}`,modal:e(l).addEdit,updated:e(k),onClose:s[1]||(s[1]=o=>e(l).toggle("addEdit"))},null,8,["id","modal","updated"]),r(e(A).Confirm,{id:`modal_confirm-${e(g).id}`,modelValue:e(l).confirm,"onUpdate:modelValue":s[2]||(s[2]=o=>e(l).confirm=o),message:"Do you want to delete this project?",onClose:s[3]||(s[3]=o=>e(l).toggle("confirm")),onConfirm:s[4]||(s[4]=o=>e(h)())},null,8,["id","modelValue"])],64))}});export{de as default};