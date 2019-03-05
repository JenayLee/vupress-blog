<template>
  <div class="custom-area-inner">
		<header class='custom-header'>
			<h1 class='custom-header-logo'>MISS</h1>
		</header>
		<div class="custom-area-text">
			<h1>
				HELLO, <br>
				I AM  Jenay Lee...
			</h1>
			<h5>PROFESSIONAL _WEB DESIGNER &amp; DEVELOPER</h5>
			<router-link to='/views/about/' class="custom-readmore">ABOUT ME</router-link>
		</div>
		<div class="custom-area-image">
			<img src='/images/girl.jpg' alt="man mask">
		</div>
  </div>
</template>
<style>
.custom-area-inner {
		position: relative;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    z-index: 1;
	  padding: 3.6rem 2rem 0;
    max-width: 1024px;
		min-height: 700px;
    margin: 0px auto;
		font-family: "Dosis", sans-serif;
}
.custom-area-text {
    padding: 120px 0;
}
.custom-area-text h1 {
    line-height: 1.5;
    font-weight: 500;
    letter-spacing: 2px;
}
.custom-area-text h5 {
    margin-top: 20px;
    font-weight: 400;
    letter-spacing: 2px;
		font-size: 18px;
		line-height: 1.3;
    color: #333333;
}
.custom-area-image {
    position: absolute;
    right: 0;
    top: 10%;
    max-height: 100%;
    z-index: -1;
}
.custom-readmore::after {
    content: " _";
}
.custom-header{
	position: absolute;
	top: 20px;
}
.custom-header .custom-header-logo{
	font-size: 20px;
	font-weight: 400;
	letter-spacing: 0.5px;
}
.custom-header-logo::after{
	content: '.';
}
</style>

