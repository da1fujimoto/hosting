import{f as e}from"./vendor.8a206d0a.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const o=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,c)=>{const d=new URL(e,o);if(self[t].moduleMap[d])return a(self[t].moduleMap[d]);const i=new Blob([`import * as m from '${d}';`,`${t}.moduleMap['${d}']=m;`],{type:"text/javascript"}),s=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){c(new Error(`Failed to import: ${e}`)),n(s)},onload(){a(self[t].moduleMap[d]),n(s)}});document.head.appendChild(s)})),self[t].moduleMap={}}}("/assets/");e.apps.length||e.initializeApp({apiKey:"AIzaSyB6yR4N0S55WccY8Gdl0w0picLw2JmqYeY",authDomain:"fireship-webrtc-da1.firebaseapp.com",projectId:"fireship-webrtc-da1",storageBucket:"fireship-webrtc-da1.appspot.com",messagingSenderId:"625061756281",appId:"1:625061756281:web:6ada0d5997de4ddf3d83a8"});const t=e.firestore(),a=new RTCPeerConnection({iceServers:[{urls:["stun:stun.services.mozilla.com:3478"]}],iceCandidatePoolSize:10});let o=null,n=null;const c=document.getElementById("webcamButton"),d=document.getElementById("webcamVideo"),i=document.getElementById("callButton"),s=document.getElementById("callInput"),r=document.getElementById("answerButton"),l=document.getElementById("remoteVideo"),p=document.getElementById("hangupButton");c.onclick=async()=>{o=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),n=new MediaStream,o.getTracks().forEach((e=>{a.addTrack(e,o)})),a.ontrack=e=>{e.streams[0].getTracks().forEach((e=>{n.addTrack(e)}))},d.srcObject=o,l.srcObject=n,i.disabled=!1,r.disabled=!1,c.disabled=!0},i.onclick=async()=>{const e=t.collection("calls").doc(),o=e.collection("offerCandidates"),n=e.collection("answerCandidates");s.value=e.id,a.onicecandidate=e=>{e.candidate&&o.add(e.candidate.toJSON())};const c=await a.createOffer();await a.setLocalDescription(c);const d={sdp:c.sdp,type:c.type};await e.set({offer:d}),e.onSnapshot((e=>{const t=e.data();if(!a.currentRemoteDescription&&(null==t?void 0:t.answer)){const e=new RTCSessionDescription(t.answer);a.setRemoteDescription(e)}})),n.onSnapshot((e=>{e.docChanges().forEach((e=>{if("added"===e.type){const t=new RTCIceCandidate(e.doc.data());a.addIceCandidate(t)}}))})),p.disabled=!1},r.onclick=async()=>{const e=s.value,o=t.collection("calls").doc(e),n=o.collection("answerCandidates"),c=o.collection("offerCandidates");a.onicecandidate=e=>{e.candidate&&n.add(e.candidate.toJSON())};const d=(await o.get()).data().offer;await a.setRemoteDescription(new RTCSessionDescription(d));const i=await a.createAnswer();await a.setLocalDescription(i);const r={type:i.type,sdp:i.sdp};await o.update({answer:r}),c.onSnapshot((e=>{e.docChanges().forEach((e=>{if(console.log(e),"added"===e.type){let t=e.doc.data();a.addIceCandidate(new RTCIceCandidate(t))}}))}))};
