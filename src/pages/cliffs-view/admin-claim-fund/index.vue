<template>
    <NModal :show="visible" :block-scroll="true" :mask-closable="false">
        <NCard :bordered="false" size="huge" style="max-width:640px;">
            <template #header>
                <NText>Claim Fund</NText>
            </template>
            <template #header-extra>
                <NButton strong secondary circle :disabled="isLoading" @click.stop.prevent="onPressClose">
                    <template #icon>
                        <IconClose />
                    </template>
                </NButton>
            </template>
            <NSpin :show="error === -1">
                <template v-if="error === 0">
                    <NSpace vertical :wrap-item="false" :size="[16, 16]">
                        <NSpace vertical :wrap-item="false" :size="[4, 4]">
                            <NText depth="3" style="font-size:16px">Total Fund</NText>
                            <NText strong>{{ totalFund }} USDT</NText>
                        </NSpace>
                        <TokenInput v-model:value="inputValue" />
                        <NButton type="primary" strong size="large" :loading="isLoading" @click="onPressClaim"
                            style="background-color:var(--n-color);width:100%;"> Claim
                        </NButton>
                    </NSpace>
                </template>
            </NSpin>
        </NCard>
    </NModal>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
    NModal,
    NSpace,
    NCard,
    NText,
    NInput,
    NButton,
    NDescriptions,
    NDescriptionsItem,
    NSpin,
    NEmpty,
    useMessage,
} from 'naive-ui';
import { Close as IconClose } from '@vicons/ionicons5';
import { ethers } from 'ethers';
import TokenInput from '@/components/token-input.vue';
import { ApiManager } from '@/web3/api';
import { PublicSaleApi } from '@/web3/api/public-sale';

export default defineComponent({
    name: 'admin-claim-fund',
    props: {
        visible: { type: Boolean, default: false },
        totalFund: { type: String, default: '' },
        contract: { type: String, default: '' },
    },
    components: {
        NModal,
        NSpace,
        NCard,
        NText,
        NInput,
        NButton,
        NDescriptions,
        NDescriptionsItem,
        NSpin,
        NEmpty,
        IconClose,
        TokenInput,
    },
    emits: ['update:visible'],
    setup(props, ctx) {
        const message = useMessage();
        const apiManager = ApiManager.getInstance();
        let publicSaleApi: PublicSaleApi | null = null;

        const error = ref(-1);
        const errorText = ref('');

        const inputValue = ref('');
        const isLoading = ref(false);

        const init = async () => {
            error.value = -1;
            errorText.value = '';
            inputValue.value = '';

            publicSaleApi = apiManager.create<PublicSaleApi>(PublicSaleApi, { address: props.contract });

            //Promise all

            error.value = 0;
        };

        onMounted(() => {
            init();
        });

        return {
            error,
            errorText,
            inputValue,
            isLoading,
            onPressClose() {
                if (isLoading.value) return;
                ctx.emit('update:visible', false);
            },
            async onPressClaim() {
                if (!inputValue.value) return;
                const amount = ethers.parseUnits(inputValue.value, 6);
                isLoading.value = true;
                const resp2 = await publicSaleApi!.claimFund({ amount });
                isLoading.value = false;
                if (resp2._result !== 0) {
                    console.info(resp2);
                    message.error(resp2._desc || 'Claim failure');
                    return;
                }
                ctx.emit('update:visible', false);
            },
        };
    },
});
</script>
  