<template>
  <div class='about-wrapper'>
    <div class="content">
      <section class="selection brd-btm">
        <div class="row">
          <h2>ABOUT ME</h2>
          <p>
            <b>Helo, I’m Jenay Lee!</b>
            <br>
            I come from Hefei, the capital of Anhui Province.
            I graduated from the Biomedical Engineering department of Anhui Medical University in July, 2016.
            In the past two years I have been engaged in front-end development work.
            I am very interested in front-end development and design,
            I feel a real sense of accomplishment when I finish a job and it turns out just as I’d planned.
          </p>
        </div>
      </section>
      <section class="selection brd-btm">
        <div class="row" style="padding-bottom: 15px;">
          <div class="col-sm-6 clear-mrg">
              <h2 class="title-thin text-muted">personal information</h2>
              <dl class="dl-horizontal clear-mrg">
                <span v-for="tmp in infos" :key="tmp.key">
                  <dt class="text-upper">{{tmp.key}}</dt>
                  <dd v-if="tmp.isHref">
                    <a :href="tmp.value">{{tmp.value}}</a>
                  </dd>
                  <dd v-else>{{tmp.value}}</dd>
                </span>
              </dl>
          </div>
          <div class="col-sm-6 clear-mrg">
              <h2 class="title-thin text-muted">languages</h2>
              <div class="progress-bullets ace-animated" v-for="tmp in languages" :key="tmp.key">
                  <strong class="progress-title">{{tmp.key}}</strong>
                  <span class="progress-bar">
                      <span v-for="i in 10" :key="i" :class="{'bullet': true, 'fill': i<=tmp.value}"></span>
                  </span>
                  <span class="progress-text text-muted">{{tmp.remark}}</span>
              </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="row">
          <div class="col-sm-6 clear-mrg">
              <h2 class="title-thin text-muted">professional skills</h2>
              <div class="progress-line ace-animated" v-for="tmp in skills" :key="tmp.key">
                  <strong class="progress-title">{{tmp.key}}</strong>
                  <div class="progress-bar" style="position: relative;">
                    <svg viewBox="0 0 100 4" preserveAspectRatio="none" style="width: 100%; height: 100%;">
                      <path d="M 0,2 L 100,2" stroke="#eee" stroke-width="4" fill-opacity="0"></path>
                      <path d="M 0,2 L 100,2" stroke="#3eaf7c" stroke-width="4" fill-opacity="0" style="stroke-dasharray: 100, 100; stroke-dashoffset: 10;"></path>
                    </svg>
                    <div class="progress-text" style="top: -25px; right: 0px; color: rgb(1, 1, 1); position: absolute; margin: 0px; padding: 0px; transform: translate(0px, 0px);">{{tmp.value}}</div>
                  </div>
              </div>
            </div>
            <div class="col-sm-6 clear-mrg">
                <h2 class="title-thin text-muted">personal characteristics</h2>
                <ul class="styled-list clear-mrg">
                    <li v-for="tmp in chars" :key="tmp">{{tmp}}</li>
                </ul>
            </div>
          </div>
        </section>
    </div>
  </div>
</template>
<script>
export default {
  data()  {
    return {
      infos: [],
      languages: [],
      skills: [],
      chars: []
    }
  },
  mounted() {
    this.infos = [
      {
        key: 'Full Name', value: 'Jenay Lee', isHref: false
      },
      {
        key: 'D.o.b.', value: '14 Apr 1993', isHref: false
      },
      {
        key: 'address', value: 'China, HeFei', isHref: false
      },
      {
        key: 'e-mail', value: 'jenay.lee@hotmail.com', isHref: false
      },
      {
        key: 'phone', value:'+86 182 5699 5083', isHref: false
      },
      {
        key: 'freelance', value:'Available', isHref: false
      }
    ];
    this.languages = [
      {
        key: 'Chinese', value: '10', remark: 'native'
      },
      {
        key: 'English', value: '4', remark: 'elementary'
      },
      {
        key: 'French', value: '1', remark: 'begginer'
      }
    ];
    this.skills = [
      {
        key: 'JavaScript', value: '80%'
      },
      {
        key: 'VUE', value: '80%'
      },
      {
        key: 'React', value: '80%'
      },
      {
        key: 'Angular', value: '80%'
      },
      {
        key: 'TypeScript', value: '80%'
      },
      {
        key: 'SQL', value: '50%'
      }
    ];
    this.chars = ['Bachelor\'s degree', 'TEM4', 'NCRE2', '----- cute line -----', 'Positive', 'Aspirant']
  },
}
</script>

<style>
.about-wrapper{
  background:url("../public/images/bg-img.jpg") 0 0 no-repeat;
  width: 100%;
  height: 910px;
  position: relative;
  letter-spacing: 0.08em;
  font-family: "Dosis", sans-serif;
  font-size: 16px;
  line-height: 1.3;
}
.about-wrapper .content{
  background-color: rgba(255, 255, 255, .6);
  box-shadow: -5px 5px 40px #fff;
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
dd {
    margin: 0 0 0.75em 0;
}
.progress-title {
    font-size: 0.85em;
    line-height: 1.2em;
    display: block;
    margin-bottom: 0.2em;
}
b, strong {
    font-weight: 700;
}
.progress-bullets .progress-bar {
    white-space: nowrap;
    line-height: 0.938em;
}
.progress-bullets.ace-animated .bullet:nth-child(1) {
    -webkit-animation-delay: 0ms;
}
.progress-bullets.ace-animated .bullet {
    -webkit-animation: FadeIn 250ms linear;
    -webkit-animation-fill-mode: both;
}

.progress-bullets .bullet.fill {
    background-color: #3eaf7c;
}
@media (min-width: 768px){
  .progress-bullets .bullet {
    margin-right: 0.31em;
  }
}
.progress-bullets {
    margin-bottom: 1.375em;
}
.progress-bullets .bullet {
    width: 0.85em;
    height: 0.85em;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid #3eaf7c;
    vertical-align: middle;
}
.progress-line {
    margin-bottom: 20px;
    width: 90%;
}
.progress-line .progress-title {
    padding-right: 3.8em;
}
.progress-line .progress-bar {
    width: 100%;
    height: 5px;
}
.title-thin {
    font-size: 1.35em;
    font-weight: 400;
    margin-bottom: 1.571em;
}
.clear-mrg > *:last-child {
    margin-bottom: 0 !important;
}
.progress-line svg {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 5px;
}
svg:not(:root) {
    overflow: hidden;
}
@media (min-width: 768px){
  .styled-list {
    line-height: 1.1em;
  }
  .styled-list li:before {
    left: -2.7em;
  }
}
.styled-list, .styled-list ul, .styled-list ol {
    list-style: none;
}
.styled-list {
    line-height: 2.6em;
}
ul {
    list-style-type: disc;
}
ul, ol {
    margin: 0 0 22px 0;
}
.styled-list li {
    position: relative;
}
.styled-list li:before {
    content: "☆";
    top: 0;
    position: absolute;
    left: -25px;
}
</style>
