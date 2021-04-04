(this["webpackJsonpproject-tic-tac-toe"]=this["webpackJsonpproject-tic-tac-toe"]||[]).push([[0],{20:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n(14),s=n.n(c),i=n(4),r=n(10),l=(n(20),n(1));var u=function(e){var t=e.signIn,n=e.error,c=Object(a.useState)({email:"",password:""}),s=Object(i.a)(c,2),u=s[0],o=s[1];return Object(l.jsxs)("div",{className:"signInPage",children:[Object(l.jsx)("h1",{children:"tIc-tAc-tOe"}),Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(u)},children:[Object(l.jsx)("div",{className:"form-heading",children:Object(l.jsx)("h2",{children:"Log In"})}),Object(l.jsxs)("div",{className:"form-inputs",children:[Object(l.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(l.jsx)("input",{type:"email",name:"email",id:"email",onChange:function(e){return o(Object(r.a)(Object(r.a)({},u),{},{email:e.target.value}))},value:o.email})]}),Object(l.jsxs)("div",{className:"form-inputs",children:[Object(l.jsx)("label",{htmlFor:"password",children:"Password:"}),Object(l.jsx)("input",{type:"password",name:"password",id:"password",onChange:function(e){return o(Object(r.a)(Object(r.a)({},u),{},{password:e.target.value}))},value:o.password})]}),Object(l.jsx)("input",{type:"submit",value:"Sign In"}),Object(l.jsxs)("p",{children:["Don't have an account? ",Object(l.jsx)("a",{href:"#",children:"Sign Up"})]}),Object(l.jsx)("p",{className:"error",children:n})]}),Object(l.jsx)("h5",{className:"bottom-line",children:"Project Dedicated to Suraj Neupane."})]})},o=n(15),j=n(9),d=function(){return{winCheck:function(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]],n=["topRow","midRow","bottomRow","leftColumn","midColumn","rightColumn","leftDiagonal","rightDiagonal"],a=0;a<t.length;a++){var c=Object(i.a)(t[a],3),s=c[0],r=c[1],l=c[2];if(e[s]&&e[s]===e[r]&&e[s]===e[l])return n[a]}return null}}},b=function(e){var t=e.squareStyle,n=e.clickhandler;return Object(l.jsx)("div",{className:t||"square",onClick:n})},m=function(e){var t=e.winningLine;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"leftDiagonal",style:{zIndex:"leftDiagonal"===t?"1":""},children:Object(l.jsx)("div",{className:"leftInner",style:{width:"leftDiagonal"===t?"100%":" "}})}),Object(l.jsx)("div",{className:"rightDiagonal",style:{zIndex:"rightDiagonal"===t?"1":""},children:Object(l.jsx)("div",{className:"rightInner",style:{width:"rightDiagonal"===t?"100%":" "}})}),Object(l.jsx)("div",{className:"leftColumn",style:{zIndex:"leftColumn"===t?"1":""},children:Object(l.jsx)("div",{className:"innerDiv",style:{height:"leftColumn"===t?"100%":""}})}),Object(l.jsx)("div",{className:"midColumn",style:{zIndex:"midColumn"===t?"1":""},children:Object(l.jsx)("div",{className:"innerDiv",style:{height:"midColumn"===t?"100%":""}})}),Object(l.jsx)("div",{className:"rightColumn",style:{zIndex:"rightColumn"===t?"1":""},children:Object(l.jsx)("div",{className:"innerDiv",style:{height:"rightColumn"===t?"100%":""}})}),Object(l.jsx)("div",{className:"topRow",style:{zIndex:"topRow"===t?"1":""},children:Object(l.jsx)("div",{className:"innerDiv",style:{width:"topRow"===t?"100%":""}})}),Object(l.jsx)("div",{className:"midRow",style:{zIndex:"midRow"===t?"1":""},children:Object(l.jsx)("div",{className:"innerDiv",style:{width:"midRow"===t?"100%":""}})}),Object(l.jsx)("div",{className:"bottomRow",style:{zIndex:"bottomRow"===t?"1":""},children:Object(l.jsx)("div",{className:"innerDiv",style:{width:"bottomRow"===t?"100%":""}})})]})},h=function(e){var t=e.squares,n=e.handleClick,a=e.currentTurn,c=e.winningLine;return Object(l.jsxs)("div",{className:a?"game-board o-turn":"game-board x-turn",id:"game-board",children:[t.map((function(e,t){return Object(l.jsx)(b,{squareStyle:e,clickhandler:function(){return function(e){n(e)}(t)}},t)})),Object(l.jsx)(m,{winningLine:c})]})},O=function(e){var t=e.user,n=e.winner,a=e.playAgain;return Object(l.jsxs)("div",{className:"score-area",children:[Object(l.jsx)("h6",{children:"Game Over"}),"Draw"!==n?Object(l.jsxs)("div",{className:"results blink",children:[Object(l.jsx)("i",{class:"fas fa-trophy"})," ",n===t.username?"You Win!":"".concat(n," wins!")]}):Object(l.jsx)("div",{className:"results blink",children:"Match Draw!"}),Object(l.jsx)("button",{onClick:function(){return a()},children:"Play Again"})]})},v=n(13);n(23);v.a.initializeApp({apiKey:"AIzaSyC9CmsdbQtQ1gJ0kdUV-xVdZtt9Suughzo",authDomain:"my-tic-tac-toe-project.firebaseapp.com",databaseURL:"https://my-tic-tac-toe-project-default-rtdb.firebaseio.com/",storageBucket:"my-tic-tac-toe-project.appspot.com"});var f=v.a.database(),x=(n(27),function(e){var t=e.user,n=e.currentPlayer,a=e.friendName,c=e.currentTurn?"O":"X";return Object(l.jsxs)("div",{className:"score-area",children:[n!==t.username?"Your Turn(".concat(c,")"):"".concat(a,"'s Turn(").concat(c,")"),Object(l.jsx)("div",{className:"logo",children:n!==t.username?Object(l.jsx)("i",{class:"far fa-play-circle"}):Object(l.jsx)("i",{class:"far fa-pause-circle"})})]})}),p=function(e){var t=e.user,n=e.friendName,c=f.ref("GameDetails"),s=d().winCheck,r=Object(a.useState)(!1),u=Object(i.a)(r,2),b=u[0],m=u[1],v=Object(a.useState)(),p=Object(i.a)(v,2),g=p[0],w=p[1],N=Object(a.useState)(Array(9).fill(null)),y=Object(i.a)(N,2),C=y[0],R=y[1],D=Object(a.useState)(),S=Object(i.a)(D,2),I=S[0],k=S[1],T=Object(a.useState)(),L=Object(i.a)(T,2),z=L[0],A=L[1],W=Object(a.useState)(),q=Object(i.a)(W,2),E=q[0],P=q[1],M=function(e,t){c.child("Result").update({showResult:!0}),c.child("Result").update({Winner:t}),E||c.child("Turn").update({LastMove:e}),c.child("Turn").update({CurrentTurn:!1})};return Object(a.useEffect)((function(){c.child("Turn/CurrentTurn").on("value",(function(e){P(e.val())})),c.child("Turn/LastMove").on("value",(function(e){w(e.val())})),c.child("Result/WinningLine").on("value",(function(e){A(e.val())})),c.child("Result/showResult").on("value",(function(e){m(e.val())})),c.child("Result/Winner").on("value",(function(e){k(e.val())})),c.child("Cells").on("value",(function(e){var t=[];e.forEach((function(e){t.push(e.val())})),R(t)}))}),[]),Object(l.jsxs)("div",{className:"gameArea",children:[Object(l.jsx)("h1",{children:"Game"}),!b&&Object(l.jsx)(x,{user:t,currentPlayer:g,friendName:n,currentTurn:E}),b&&Object(l.jsx)(O,{user:t,winner:I,playAgain:function(){c.child("Result").update({WinningLine:""}),c.child("Result").update({showResult:!1}),c.child("Result").update({Winner:""});for(var e=0;e<9;e++){var t="cell"+e;c.child("Cells").update(Object(j.a)({},t,""))}}}),Object(l.jsxs)("div",{className:"screenReference",children:[Object(l.jsx)(h,{squares:C,handleClick:function(e){var n=Object(o.a)(C);if(!n[e]){n[e]=E?"square o-sign":"square x-sign";var a="cell"+e;c.child("Cells").update(Object(j.a)({},a,n[e]));var i=s(n);if(i)return c.child("Result").update({WinningLine:i}),void M(t.username,t.username);n.every((function(e){return e}))?M(t.username,"Draw"):(c.child("Turn").update({CurrentTurn:!E}),c.child("Turn").update({LastMove:t.username}))}},currentTurn:E,winningLine:z}),Object(l.jsx)("div",{className:b?"screenY":""}),Object(l.jsx)("div",{className:g===t.username?"screenY":""})]})]})},g=(n(28),function(e){var t=e.signOut,n=e.user;return Object(l.jsxs)("div",{className:"homepage",children:[Object(l.jsxs)("div",{className:"nav",children:[Object(l.jsxs)("div",{className:"userPart",children:["Welcome ",n.username]}),Object(l.jsx)("div",{className:"signOut",children:Object(l.jsx)("button",{onClick:function(){t()},children:"Sign Out"})})]}),"Monk"===n.username?Object(l.jsx)(p,{user:n,friendName:"Fighter"}):Object(l.jsx)(p,{user:n,friendName:"Monk"})]})});n(29);var w=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(!1),r=Object(i.a)(s,2),o=r[0],j=r[1],d=Object(a.useState)(null),b=Object(i.a)(d,2),m=b[0],h=b[1],O=Object(a.useState)(""),v=Object(i.a)(O,2),x=v[0],p=v[1];return Object(a.useEffect)((function(){var e=[];f.ref("users").once("value",(function(t){t.forEach((function(t){e.push(t.val())}))})),c(e)}),[]),Object(l.jsx)("div",{className:"App",children:m?Object(l.jsx)(g,{signOut:function(){h(null),p("")},user:m}):Object(l.jsx)(u,{signIn:function(e){n.forEach((function(t){e.email===t.email&&e.password===t.password&&(j(!0),h(t),p(""))})),o||p("Invalid email or password!")},error:x})})};s.a.render(Object(l.jsx)(w,{}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.f1f80484.chunk.js.map