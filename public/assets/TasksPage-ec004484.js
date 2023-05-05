import{u as v,d as T,q as m,l as p,s as u,e as i,a as c,r as A,c as y,b as d,_,f as j,o as E,g as q,h as P,i as I,w as O,j as k,k as f}from"./index-d8e57e78.js";const{getUserId:l}=v(),L=T("task",{state:()=>({lifecicles:{mounted:!1},tasks:{data:[],trash:[]},query:m.task,project_id:""}),getters:{countTask:t=>t.tasks.data.length},actions:{clear(){this.tasks={data:[],trash:[]},this.lifecicles.mounted=!1,this.query=m.task},onceMounted(t,e=!0){e?this.lifecicles.mounted||(this.lifecicles.mounted=!0,t&&t()):t&&t()},setProjectId(t){this.project_id!=t&&(this.project_id=t)},insert(t){p.isEmpty(t)||(this.tasks=t)},getAll(t=!1){this.countTask,this.onceMounted(()=>{const e=u("/task",l.value);c("all",e)({actions:n=>this.insert(n)})({query:this.query,_project:this.project_id})},t)},create(t,e){i.emit("task/create");const s=u("/task",l.value);c("create",s)(e,{actions:r=>this.insert(r)})({form:t,query:this.query})},update(t,e){i.emit("task/update");const s=u("/task",l.value);c("update",s)(e,{actions:r=>{const g=p.findIndex(this.tasks.data,{_id:t._id});r&&(this.tasks.data[g]=r)}})(t)},changePosition(t,e){i.emit("task/move");const s=u("/task",l.value);c("change-position",s)(e)(t)},trash(t,e){i.emit("task/trash");const s=u("/task",l.value);c("trash",s)(e,{actions:r=>this.insert(r)})({_project:this.project_id,query:this.query,_ids:t})},remove(t,e){i.emit("task/delete");const s=u("/task",l.value);c("delete",s)(e,{actions:r=>this.insert(r)})({_project:this.project_id,query:this.query,_id:t})},removeAll(t){i.emit("task/delete-all");const e=u("/task",l.value);c("delete-all",e)(t,{actions:n=>this.insert(n)})({_project:this.project_id,query:this.query})}}}),o=A({deleteAll:!0,create:!0,update:!0,delete:!0,trash:!0,move:!0}),S=()=>{const{getUserId:t}=v(),e=`broadcast:${t.value}`,s=L();i.on("task/delete-all",()=>o.deleteAll=!1),i.on("task/update",()=>o.update=!1),i.on("task/create",()=>o.create=!1),i.on("task/delete",()=>o.delete=!1),i.on("task/trash",()=>o.trash=!1),i.on("task/move",()=>o.move=!1);const a=y(()=>u("/task",t.value));return a.value.timeout(8e3).on(`${e}/create`,()=>{setTimeout(()=>o.create=!0,300),o.create&&s.getAll()}),a.value.timeout(8e3).on(`${e}/update`,()=>{setTimeout(()=>o.update=!0,300),o.update&&s.getAll()}),a.value.timeout(8e3).on(`${e}/trash`,()=>{setTimeout(()=>o.trash=!0,300),o.trash&&s.getAll()}),a.value.timeout(8e3).on(`${e}/change-position`,()=>{setTimeout(()=>o.move=!0,300),o.move&&s.getAll()}),a.value.timeout(8e3).on(`${e}/delete`,n=>{console.log(n),setTimeout(()=>o.delete=!0,300),o.delete&&s.getAll()}),a.value.timeout(8e3).on(`${e}/delete-all`,()=>{setTimeout(()=>o.deleteAll=!0,300),o.deleteAll&&s.getAll()}),a.value},h={ModalTrash:d(()=>_(()=>import("./ModalTrash-5a6ac5ba.js"),["assets/ModalTrash-5a6ac5ba.js","assets/index-d8e57e78.js","assets/index-12edd13d.css","assets/ModalTrash-de0ed9a4.css"])),ModalEdit:d(()=>_(()=>import("./ModalEdit-6a2765f7.js"),["assets/ModalEdit-6a2765f7.js","assets/index-d8e57e78.js","assets/index-12edd13d.css","assets/ModalEdit-3d653ed4.css"])),Options:d(()=>_(()=>import("./MenuOptions-4999fcba.js"),["assets/MenuOptions-4999fcba.js","assets/index-d8e57e78.js","assets/index-12edd13d.css","assets/task-9cfd6d3d.js","assets/MenuOptions-9e5aa2b4.css"])),ModalView:d(()=>_(()=>import("./ModalView-345b693b.js"),["assets/ModalView-345b693b.js","assets/index-d8e57e78.js","assets/index-12edd13d.css"])),Content:d(()=>_(()=>import("./NotFountId-1b12f6ed.js"),["assets/NotFountId-1b12f6ed.js","assets/index-d8e57e78.js","assets/index-12edd13d.css"])),List:d(()=>_(()=>import("./ViewList-8d1e7df9.js"),["assets/ViewList-8d1e7df9.js","assets/index-d8e57e78.js","assets/index-12edd13d.css","assets/task-9cfd6d3d.js","assets/ViewList-87ba7d31.css"]))},V=j({__name:"TasksPage",setup(t){const e=S();return E(()=>e.close()),q(()=>e.open()),(s,a)=>(P(),I(k(h).Content,null,{default:O(()=>[f(k(h).Options),f(k(h).List)]),_:1}))}}),$=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));export{h as T,$ as a,L as u};