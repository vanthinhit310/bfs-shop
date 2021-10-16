<template>
    <div :class="`facebook-page-container ${active ? 'active' : ''}`">
        <button @click="toggleFanpage">FANPAGE</button>
        <div class="facebook-embed">
            <div
                class="fb-page"
                data-href="https://www.facebook.com/buyfirststore"
                data-tabs="timeline,messages"
                data-width="300"
                data-height="450"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
            >
                <blockquote cite="https://www.facebook.com/buyfirststore" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/buyfirststore/">Buy First Store Thể Thao</a></blockquote>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: false
        };
    },
    methods: {
        toggleFanpage() {
            this.active = !this.active;
        }
    }
};
</script>

<style scoped></style>
