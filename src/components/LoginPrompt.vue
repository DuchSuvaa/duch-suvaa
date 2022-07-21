<template>
	<div class="prompt_bg" @click="store.state.showPrompt = false">
		<div class="login_prompt" @click.stop>
			Please <router-link to="/auth" @click="store.state.showPrompt = false">log in</router-link> in order to add a beat to the cart.
		</div>
	</div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

	.prompt_bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,.5);
		.login_prompt {
			background-color: map-get($grey, 'darken-4');
			padding: 2rem;
			border: 1px solid transparent;
			border-radius: 3px;
			box-shadow: 0px 0px 20px rgba(255,255,255,.25);
			padding: 3rem;
		}
	}
</style>