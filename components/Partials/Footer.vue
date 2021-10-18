<template>
    <section class="footer-wrapper">
        <div class="container">
            <a-spin :spinning="false">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                <div class="footer-content">
                    <div class="footer-catrgories">
                        <template v-if="categories.length">
                            <div class="footer-categories-title">Danh Mục</div>
                            <div class="footer-categories-list">
                                <a-row :gutter="16">
                                    <a-col v-for="(item, index) in categories" :key="index" :span="12" :lg="{ span: 6 }" :md="{ span: 8 }">
                                        <NuxtLink class="d-flex" :to="{ name: 'category', params: { category: item.slug } }">
                                            {{ item.name || "" }}
                                        </NuxtLink>
                                    </a-col>
                                </a-row>
                            </div>
                        </template>
                        <template v-else>
                            <a-empty></a-empty>
                        </template>
                    </div>
                    <div class="footer-catrgories">
                        <div class="footer-categories-title">Liên hệ với chúng tôi</div>
                        <div class="footer-categories-list">
                            <a-row :gutter="16">
                                <a-col :span="8" :lg="{ span: 6 }">
                                    <div class="footer-link-content">
                                        <transition name="fade" mode="out-in">
                                            <a target="_blank" v-if="settings.theme_shop_facebook_link" :href="settings.theme_shop_facebook_link" class="footer--link">
                                                <span class="image"><img alt="icon" src="~/assets/images/facebook.png" /></span>
                                                <span class="text">Facebook</span>
                                            </a>
                                        </transition>
                                        <transition name="fade" mode="out-in">
                                            <a target="_blank" v-if="settings.theme_shop_zalo_link" :href="settings.theme_shop_zalo_link" class="footer--link">
                                                <span class="image"><img alt="icon" src="~/assets/images/zalo.png" /></span>
                                                <span class="text">Zalo</span>
                                            </a>
                                        </transition>
                                    </div>
                                </a-col>
                                <a-col :span="16" :lg="{ span: 6 }">
                                    <div class="footer-link-content">
                                        <transition name="fade" mode="out-in">
                                            <a v-if="settings.ecommerce_store_phone" :href="`tel:${settings.ecommerce_store_phone}`" class="footer--link">
                                                <a-icon :rotate="90" type="phone" />
                                                <span class="text">{{ settings.ecommerce_store_phone || "" }}</span>
                                            </a>
                                        </transition>
                                        <transition name="fade" mode="out-in">
                                            <a v-if="settings.theme_shop_email" :href="`mailto:${settings.theme_shop_email}`" class="footer--link">
                                                <a-icon type="mail" />
                                                <span class="text">{{ settings.theme_shop_email || "" }}</span>
                                            </a>
                                        </transition>
                                    </div>
                                </a-col>
                                <a-col :span="8" :lg="{ span: 6 }">
                                    <div class="footer-link-content">
                                        <a type="button" @click="showContactForm" class="footer--link">
                                            <span class="text">Gửi phản hồi</span>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="16" :lg="{ span: 6 }">
                                    <div class="footer-link-content">
                                        <a type="button" @click="showNewsletterForm" class="footer--link">
                                            <span class="text">Đăng ký nhận tin</span>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </a-spin>
        </div>
        <div class="copyright">
            <div class="container">
                <transition name="fade" mode="out-in">
                    <p v-if="settings.theme_copyright">{{ settings.theme_copyright || "" }}</p>
                </transition>
            </div>
        </div>
        <ContactForm @closeForm="handleCloseContactForm" :visible="contactVisible" />
        <NewsletterForm @closeForm="handleCloseNewsletterForm" :visible="newsletterVisible" />
    </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ContactForm from "~/components/Base/ContactForm";
import NewsletterForm from "~/components/Base/NewsletterForm";

export default {
    components: {
        ContactForm,
        NewsletterForm
    },
    name: "Footer",
    data() {
        return {
            contactVisible: false,
            newsletterVisible: false
        };
    },
    computed: {
        ...mapGetters({
            categories: "home/getCategories",
            settings: "home/getSettings"
        })
    },
    methods: {
        showContactForm() {
            this.contactVisible = true;
        },
        handleCloseContactForm() {
            this.contactVisible = false;
        },
        showNewsletterForm() {
            this.newsletterVisible = true;
        },
        handleCloseNewsletterForm() {
            this.newsletterVisible = false;
        }
    }
};
</script>

<style scoped></style>
