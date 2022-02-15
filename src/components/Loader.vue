<template>
  <div class="bouncing-dots">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .bouncing-dots {
    width: 5rem;
    height: 3.5rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    div {
      width: 1rem;
      height: 1rem;
      border: 1px solid transparent;
      border-radius: 50%;
      background-color: map-get($blue, 'lighten-1');
      animation: bounce cubic-bezier(.19,.57,.03,.98) 0.5s infinite alternate;
      &:nth-child(2) { animation-delay: 0.1s; opacity: .8; }
      &:nth-child(3) { animation-delay: 0.2s; opacity: .65; }
      &:nth-child(4) { animation-delay: 0.3s; opacity: .5; }
    }
  }

  @keyframes bounce {
    from { transform: translateY(0) }
    to { transform: translateY(-25px) }
  }
</style>