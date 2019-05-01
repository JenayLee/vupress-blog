<template>
  <div class='about-wrapper'>
    <div class="content">
      <section class="selection brd-btm">
        <div class="row">
          <h2>ABOUT ME</h2>
          <p>
            <b>Helo, I’m Jenay Lee!</b>
            <br>
            Logo or your Company Name, unless of course you are Microsoft or the Yellow Pages online directorye core of
            your marketing, the central theme around your products and services.
            Your brand is not your Logo or your Company Name, unless of course you are Microsoft or the Yellow Pages
            online directory.
          </p>
        </div>
      </section>
      <section class="selection brd-btm">
        <div class="row">
          <div class="col-sm-6 clear-mrg">
              <h2 class="title-thin text-muted">personal information</h2>

              <dl class="dl-horizontal clear-mrg">
                  <dt class="text-upper">Full Name</dt>
                  <dd>Ola Maria Lowe</dd>

                  <dt class="text-upper">D.o.b.</dt>
                  <dd>05 Sep 1986</dd>

                  <dt class="text-upper">address</dt>
                  <dd>24058, Belgium, Brussels,Liutte 27, BE</dd>

                  <dt class="text-upper">e-mail</dt>
                  <dd><a href="mailto:robertsmith@company.com">robertsmith@company.com</a></dd>

                  <dt class="text-upper">phone</dt>
                  <dd>+1 256 254 84 56</dd>

                  <dt class="text-upper">freelance</dt>
                  <dd>Available</dd>
              </dl>
          </div><!-- .col-sm-6 -->

          <div class="col-sm-6 clear-mrg">
              <h2 class="title-thin text-muted">languages</h2>

              <div class="progress-bullets ace-animated" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="10">
                  <strong class="progress-title">English</strong>
                  <span class="progress-bar">
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                  </span>
                  <span class="progress-text text-muted">native</span>
              </div>

              <div class="progress-bullets ace-animated" role="progressbar" aria-valuenow="8" aria-valuemin="0" aria-valuemax="10">
                  <strong class="progress-title">Spanish</strong>
                  <span class="progress-bar">
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet"></span>
                      <span class="bullet"></span>
                  </span>
                  <span class="progress-text text-muted">intermediate</span>
              </div>

              <div class="progress-bullets ace-animated" role="progressbar" aria-valuenow="7" aria-valuemin="0" aria-valuemax="10">
                  <strong class="progress-title">Italian</strong>
                  <span class="progress-bar">
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet fill"></span>
                      <span class="bullet"></span>
                      <span class="bullet"></span>
                      <span class="bullet"></span>
                  </span>
                  <span class="progress-text text-muted">begginer</span>
              </div>
          </div><!-- .col-sm-6 -->
        </div>
      </section>
    </div>
  </div>
</template>
<style>
.about-wrapper{
  background:url("/images/bg-img.jpg") 0 0 no-repeat;
  width: 100%;
  height: 910px;
  position: relative;
  letter-spacing: 0.08em;
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  line-height: 1.4em;
}
.about-wrapper .content{
  background-color: rgba(255, 255, 255, .6);
}
.about-wrapper h2{
  border-bottom: 0px;
}
.section.brd-btm {
    padding-bottom: 1.375em;
}
.section {
    margin-bottom: 2.188em;
}
.brd-btm {
    border-bottom: 1px solid #e6e6e6;
}
.row:after {
    clear: both;
}
.row:before, .row:after {
  content: " ";
  display: table;
}
@media (min-width: 768px){
  .col-sm-6 {
    width: 50%;
  }
  .dl-horizontal dt {
    float: left;
    width: 100px;
    overflow: hidden;
    clear: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
@media (min-width: 768px){
  .col-sm-1, 
  .col-sm-2, 
  .col-sm-3, 
  .col-sm-4, 
  .col-sm-5, 
  .col-sm-6, 
  .col-sm-7, 
  .col-sm-8, 
  .col-sm-9, 
  .col-sm-10, 
  .col-sm-11, 
  .col-sm-12 {
    float: left;
  }
}
.col-sm-6{
  position: relative;
  min-height: 1px;
}
.post-content, .text-muted {
    color: #757575;
}

.title-thin {
    font-size: 1.35em;
    font-weight: 400;
    margin-bottom: 1.571em;
}
.clear-mrg > *:last-child {
    margin-bottom: 0 !important;
}

dl {
    font-size: 0.9em;
    margin-top: 22px;
    margin-bottom: 22px;
}
.text-upper {
    text-transform: uppercase;
}
dt {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 0.01em;
}
</style>
