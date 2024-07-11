<template>
    <div class="flex gap-3">
        <button @click="pagePrev" :disabled="disabledPrev">Prev</button>
        <button 
            v-for="page in pages" 
            :key="page"
            @click="changePage(page)">
            {{page}}
        </button>
        <button @click="pageNext" :disabled="disabledNext">Next</button>
    </div>
</template>
<script>
    export default {
        props: {
            pages: {
                type: Number,
                required: true,
            },
            currentPage: {
                type: Number,
                required: true,
            }
        },
        computed: {
            disabledPrev() {
                return this.currentPage === 1;
            },
            disabledNext() {
                return this.currentPage === this.pages;
            },
        },
        methods: {
            changePage(page) {
                this.$emit('page-changed', page)
            },
            pagePrev() {
                this.changePage(this.currentPage - 1);
            },
            pageNext() {
                this.changePage(this.currentPage + 1);
            },
        }
    }
</script>