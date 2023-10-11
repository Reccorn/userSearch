<script setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import UserInfo from '@/components/UserInfo.vue'
import { ref } from 'vue'

const chosenId = ref('')
</script>

<template>
	<Header />
	<main>
		<div class="container">
			<div class="main__content">
				<Sidebar v-model:id="chosenId" />
				<UserInfo :id="chosenId" />
			</div>
		</div>
	</main>
</template>