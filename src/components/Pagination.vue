<template>
    <div class="flex justify-center gap-0 py-3">
        <button class="px-1 align-center text-sm rounded-3 disabled:bg-transparent disabled:text-gray-100" 
            @click="pagePrev"
            :disabled="disabledPrev">
            Prev
        </button>
        <button 
            v-for="page in pages" 
            :key="page"
            :class="[{'bg-gray-100 text-main': this.currentPage === page}]"
            class="px-1 align-center text-sm rounded-3"
            @click="changePage(page)">
            {{page}}
        </button>
        <button class="px-1 align-center text-sm rounded-3 disabled:bg-transparent disabled:text-gray-100" 
            @click="pageNext"
            :disabled="disabledNext">
            Next
        </button>
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
                window.scrollTo(0, 0)
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