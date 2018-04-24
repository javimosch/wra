<template>
<div class="PrivacyPolicy container ">
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">PRIVACY POLICY</h3>
    </div>
    <div class="col-12">
      <p>
        This privacy policy sets out how <strong v-html="site"></strong> uses and protects any information that you give <strong v-html="site"></strong> when you use this website. Kuzzle.io is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
        <strong v-html="site"></strong> may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 25/04/2018.
      </p>
    </div>
  </div>
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">WHAT WE COLLECT</h3>
    </div>
    <div class="col-12">
      <p>
        We may collect the following information:
        <br> name and job title contact information including email address demographic information such as postcode, preferences and interests other information relevant to customer surveys and/or offers
      </p>
    </div>
  </div>
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">WHAT WE DO WITH THE INFORMATION WE GATHER</h3>
    </div>
    <div class="col-12">
      <p>
        We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
        <br> Internal record keeping.
        <br> We may use the information to improve our products and services. We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided. From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.
      </p>
    </div>
  </div>
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">SECURITY</h3>
    </div>
    <div class="col-12">
      <p>
        We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
      </p>
    </div>
  </div>
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">HOW WE USE COOKIES</h3>
    </div>
    <div class="col-12">
      <p>
        A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences. We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
      </p>
    </div>
  </div>
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">LINKS TO OTHER WEBSITES</h3>
    </div>
    <div class="col-12">
      <p>
        Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website.
        <br> Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
      </p>
    </div>
  </div>
  <div class="row card mt-5">
    <div class="col-12">
      <h3 class="mt-3 mb-0">CONTROLLING YOUR PERSONAL INFORMATION</h3>
    </div>
    <div class="col-12">
      <p>
        You may choose to restrict the collection or use of your personal information in the following ways:
        <br> whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing us to our facebook page. We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen. You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write in our facebook page. If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.
      </p>
    </div>
  </div>
</div>

</template>

<script>
export default {
  layout: 'public',
  name: 'PrivacyPolicy',
  props: [],
  fetch() {},
  data() {
    return {
      site: 'Wrapkend.com'
    }
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {

  },
  components: {

  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.PrivacyPolicy {}
p{
	font-family: $font1;
	font-weight: 100;
	color:$color3;
	font-size:14px;
}
</style>
