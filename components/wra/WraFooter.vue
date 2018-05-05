<template>
<div class="WraFooter">
  <div class="row h-100 no-gutters">
    <div class="col-12 col-sm-7 pl-4 pr-4">
      <div class="outer">
        <div class="middle">
          <div class="inner">
            <a href="https://www.facebook.com/Wrapkend-895490107279528/"
               target="_blank">
              <i class="d-inline mr-2 fab fa-facebook-square "></i> <span class="Text">Like Us</span>
            </a>
            <span>
              &nbsp;
            <a href="https://m.me/895490107279528" target="_blank" >
              <i class="d-inline ml-1 mr-1 fab fa-facebook-messenger "></i>
              <span class="Text">
               Chat&nbsp;with&nbsp;us&nbsp;on&nbsp;messenger
              </span>
            </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-5  pl-4 pr-4 d-flex justify-content-center align-items-center">
      <div class="row no-gutters">
        <div class="col-6 text-center">
          <a class="Text"
             target="_blank"
             href="mailto:arancibiajav@gmail.com">Contact Us</a>
        </div>
        <div class="col-6 text-center">
          <a class="Text"
             href="tel:+33782809054">+33&nbsp;7&nbsp;82&nbsp;80&nbsp;90&nbsp;54</a>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'WraFooter'
}

</script>

<style lang="scss" scoped="">
.WraFooter {
  margin-top: 200px;
  height: 80px;
  background-color: $lightGrey;
}

.outer {
  display: table;
  height: 100%;
  width: 100%;
  @media only screen and (min-width: 480px) {
    width: unset;
  }
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  /*whatever width you want*/
}

.TextIcon {
  color: $color2;
  margin: 0 auto;
  display: block;
}

.Text {
  color: $grey;
  font-size: 14px;
  font-weight: 400;
  line-height: 2.28571;
}

.Text:link,
.Text:visited,
a:link,
a:visited {
  text-decoration: none;
  font-weight: 300;
}

.RightTextWrapper {
  max-width: 260px;
}
</style>
