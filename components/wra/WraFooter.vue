<template>
<div class="WraFooter">
  <div class="row no-gutters h-100 no-gutters">
    <div class="col-12 col-md-6 d-flex justify-content-center">
      <a class="Link" href="https://www.facebook.com/Wrapkend-895490107279528/"
         target="_blank">
              <i class="d-inline mr-2 fab fa-facebook-square "></i> <span class="Text">Community</span>
            </a>
    </div>
    <div class="col-12 col-md-6 d-flex justify-content-center">
      <a class="Link" href="https://m.me/895490107279528"
         target="_blank">
              <i class="d-inline ml-1 mr-1 fab fa-facebook-messenger "></i>
              <span class="Text">
               Contact Us
              </span>
            </a>
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
.Link{
  min-width:200px;
  display:block;
  margin:0 auto;
  text-align: center;
}
.WraFooter {
  margin-top: 200px;
  height: fit-content;
  background-color: $lightGrey;
  padding-top:20px;
  padding-bottom:20px;
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
