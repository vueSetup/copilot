<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
const count = ref(0)

const containerRef = useTemplateRef<HTMLDivElement>('container')

onMounted(() => {
    console.log(containerRef.value)
})
</script>

<template>
    <button @click="count++">Count is: {{ count }}</button>
    <div ref="container"></div>
</template>
