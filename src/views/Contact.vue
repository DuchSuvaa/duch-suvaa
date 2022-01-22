<template>
  <div class="contact-header">
    <div class="contact-header-image container">
      <img src="@/assets/contact-header.png" modernize />
      <div class="contact-heading">
        <h1>CONTACT</h1>
      </div>
    </div>
  </div>
  <div class="container contact">
    <p>In case of any questions contact me at:</p>
    <hr>
    <div class="contact-email">
      <a href="mailto:bga.sowa@gmail.com">bga.sowa@gmail.com</a>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@/scss/_variables.scss';


  .contact-header {
    background-image: url('../assets/contact-header-bg.png');
    background-size: cover;
    margin-bottom: 2rem;
    .contact-header-image {
      position: relative;
      picture {
        img {
          width: 100%;
        }
      }
      .contact-heading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        h1 {
          width: 100%;
          text-align: center;
          padding: 0 2rem;
          text-shadow: $heading-text-shadow;
          color: map-get($grey, 'darken-4');
          font-family: monsters;
          span {
            display: inline-block;
            color: map-get($red, 'darken-4');
          }
        }
      }
    }
  }

  .contact {
    p {
      text-align: center;
    }
    hr {
      width: 5rem;
    }
    .contact-email {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        font-size: 3.2rem;
        font-weight: 800;
        color: map-get($blue-grey, 'lighten-5');
      }
    }
  }
</style>