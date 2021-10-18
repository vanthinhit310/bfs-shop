<template>
    <div class="container">
        <template v-if="error.statusCode === 404">
            <a-result status="404" title="404" sub-title="Xin lỗi, trang bạn truy cập không tồn tại.">
                <template #extra>
                    <NuxtLink to="/">Trang chủ</NuxtLink>
                </template>
            </a-result>
        </template>
        <template v-else>
            <a-result status="500" title="500" sub-title="Xin lỗi, máy chủ sai.">
                <template #extra>
                    <a-button type="primary"> Back Home </a-button>
                </template>
            </a-result>
        </template>
    </div>
</template>

<script>
export default {
    props: ["error"],
    layout: "error"
};
</script>

<style scoped></style>
