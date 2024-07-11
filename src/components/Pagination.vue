<template>
    <div class="flex gap-3">
        <button>Prev</button>
        <button 
            v-for="page in pages" 
            :key="page"
            @click="changePage(page)">
            {{page}}
        </button>
        <button>Next</button>
    </div>
</template>
<script>
    export default {
        props: {
            pages: {
                type: Number,
                required: true,
            }
        },
        methods: {
            changePage(page) {
                this.$emit('page-changed', page)
            }
        }
    }
</script>