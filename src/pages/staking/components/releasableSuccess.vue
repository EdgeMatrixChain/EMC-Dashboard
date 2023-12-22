<template>
    <n-modal v-model:show="show">
        <n-card class="withdraw-modal w-[calc(100%-30px)] md:w-[550px]" title="" :bordered="false" size="huge" role="dialog"
            aria-modal="true">
            <div class="flex flex-col px-[50px] items-center relative bg-[#1A1C34] rounded-[24px]">
                <i class="absolute right-[30px] top-[30px] cursor-pointer" @click="emits('close', false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M14.3026 14.115C14.2329 14.1848 14.1502 14.2401 14.0592 14.2778C13.9681 14.3156 13.8705 14.335 13.772 14.335C13.6734 14.335 13.5758 14.3156 13.4847 14.2778C13.3937 14.2401 13.311 14.1848 13.2413 14.115L9.00008 9.87378L4.75883 14.115C4.68914 14.1847 4.60642 14.24 4.51537 14.2777C4.42433 14.3154 4.32675 14.3348 4.2282 14.3348C4.12965 14.3348 4.03207 14.3154 3.94103 14.2777C3.84998 14.24 3.76726 14.1847 3.69758 14.115C3.62789 14.0453 3.57262 13.9626 3.53491 13.8716C3.49719 13.7805 3.47778 13.6829 3.47778 13.5844C3.47778 13.4859 3.49719 13.3883 3.53491 13.2972C3.57262 13.2062 3.62789 13.1235 3.69758 13.0538L7.93883 8.81253L3.69758 4.57128C3.5931 4.46617 3.5221 4.33248 3.49354 4.18706C3.46498 4.04164 3.48014 3.89102 3.53711 3.75421C3.59408 3.6174 3.69031 3.50054 3.81364 3.41837C3.93697 3.3362 4.08188 3.29241 4.23008 3.29253C4.42813 3.29237 4.61821 3.37056 4.75883 3.51003L9.00008 7.75128L13.2413 3.51003C13.3464 3.40555 13.4801 3.33455 13.6255 3.30599C13.771 3.27743 13.9216 3.29259 14.0584 3.34956C14.1952 3.40653 14.3121 3.50276 14.3942 3.62609C14.4764 3.74942 14.5202 3.89433 14.5201 4.04253C14.5202 4.24058 14.442 4.43066 14.3026 4.57128L10.0613 8.81253L14.3026 13.0538C14.3723 13.1234 14.4276 13.2061 14.4654 13.2972C14.5031 13.3882 14.5225 13.4858 14.5225 13.5844C14.5225 13.683 14.5031 13.7806 14.4654 13.8716C14.4276 13.9627 14.3723 14.0454 14.3026 14.115Z"
                            fill="white" fill-opacity="0.7" />
                    </svg>
                </i>
                <div class="mt-[50px] md:w-[105px] w-[70px] md:h-[105px] h-[70px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 105 105" fill="none">
                        <circle cx="52.5" cy="52.5" r="52.5" fill="url(#paint0_linear_462_14781)" />
                        <path
                            d="M26 60.1944C26 60.1944 41.0854 66.4577 48.5839 80C57.5905 63.2414 74.8786 47.6096 80 46.4535C80 39.5181 80 36.6656 80 26C59.3652 39.5423 49.4566 64.4783 49.4566 64.4783L38.6007 53L26 60.1944Z"
                            fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_462_14781" x1="0" y1="0" x2="100.263" y2="105"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#15AEFA" />
                                <stop offset="0.498607" stop-color="#E389FF" />
                                <stop offset="1" stop-color="#7F32FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <p class="mt-[30px] text-white text-[24px] leading-[24px] font-medium">Congrats!</p>
                <p class="mt-[20px] mb-[50px] text-center flex text-[14px] leading-[20px] text-[#fff]/70 font-medium">
                    You have now successfully unstaked
                </p>
            </div>
        </n-card>
    </n-modal>
</template>

<script setup>
import { NModal, NCard } from 'naive-ui';
import { toRefs, defineProps } from 'vue'

const props = defineProps({
    show: Boolean,
})
const { show } = toRefs(props)

const emits = defineEmits(['close'])

</script>

<style scoped>
.withdraw-modal {
    background: none;
}

.withdraw-modal /deep/ .n-card__content {
    padding: 0;
}
</style>
