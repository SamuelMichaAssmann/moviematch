(this.webpackJsonpmoviematch=this.webpackJsonpmoviematch||[]).push([[0],{101:function(e,t,n){},102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){"use strict";n.r(t);var a=n(3),s=n.n(a),i=n(34),c=n.n(i),r=n(7),o=n(14),l=(n(79),n(11)),b=n(33),j=(n(58),n(80),n(1)),d=["btn--primary","btn--outline"],h=["btn--medium","btn--large","btn--mobile","btn--wide"],u=["primary","blue","red","green"],m=function(e){var t=e.children,n=e.type,a=e.onClick,s=e.buttonStyle,i=e.buttonSize,c=e.buttonColor,r=d.includes(s)?s:d[0],o=h.includes(i)?i:h[0],l=u.includes(c)?c:null;return Object(j.jsx)("button",{className:"btn ".concat(r," ").concat(o," ").concat(l),onClick:a,type:n,children:t})};var g=function(e){var t=e.lightBg,n=e.topLine,a=e.lightText,s=e.lightTextDesc,i=e.headline,c=e.description,o=e.buttonLabel,l=e.img,b=e.alt,d=e.imgStart,h=e.link;return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{className:t?"home__sek-section":"home__sek-section darkBg",children:Object(j.jsx)("div",{className:"container",children:Object(j.jsxs)("div",{className:"row home__sek-row",style:{display:"flex",flexDirection:"start"===d?"row-reverse":"row"},children:[Object(j.jsx)("div",{className:"col",children:Object(j.jsxs)("div",{className:"home__sek-text-wrapper",children:[Object(j.jsx)("div",{className:"top-line",children:n}),Object(j.jsx)("h1",{className:a?"heading":"heading dark",children:i}),Object(j.jsx)("p",{className:s?"home__sek-subtitle":"home__sek-subtitle dark",children:c}),Object(j.jsx)(r.b,{to:h,children:Object(j.jsx)(m,{buttonSize:"btn--wide",buttonColor:"blue",children:o})})]})}),Object(j.jsx)("div",{className:"col",children:Object(j.jsx)("div",{className:"home__sek-img-wrapper",children:Object(j.jsx)("img",{src:l,alt:b,className:"home__sek-img"})})})]})})})})},v={lightBg:!1,lightText:!0,lightTextDesc:!0,topLine:"Welcome to Moviematch",headline:"Match your perfect Movie",description:"You and your friends don't know what film to watch together? No problem, just let MovieMatch decide, so you don't have to discuss for a long time, instead you can watch the perfect movie right away.",buttonLabel:"Sign Up",imgStart:"",img:"images/like-dislike.svg",alt:"Like picture",link:"/sign-up"},O={lightBg:!0,lightText:!1,lightTextDesc:!1,topLine:"Our Data",headline:"We use TheMovieDB",description:"The Movie Database (TMDb) is a community built movie and TV database. Every piece of data has been added by the amazing community dating back to 2008.",buttonLabel:"More About TMDb",imgStart:"start",img:"images/themoviedb.svg",alt:"TMDB",link:"/TMDb"};var x=function(){var e=Object(a.useState)(0),t=Object(b.a)(e,2),n=t[0],s=t[1];return Object(a.useEffect)((function(){fetch("/api/time").then((function(e){return e.json()})).then((function(e){s(e.time)}))}),[]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(g,Object(l.a)({},v)),n,Object(j.jsx)(g,Object(l.a)({},O))]})},f=n(17),p=n.n(f),k=n(35),N=n(21),w=n(22),y=n(23),S=n(28),C=n(27),I=(n(52),function(e){Object(S.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).state={currentImage:e.imageSrc},a}return Object(w.a)(n,[{key:"render",value:function(){var e=this;return Object(j.jsx)("input",{className:"rateButton",type:"image",src:this.state.currentImage,onClick:this.props.onClick,onMouseOver:function(){return e.setState({currentImage:e.props.selectedImageSrc})},onMouseOut:function(){return e.setState({currentImage:e.props.imageSrc})},alt:""})}}]),n}(s.a.Component)),_="https://api.themoviedb.org/3/",M="d28d1550787892e34121c2918ec031b1",T=function(){function e(){Object(N.a)(this,e)}return Object(w.a)(e,null,[{key:"getRequest",value:function(){var e=Object(k.a)(p.a.mark((function e(t){var n,a,s,i,c=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:{},a="".concat(_).concat(t,"?api_key=").concat(M),Object.entries(n).forEach((function(e){var t=Object(b.a)(e,2),n=t[0],s=t[1];a+="&".concat(n,"=").concat(s)})),e.next=5,fetch(a);case 5:return s=e.sent,e.next=8,s.json();case 8:return i=e.sent,e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getGenres",value:function(){var e=Object(k.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getRequest("genre/movie/list");case 2:return t=e.sent,e.abrupt("return",t.genres);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMovieInfo",value:function(){var e=Object(k.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getRequest("movie/".concat(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"findMovies",value:function(){var e=Object(k.a)(p.a.mark((function e(t,n,a,s,i,c){var r,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==t&&(t=1),r={page:t,with_original_language:"en",include_adult:!1,include_video:!1},null==n){e.next=6;break}return e.next=5,this.getGenreIDList(n);case 5:r.with_genres=e.sent;case 6:return null!=a&&(r.with_keywords=a),null!=s&&(r["vote_average.gte"]=s),null!=i&&(r["with_runtime.gte"]=i),null!=c&&(r["with_runtime.lte"]=c),e.next=12,this.getRequest("discover/movie",r);case 12:return o=e.sent,e.abrupt("return",o.results);case 14:case"end":return e.stop()}}),e,this)})));return function(t,n,a,s,i,c){return e.apply(this,arguments)}}()},{key:"getGenreIDList",value:function(){var e=Object(k.a)(p.a.mark((function e(t){var n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getGenres();case 2:return n=e.sent,a=[],n.forEach((function(e){t.includes(e.name)&&a.push(e.id)})),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),F=function(e){var t=e.src,n=e.height;return Object(j.jsx)("div",{className:"movieThumbnail",children:Object(j.jsx)("img",{src:t,height:n,alt:""})})},R={imageSrc:"images/like.svg",selectedImageSrc:"images/like-selected.svg"},L={imageSrc:"images/dislike.svg",selectedImageSrc:"images/dislike-selected.svg"},D={imageSrc:"images/question-mark.svg",selectedImageSrc:"images/question-mark-selected.svg"},E=n(61),B=function(e){Object(S.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).state={loaded:!1,thumbnailSrc:"",title:"",desc:"",runtime:0,rating:0,genres:""},a.loadNewMovie=a.loadNewMovie.bind(Object(y.a)(a)),a.loadNewMovie(),a}return Object(w.a)(n,[{key:"loadNewMovie",value:function(){var e=Object(k.a)(p.a.mark((function e(){var t,n,a,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.findMovies();case 2:return t=e.sent,n=t[Math.floor(Math.random()*t.length)].id,e.next=6,T.getMovieInfo(n);case 6:a=e.sent,console.log(a),s=a.genres.map((function(e){return e.name})).join(", "),this.setState({loaded:!0,thumbnailSrc:"https://image.tmdb.org/t/p/w500"+a.poster_path,title:a.title,desc:a.overview,runtime:a.runtime,rating:a.vote_average,genres:s});case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.loaded?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"darkBg",children:[Object(j.jsxs)("nav",{class:"movieThumbnailDesktop",children:[Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"movieThumbnailRow",children:[Object(j.jsx)(F,{src:this.state.thumbnailSrc,height:400}),Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{className:"movieTitle",children:this.state.title}),Object(j.jsx)("p",{className:"home__sek-subtitle movieDescription",children:this.state.desc})]})]})}),Object(j.jsxs)("div",{align:"center",children:[Object(j.jsx)(I,Object(l.a)(Object(l.a)({},R),{},{onClick:this.loadNewMovie})),Object(j.jsx)(I,Object(l.a)({},D)),Object(j.jsx)(I,Object(l.a)({},L))]})]}),Object(j.jsx)("nav",{class:"movieThumbnailMobile",children:Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"movieThumbnailRow",children:[Object(j.jsx)(F,{src:this.state.thumbnailSrc,height:400}),Object(j.jsxs)("div",{align:"center",children:[Object(j.jsx)(I,Object(l.a)(Object(l.a)({},R),{},{onClick:this.loadNewMovie})),Object(j.jsx)(I,Object(l.a)({},D)),Object(j.jsx)(I,Object(l.a)({},L))]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{className:"movieTitle",children:this.state.title}),Object(j.jsx)("p",{className:"home__sek-subtitle movieDescription",children:this.state.desc})]})]})})})]}),Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"movieInfoRow",children:[Object(j.jsxs)("div",{className:"movieInfoElement",children:[Object(j.jsx)("h2",{className:"movieInfoHeader",children:"Runtime"}),Object(j.jsxs)("p",{className:"home__sek-subtitle movieInfoText",children:[this.state.runtime," minutes"]})]}),Object(j.jsxs)("div",{className:"movieInfoElement",children:[Object(j.jsx)("h2",{className:"movieInfoHeader",children:"Rating"}),Object(j.jsxs)("p",{className:"home__sek-subtitle movieInfoText",children:[Object(j.jsx)(E.a,{})," ",this.state.rating.toFixed(1)]})]}),Object(j.jsxs)("div",{className:"movieInfoElement",children:[Object(j.jsx)("h2",{className:"movieInfoHeader",children:"Genres"}),Object(j.jsx)("p",{className:"home__sek-subtitle movieInfoText",children:this.state.genres})]})]})})]}):Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"darkBg",children:[Object(j.jsx)("div",{className:"matchEmpty",style:{height:485}}),Object(j.jsxs)("div",{align:"center",children:[Object(j.jsx)(I,Object(l.a)({},R)),Object(j.jsx)(I,Object(l.a)({},D)),Object(j.jsx)(I,Object(l.a)({},L))]})]})})}}]),n}(s.a.Component),A=(n(90),n(26)),U=(n(62),n(63),n(0));var z=n(31),P=(n(91),n(12)),G=n(127),Y=(n(10),n(132),n(128),n(131),n(64),n(65),n(66),n(126));n(129),n(130),Object(P.a)({alternativeLabel:{top:22},active:{"& $line":{backgroundImage:"linear-gradient(120deg, rgba(233, 62, 58, 1) 0%, rgba(235, 78, 59, 1) 30%, rgba(240, 125, 62, 1) 60%, rgba(246, 160, 48, 1) 90%, rgba(251, 186, 24, 1) 100%);"}},completed:{"& $line":{backgroundImage:"linear-gradient(120deg, rgba(233, 62, 58, 1) 0%, rgba(235, 78, 59, 1) 30%, rgba(240, 125, 62, 1) 60%, rgba(246, 160, 48, 1) 90%, rgba(251, 186, 24, 1) 100%);"}},line:{height:3,border:0,backgroundColor:"#eaeaf0",borderRadius:1}})(Y.a),Object(G.a)({root:{backgroundColor:"#ccc",zIndex:1,color:"#fff",width:50,height:50,display:"flex",borderRadius:"50%",justifyContent:"center",alignItems:"center"},active:{backgroundImage:"linear-gradient(120deg, rgba(233, 62, 58, 1) 0%, rgba(235, 78, 59, 1) 30%, rgba(240, 125, 62, 1) 60%, rgba(246, 160, 48, 1) 90%, rgba(251, 186, 24, 1) 100%);",boxShadow:"0 4px 10px 0 rgba(0,0,0,.25)"}});Object(G.a)((function(e){return{button:{marginRight:e.spacing(1)},instructions:{marginTop:e.spacing(1),marginBottom:e.spacing(1)}}}));n(59);var q=n(39),V=(n(95),function(e){var t=e.label,n=e.name,a=e.type,s=e.value,i=e.onChange;return Object(j.jsx)("div",{children:Object(j.jsxs)("label",{class:"pure-material-textfield-outlined",children:[Object(j.jsx)("input",{placeholder:" ",name:n,type:a,onChange:i,value:s}),Object(j.jsx)("span",{children:t})]})})}),J=n(45);n(60),n(97);J.a.initializeApp({apiKey:"AIzaSyBRgRRFUlg9XJ6ZrdWxYaoOB5VvQXDaBko",authDomain:"moviematch-c1175.firebaseapp.com",databaseURL:"https://moviematch-c1175-default-rtdb.europe-west1.firebasedatabase.app",projectId:"moviematch-c1175",storageBucket:"moviematch-c1175.appspot.com",messagingSenderId:"199143205697",appId:"1:199143205697:web:2dbe6c53b964b156ef4fc0",measurementId:"G-8BC59JDXPZ"});var W=J.a,H=function(e){Object(S.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).state={email:"",password:""},a.logInFirebase=a.logInFirebase.bind(Object(y.a)(a)),a.handleChange=a.handleChange.bind(Object(y.a)(a)),a.resetform=a.resetForm.bind(Object(y.a)(a)),a}return Object(w.a)(n,[{key:"handleChange",value:function(e){var t=e.target,n=t.value,a=t.name;this.setState(Object(z.a)({},a,n))}},{key:"resetForm",value:function(){this.setState({password:"",email:""})}},{key:"logInFirebase",value:function(){var e=this;W.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((function(e){var t=e.user;console.log("Signed IN"),t.emailVerified||(console.log("User is not verified"),W.auth().signOut().then((function(){console.log("Signed out")})).catch((function(e){alert(e)}))),console.log("Redirecting"),window.location.href="/home"})).catch((function(t){e.resetform();var n=t.code,a=t.message;alert(a+"\n"+{errorCode:n})}))}},{key:"render",value:function(){return Object(j.jsxs)("div",{className:"base-container",ref:this.props.containerRef,children:[Object(j.jsx)("div",{className:"header",children:"SignIn"}),Object(j.jsx)("div",{className:"content",children:Object(j.jsxs)("div",{className:"form",children:[Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)(V,{label:"Enter the username",name:"email",value:this.state.email,onChange:this.handleChange})}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)(V,{label:"Enter the password",name:"password",type:"password",value:this.state.password,onChange:this.handleChange})}),Object(j.jsx)(m,{buttonSize:"btn--wide",buttonColor:"blue",onClick:this.logInFirebase,children:"Login"})]})})]})}}]),n}(s.a.Component),X=Object(q.a)(H),Z=function(e){Object(S.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).state={email:"",password:"",passwordConfirmation:"",confirmation:!1},a.handleChange=a.handleChange.bind(Object(y.a)(a)),a.resetForm=a.resetForm.bind(Object(y.a)(a)),a.registerFirebase=a.registerFirebase.bind(Object(y.a)(a)),a}return Object(w.a)(n,[{key:"handleChange",value:function(e){var t=e.target,n=t.value,a=t.name;this.setState(Object(z.a)({},a,n)),console.log({name:a}+"   "+{value:n})}},{key:"resetForm",value:function(){this.setState({password:"",passwordConfirmation:"",email:""})}},{key:"registerFirebase",value:function(){var e=this;this.state.password===this.state.passwordConfirmation&&this.setState({confirmation:!0}),!0===this.state.confirmation?W.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((function(t){t.user.sendEmailVerification(),alert("Success! You are now a registered member of MovieMatch. Please check your mailbox to verify your adress"),e.resetForm(),window.location.href="/sign-up"})).catch((function(t){var n=t.message;alert(n+"\nPlease try again."),e.resetForm()})):(alert("Passwords did not match"),this.resetForm(),console.log("resetRunning"))}},{key:"render",value:function(){return Object(j.jsxs)("div",{className:"base-container",ref:this.props.containerRef,children:[Object(j.jsx)("div",{className:"header",children:"Register"}),Object(j.jsx)("div",{className:"content",children:Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"form",children:[Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)(V,{needed:"true",type:"email",label:"Enter your email-adress",name:"email",value:this.state.email,onChange:this.handleChange})}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)(V,{type:"password",label:"Enter your password",name:"password",value:this.state.password,onChange:this.handleChange})}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)(V,{type:"password",label:"Confirm your password",name:"passwordConfirmation",value:this.state.passwordConfirmation,onChange:this.handleChange})}),Object(j.jsx)("div",{children:Object(j.jsx)(m,{buttonSize:"btn--wide",buttonColor:"blue",onClick:this.registerFirebase,children:"Login"})})]})})})]})}}]),n}(s.a.Component),$=Object(q.a)(Z),K=(n(101),function(e){Object(S.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).state={isLogginActive:!0},a}return Object(w.a)(n,[{key:"componentDidMount",value:function(){this.rightSide.classList.add("right")}},{key:"changeState",value:function(){this.state.isLogginActive?(this.rightSide.classList.remove("right"),this.rightSide.classList.add("left")):(this.rightSide.classList.remove("left"),this.rightSide.classList.add("right")),this.setState((function(e){return{isLogginActive:!e.isLogginActive}}))}},{key:"render",value:function(){var e=this,t=this.state.isLogginActive,n=t?"Register":"Login",a=t?"login":"register";return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{className:"login",children:[Object(j.jsxs)("div",{className:"container",ref:function(t){return e.container=t},children:[t&&Object(j.jsx)(X,{containerRef:function(t){return e.current=t}}),!t&&Object(j.jsx)($,{containerRef:function(t){return e.current=t}})]}),Object(j.jsx)(Q,{current:n,currentActive:a,containerRef:function(t){return e.rightSide=t},onClick:this.changeState.bind(this)})]})})}}]),n}(s.a.Component)),Q=function(e){return Object(j.jsx)("div",{className:"right-side",ref:e.containerRef,onClick:e.onClick,children:Object(j.jsx)("div",{className:"inner-container",children:Object(j.jsx)("div",{className:"text",children:e.current})})})},ee=K;n(102);var te=Object(q.a)((function(){J.a.auth().currentUser;var e=Object(a.useState)(!1),t=Object(b.a)(e,2),n=t[0],s=t[1],i=Object(a.useState)(!0),c=Object(b.a)(i,1)[0],o=function(){s(!1),window.scrollTo(0,0)};return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(U.b.Provider,{value:{color:"#fff"},children:Object(j.jsx)("nav",{className:"navbar",children:Object(j.jsxs)("div",{className:"navbar-container container",children:[Object(j.jsxs)(r.b,{to:"/",className:"navbar-logo",onClick:o,children:[Object(j.jsx)("img",{src:"images/logo.svg",className:"navbar-logo-svg",alt:""}),"MovieMatch"]}),Object(j.jsx)("div",{className:"menu-icon",onClick:function(){return s(!n)},children:n?Object(j.jsx)(A.f,{}):Object(j.jsx)(A.a,{})}),Object(j.jsxs)("ul",{className:n?"nav-menu active":"nav-menu",children:["",Object(j.jsx)("li",{className:"nav-item",children:Object(j.jsx)(r.b,{to:"/match",className:"nav-links",onClick:o,children:"Matching"})}),"","",Object(j.jsx)("li",{className:"nav-btn",children:c?Object(j.jsx)(r.b,{to:"/sign-up",className:"btn-link",children:Object(j.jsx)(m,{buttonStyle:"btn--outline",children:"SIGN UP"})}):Object(j.jsx)(r.b,{to:"/sign-up",className:"btn-link",children:Object(j.jsx)(m,{buttonStyle:"btn--outline",buttonSize:"btn--mobile",onClick:o,children:"SIGN UP"})})})]})]})})})})}));n(103);var ne=function(){return Object(j.jsxs)("div",{className:"footer-container",children:[Object(j.jsxs)("section",{className:"footer-subscription",children:[Object(j.jsx)("p",{className:"footer-subscription-heading",children:"Join our exclusive membership to receive the latest news and trends"}),Object(j.jsx)("p",{className:"footer-subscription-text",children:"You can unsubscribe at any time."}),Object(j.jsx)("div",{className:"input-areas",children:Object(j.jsxs)("form",{children:[Object(j.jsx)("input",{className:"footer-input",name:"email",type:"email",placeholder:"Your Email"}),Object(j.jsx)(m,{buttonStyle:"btn--outline",children:"Subscribe"})]})})]}),Object(j.jsxs)("div",{className:"footer-links",children:[Object(j.jsxs)("div",{className:"footer-link-wrapper",children:[Object(j.jsxs)("div",{className:"footer-link-items",children:[Object(j.jsx)("h2",{children:"About Us"}),Object(j.jsx)(r.b,{to:"/",children:"How it works"}),Object(j.jsx)(r.b,{to:"/",children:"Testimonials"}),Object(j.jsx)(r.b,{to:"/",children:"Careers"}),Object(j.jsx)(r.b,{to:"/",children:"Investors"}),Object(j.jsx)(r.b,{to:"/",children:"Terms of Service"})]}),Object(j.jsxs)("div",{className:"footer-link-items",children:[Object(j.jsx)("h2",{children:"Contact Us"}),Object(j.jsx)(r.b,{to:"/",children:"Contact"}),Object(j.jsx)(r.b,{to:"/",children:"Support"}),Object(j.jsx)(r.b,{to:"/",children:"Destinations"}),Object(j.jsx)(r.b,{to:"/",children:"Sponsorships"})]})]}),Object(j.jsxs)("div",{className:"footer-link-wrapper",children:[Object(j.jsxs)("div",{className:"footer-link-items",children:[Object(j.jsx)("h2",{children:"Videos"}),Object(j.jsx)(r.b,{to:"/",children:"Submit Video"}),Object(j.jsx)(r.b,{to:"/",children:"Ambassadors"}),Object(j.jsx)(r.b,{to:"/",children:"Agency"}),Object(j.jsx)(r.b,{to:"/",children:"Influencer"})]}),Object(j.jsxs)("div",{className:"footer-link-items",children:[Object(j.jsx)("h2",{children:"Social Media"}),Object(j.jsx)(r.b,{to:"/",children:"Instagram"}),Object(j.jsx)(r.b,{to:"/",children:"Facebook"}),Object(j.jsx)(r.b,{to:"/",children:"Youtube"}),Object(j.jsx)(r.b,{to:"/",children:"Twitter"})]})]})]}),Object(j.jsx)("section",{className:"social-media",children:Object(j.jsxs)("div",{className:"social-media-wrap",children:[Object(j.jsx)("div",{className:"footer-logo",children:Object(j.jsxs)(r.b,{to:"/",className:"social-logo",children:[Object(j.jsx)("img",{src:"images/logo.svg",className:"navbar-logo-svg",alt:"MM"}),"MovieMatch"]})}),Object(j.jsx)("small",{className:"website-rights",children:"MovieMatch \xa9 2021"}),Object(j.jsxs)("div",{className:"social-icons",children:[Object(j.jsx)(r.b,{className:"social-icon-link",to:"/",target:"_blank","aria-label":"Facebook",children:Object(j.jsx)(A.b,{})}),Object(j.jsx)(r.b,{className:"social-icon-link",to:"/",target:"_blank","aria-label":"Instagram",children:Object(j.jsx)(A.d,{})}),Object(j.jsx)(r.b,{className:"social-icon-link",to:"/",target:"_blank","aria-label":"Youtube",children:Object(j.jsx)(A.h,{})}),Object(j.jsx)(r.b,{className:"social-icon-link",to:"/",target:"_blank","aria-label":"Twitter",children:Object(j.jsx)(A.g,{})}),Object(j.jsx)(r.b,{className:"social-icon-link",to:"/",target:"_blank","aria-label":"LinkedIn",children:Object(j.jsx)(A.e,{})})]})]})})]})};var ae=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("h1",{children:"Error404"})})};var se=function(){return Object(j.jsxs)(r.a,{children:[Object(j.jsx)(te,{}),Object(j.jsxs)(o.d,{children:[Object(j.jsx)(o.b,{path:"/",exact:!0,component:x}),Object(j.jsx)(o.b,{path:"/sign-up",component:ee}),Object(j.jsx)(o.b,{path:"/match",component:B}),Object(j.jsx)(o.b,{path:"/TMDb",component:function(){return window.location.href="https://www.themoviedb.org/",null}}),Object(j.jsx)(o.b,{component:ae,children:Object(j.jsx)(o.a,{to:"/"})})]}),Object(j.jsx)(ne,{})]})};c.a.render(Object(j.jsx)(se,{}),document.getElementById("root"))},52:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},95:function(e,t,n){}},[[104,1,2]]]);
//# sourceMappingURL=main.1a791dd0.chunk.js.map