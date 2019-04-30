<template>
  <div class='about-wrapper'>
    <div class='about-paper-stock'>
      <main class="about-paper clearfix">
        <div class="about-paper-cont">

        </div>
      </main>
    </div>
  </div>
</template>
<style>
.about-wrapper{
  background:url("/images/bg-img.jpg") 0 0 no-repeat;
  width: 100%;
  height: 910px;
  position: relative;
}
.about-paper-stock{
    max-width: 940px;
    margin: 0 auto;
    padding: 3.6rem 2rem 0;
    border: 1px solid #eaecef;
    position: relative;
    top: 50px;
    z-index: 0;
}
.about-paper-stock::before,.about-paper-stock::after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border: 1px solid #e6e6e6;
}
.about-paper-stock:before {
    top: 2px;
    left: 2px;
    z-index: 1;
}
.about-paper-stock:after {
    top: 5px;
    left: 5px;
    z-index: 0;
}
</style>
