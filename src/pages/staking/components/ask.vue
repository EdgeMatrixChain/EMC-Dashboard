<template>
  <div class="w-full flex flex-col md:pt-[90px] pt-[30px] flex-shrink-0 pb-[54px] md:pb-[300px] px-[24px]">
    <div class="w-full h-full absolute top-0 left-0 bg-[#030003]"></div>
    <h2 class="md:text-[48px] mb-[15px] md:mb-0 text-[32px] font-bold leading-[32px] md:leading-[84px] text-[#fff] flex justify-center relative z-50">
      Why Stake with EMC?
    </h2>
    <div class="max-w-[742px] flex-col mx-auto flex w-full flex-1 mt-[20px] md:mt-[50px] flex-shrink-0 relative z-50">
      <div
        class="flex flex-col duration-300 md:mb-[40px] border border-[#5A1DDD] mb-[20px] w-full overflow-hidden rounded-[10px]"
        v-for="item in items"
        :key="item.key"
      >
        <div
          class="py-[20px] h-[calc(100%-4px)] cursor-pointer md:pl-[40px] pl-[20px] group duration-300 overflow-hidden rounded-[10px] flex-shrink-0 bg-[#100d10] m-[2px]"
        >
          <p class="md:text-[20px] text-[16px] font-semibold text-[#fff]">{{ item.label }}</p>
          <p
            class="text-[#fff]/70 mt-[15px] sm:mt-[0] group-hover:mt-[15px] md:text-[16px] text-[13px] leading-[24px] h-auto sm:h-[0] opacity-100 sm:h-opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 duration-300"
          >
            {{ item.describe }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    key: 1,
    label: '1.Earn EMC Ecosystem Rewards.',
    describe:
      'A simple way to increase your holdings: staking your EMC tokens provides an opportunity to earn additional EMC tokens. Come and actively participate in the growth of our ecosystem.',
  },
  {
    key: 2,
    label: '2. Multiplier e-Power for Mining Rewards.',
    describe:
      "Stakers can benefit from a multiplier e-Power for mining rewards. It's an incentive for actively supporting our network and enjoying additional gains.",
  },
  {
    key: 3,
    label: '3. Enhanced Community Governance.',
    describe:
      "By staking, you gain a voice in EMC's governance. Your participation can help shape the future of our project, ensuring it aligns with your interests.",
  },
  {
    key: 4,
    label: '4. Secure the Computing Network.',
    describe:
      ' Stakers play a pivotal role in maintaining the stability and security of our computing network. Your contribution enhances the overall integrity of our platform.',
  },
];
</script>

<style scoped></style>
