<template>
    <div v-if="loading" class="main-loading">
        <div class="ajax-spinner-bars">
            <div class="bar-1"></div>
            <div class="bar-2"></div>
            <div class="bar-3"></div>
            <div class="bar-4"></div>
            <div class="bar-5"></div>
            <div class="bar-6"></div>
            <div class="bar-7"></div>
            <div class="bar-8"></div>
            <div class="bar-9"></div>
            <div class="bar-10"></div>
            <div class="bar-11"></div>
            <div class="bar-12"></div>
            <div class="bar-13"></div>
            <div class="bar-14"></div>
            <div class="bar-15"></div>
            <div class="bar-16"></div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.main-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: block;
    width: 100%;
    overflow: hidden;
    height: 100%;
    background: #fff;
    cursor: pointer;
}
.ajax-spinner-bars {
    position: absolute;
    width: 35px;
    height: 35px;
    left: 50%;
    top: 50%;
}
.ajax-spinner-bars > div {
    position: absolute;
    width: 2px;
    height: 8px;
    background-color: #ee4d2d;
    opacity: 0.05;
    animation: fadeit 0.8s linear infinite;
}
.ajax-spinner-bars > .bar-1 {
    transform: rotate(0deg) translate(0, -12px);
    animation-delay: 0.05s;
}
.ajax-spinner-bars > .bar-2 {
    transform: rotate(22.5deg) translate(0, -12px);
    animation-delay: 0.1s;
}
.ajax-spinner-bars > .bar-3 {
    transform: rotate(45deg) translate(0, -12px);
    animation-delay: 0.15s;
}
.ajax-spinner-bars > .bar-4 {
    transform: rotate(67.5deg) translate(0, -12px);
    animation-delay: 0.2s;
}
.ajax-spinner-bars > .bar-5 {
    transform: rotate(90deg) translate(0, -12px);
    animation-delay: 0.25s;
}
.ajax-spinner-bars > .bar-6 {
    transform: rotate(112.5deg) translate(0, -12px);
    animation-delay: 0.3s;
}
.ajax-spinner-bars > .bar-7 {
    transform: rotate(135deg) translate(0, -12px);
    animation-delay: 0.35s;
}
.ajax-spinner-bars > .bar-8 {
    transform: rotate(157.5deg) translate(0, -12px);
    animation-delay: 0.4s;
}
.ajax-spinner-bars > .bar-9 {
    transform: rotate(180deg) translate(0, -12px);
    animation-delay: 0.45s;
}
.ajax-spinner-bars > .bar-10 {
    transform: rotate(202.5deg) translate(0, -12px);
    animation-delay: 0.5s;
}
.ajax-spinner-bars > .bar-11 {
    transform: rotate(225deg) translate(0, -12px);
    animation-delay: 0.55s;
}
.ajax-spinner-bars > .bar-12 {
    transform: rotate(247.5deg) translate(0, -12px);
    animation-delay: 0.6s;
}
.ajax-spinner-bars > .bar-13 {
    transform: rotate(270deg) translate(0, -12px);
    animation-delay: 0.65s;
}
.ajax-spinner-bars > .bar-14 {
    transform: rotate(292.5deg) translate(0, -12px);
    animation-delay: 0.7s;
}
.ajax-spinner-bars > .bar-15 {
    transform: rotate(315deg) translate(0, -12px);
    animation-delay: 0.75s;
}
.ajax-spinner-bars > .bar-16 {
    transform: rotate(337.5deg) translate(0, -12px);
    animation-delay: 0.8s;
}
@keyframes fadeit {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
