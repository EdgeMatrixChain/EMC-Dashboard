<template>
    <div class="w-screen flex flex-col bg-[rgb(0,2,27)] fixed left-0 h-screen top-0 overflow-y-scroll">
        <!-- 背景 -->
        <Star />

        <!-- 头部 -->
        <div
            class="flex z-50 fixed max-w-[1340px] w-full px-5 top-0 left-0 justify-between h-[90px] flex-shrink-0 items-center">
            <img class="md:w-[211px] md:h-[39px] w-[148px] h-[31px] flex-shrink-0" src="./images/logo.png" alt="">
            <div
                class="w-[128px] h-[35px] md:w-[160px] md:h-[44px] flex justify-center items-center text-[14px] md:text-[16px] text-[#fff] font-bold cursor-pointer rounded-[8px] btn-bg flex-shrink-0">
                Wallet Connect
            </div>
        </div>

        <!-- 第一页 -->
        <div class="w-full relative z-10 flex flex-col pt-[90px] h-screen min-h-[670px] flex-shrink-0">
            <div class="relative max-w-[1340px] mx-auto justify-center flex w-full flex-1 px-5 flex-shrink-0">
                <div class="flex flex-1 flex-col justify-center items-center">
                    <h1
                        class="text-[58px] leading-[58px] w-full text-center md:w-[50%] xl:text-[68px] font-bold xl:leading-[84px] text-[#fff]">
                        Earn rewards while securing EMC
                    </h1>
                    <p class="mt-[50px] text-[20px] w-full md:w-[50%] text-center leading-[30px] text-white/70">
                        Unlock the
                        power of your
                        EMC
                        tokens and
                        contribute to
                        EMC
                        network's
                        security and
                        growth through
                        staking.</p>
                </div>
                <div class="page-one-bg absolute top-0"></div>
            </div>
            <div class="h-[138px] w-full flex backdrop-filter bg-[rgb(26,27,51)]">
                <div class="max-w-[1340px] mx-auto flex w-full justify-center flex-1 px-5 flex-shrink-0">
                    <div
                        class="flex flex-col items-center justify-center relative pr-[100px] after:bg-white/20 after:absolute after:right-[50px] after:content-[''] after:flex after:w-[1px] after:h-[40px]">
                        <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">25,349.239</p>
                        <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">TOTAL EMC
                            STAKED</em>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center relative pr-[100px] after:bg-white/20 after:absolute after:right-[50px] after:content-[''] after:flex after:w-[1px] after:h-[40px]">
                        <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">864,769</p>
                        <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">TOTAL
                            VALIDATORS</em>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center relative pr-[100px] after:bg-white/20 after:absolute after:right-[50px] after:content-[''] after:flex after:w-[1px] after:h-[40px]">
                        <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">874,490</p>
                        <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">Volume in
                            circulation</em>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">3%~6%</p>
                        <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">APR</em>
                    </div>
                </div>
            </div>
            <Bg />
        </div>

        <!-- 第二页 -->
        <div class="w-full relative z-10 flex flex-col pt-[90px] flex-shrink-0">
            <h2 class="text-[48px] font-bold leading-[84px] text-[#fff] flex justify-center">Staking with EMC</h2>
            <div class="max-w-[1340px] mx-auto flex w-full flex-1 px-5 mt-[50px] flex-shrink-0">
                <div
                    class="bg-[#1A1C34] pt-[76px] flex-col md:flex-row pb-[68px] rounded-[24px] border-[2px] border-[#fff]/20 flex w-full mb-[30px]">
                    <div class="flex flex-[1.1] flex-col pl-[80px]">
                        <div class="flex items-center">
                            <p class="mr-[10px] text-[28px] leading-[28px] text-[#fff]">Duration (Days)</p>
                            <n-popover trigger="hover">
                                <template #trigger>
                                    <i class="flex cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none">
                                            <g opacity="0.7">
                                                <path
                                                    d="M18.1561 18.156C19.3733 16.9395 20.2024 15.3893 20.5386 13.7015C20.8747 12.0137 20.7027 10.2642 20.0443 8.67418C19.386 7.08417 18.2709 5.72511 16.8401 4.76891C15.4093 3.81271 13.727 3.30233 12.0061 3.30233C10.2852 3.30233 8.60292 3.81271 7.1721 4.76891C5.74129 5.72511 4.62619 7.08417 3.96786 8.67418C3.30953 10.2642 3.13754 12.0137 3.47365 13.7015C3.80976 15.3893 4.63887 16.9395 5.8561 18.156C7.48752 19.7864 9.69962 20.7023 12.0061 20.7023C14.3126 20.7023 16.5247 19.7864 18.1561 18.156ZM19.2001 19.2C17.775 20.63 15.9576 21.605 13.978 22.0014C11.9985 22.3978 9.94579 22.1979 8.07993 21.4269C6.21407 20.656 4.61896 19.3486 3.49661 17.6705C2.37426 15.9923 1.77515 14.0189 1.77515 12C1.77515 9.98112 2.37426 8.00765 3.49661 6.32951C4.61896 4.65136 6.21407 3.34402 8.07993 2.57305C9.94579 1.80207 11.9985 1.60214 13.978 1.99857C15.9576 2.395 17.775 3.36997 19.2001 4.79999C21.1053 6.71184 22.1751 9.3009 22.1751 12C22.1751 14.6991 21.1053 17.2881 19.2001 19.2ZM12.1081 6.95999C11.7005 6.93837 11.293 7.0055 10.9139 7.15674C10.5347 7.30799 10.1929 7.53974 9.9121 7.83599C9.37954 8.4303 9.10349 9.21102 9.1441 10.008V10.248H10.5721V10.008C10.5529 9.5806 10.6752 9.1588 10.9201 8.80799C11.0593 8.6278 11.2435 8.48746 11.4541 8.40109C11.6648 8.31472 11.8945 8.28537 12.1201 8.31599C12.3031 8.3007 12.4872 8.32375 12.6608 8.38367C12.8344 8.44359 12.9935 8.53907 13.1281 8.66399C13.245 8.79126 13.3351 8.94083 13.3928 9.10372C13.4505 9.26662 13.4748 9.4395 13.4641 9.61199C13.4633 9.9094 13.3521 10.1959 13.1521 10.416C13.0285 10.5599 12.8963 10.6962 12.7561 10.824C12.2689 11.2334 11.8619 11.7299 11.5561 12.288C11.3824 12.6634 11.3001 13.0746 11.3161 13.488V14.004H12.7561V13.488C12.7493 13.2231 12.8158 12.9615 12.9481 12.732C13.0832 12.503 13.2579 12.2998 13.4641 12.132C13.7962 11.8025 14.1087 11.4539 14.4001 11.088C14.7424 10.6407 14.9242 10.0912 14.9161 9.52799C14.9352 9.18069 14.8785 8.83339 14.75 8.51016C14.6215 8.18692 14.4244 7.89547 14.1721 7.65599C13.891 7.40949 13.5639 7.22108 13.2097 7.10162C12.8554 6.98216 12.481 6.93403 12.1081 6.95999ZM11.9281 14.736C11.8012 14.7326 11.675 14.7553 11.5574 14.8028C11.4397 14.8503 11.3331 14.9215 11.2441 15.012C11.1527 15.0977 11.0808 15.2021 11.0332 15.318C10.9855 15.434 10.9634 15.5588 10.9681 15.684C10.9647 15.8108 10.9874 15.937 11.0349 16.0547C11.0824 16.1724 11.1536 16.279 11.2441 16.368C11.429 16.5427 11.6737 16.64 11.9281 16.64C12.1825 16.64 12.4272 16.5427 12.6121 16.368C12.7075 16.2797 12.7827 16.1717 12.8324 16.0516C12.8821 15.9314 12.9052 15.8019 12.9001 15.672C12.9019 15.5471 12.8784 15.4232 12.8309 15.3077C12.7835 15.1922 12.7131 15.0875 12.6241 15C12.5319 14.9113 12.4227 14.8422 12.3031 14.7968C12.1835 14.7515 12.0559 14.7308 11.9281 14.736Z"
                                                    fill="white" />
                                            </g>
                                        </svg>
                                    </i>
                                </template>
                                <span>The time interval during which staked tokens are gradually released.</span>
                            </n-popover>
                        </div>
                        <div class="flex mt-[34px] w-full flex-wrap">
                            <div v-for="item in daysList" :key="item.id"
                                class="relative rounded-[8px] duration-300 cursor-pointer border-[2px] mr-[36px] mb-[30px] border-[#fff]/20 w-[144px] h-[54px] flex items-center justify-center text-[24px] font-medium text-[#fff]"
                                :class="item.id === currentDay && '!border-[#FFB017]'" @click="currentDay = item.id">
                                <div v-show="item.id === currentDay"
                                    class="w-8 overflow-hidden inline-block absolute right-0 top-0">
                                    <div class="h-16 bg-[#FFB017] -rotate-45 transform origin-top-left"></div>
                                    <i class="absolute top-0 right-[2px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                            fill="none">
                                            <path
                                                d="M0.940918 9.90486C0.940918 9.90486 4.85025 11.5386 6.79348 15.0709C9.12751 10.6996 13.6077 6.62227 14.9349 6.32071C14.9349 4.5117 14.9349 3.76767 14.9349 0.985672C9.58742 4.51803 7.01963 11.0223 7.01963 11.0223L4.20635 8.02831L0.940918 9.90486Z"
                                                fill="white" />
                                        </svg>
                                    </i>
                                </div>
                                {{ item.label }}
                            </div>
                        </div>

                        <div class="flex items-center mt-[20px]">
                            <p class="mr-[10px] text-[28px] leading-[28px] text-[#fff]">Staking Phases</p>
                            <n-popover trigger="hover">
                                <template #trigger>
                                    <i class="flex cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none">
                                            <g opacity="0.7">
                                                <path
                                                    d="M18.1561 18.156C19.3733 16.9395 20.2024 15.3893 20.5386 13.7015C20.8747 12.0137 20.7027 10.2642 20.0443 8.67418C19.386 7.08417 18.2709 5.72511 16.8401 4.76891C15.4093 3.81271 13.727 3.30233 12.0061 3.30233C10.2852 3.30233 8.60292 3.81271 7.1721 4.76891C5.74129 5.72511 4.62619 7.08417 3.96786 8.67418C3.30953 10.2642 3.13754 12.0137 3.47365 13.7015C3.80976 15.3893 4.63887 16.9395 5.8561 18.156C7.48752 19.7864 9.69962 20.7023 12.0061 20.7023C14.3126 20.7023 16.5247 19.7864 18.1561 18.156ZM19.2001 19.2C17.775 20.63 15.9576 21.605 13.978 22.0014C11.9985 22.3978 9.94579 22.1979 8.07993 21.4269C6.21407 20.656 4.61896 19.3486 3.49661 17.6705C2.37426 15.9923 1.77515 14.0189 1.77515 12C1.77515 9.98112 2.37426 8.00765 3.49661 6.32951C4.61896 4.65136 6.21407 3.34402 8.07993 2.57305C9.94579 1.80207 11.9985 1.60214 13.978 1.99857C15.9576 2.395 17.775 3.36997 19.2001 4.79999C21.1053 6.71184 22.1751 9.3009 22.1751 12C22.1751 14.6991 21.1053 17.2881 19.2001 19.2ZM12.1081 6.95999C11.7005 6.93837 11.293 7.0055 10.9139 7.15674C10.5347 7.30799 10.1929 7.53974 9.9121 7.83599C9.37954 8.4303 9.10349 9.21102 9.1441 10.008V10.248H10.5721V10.008C10.5529 9.5806 10.6752 9.1588 10.9201 8.80799C11.0593 8.6278 11.2435 8.48746 11.4541 8.40109C11.6648 8.31472 11.8945 8.28537 12.1201 8.31599C12.3031 8.3007 12.4872 8.32375 12.6608 8.38367C12.8344 8.44359 12.9935 8.53907 13.1281 8.66399C13.245 8.79126 13.3351 8.94083 13.3928 9.10372C13.4505 9.26662 13.4748 9.4395 13.4641 9.61199C13.4633 9.9094 13.3521 10.1959 13.1521 10.416C13.0285 10.5599 12.8963 10.6962 12.7561 10.824C12.2689 11.2334 11.8619 11.7299 11.5561 12.288C11.3824 12.6634 11.3001 13.0746 11.3161 13.488V14.004H12.7561V13.488C12.7493 13.2231 12.8158 12.9615 12.9481 12.732C13.0832 12.503 13.2579 12.2998 13.4641 12.132C13.7962 11.8025 14.1087 11.4539 14.4001 11.088C14.7424 10.6407 14.9242 10.0912 14.9161 9.52799C14.9352 9.18069 14.8785 8.83339 14.75 8.51016C14.6215 8.18692 14.4244 7.89547 14.1721 7.65599C13.891 7.40949 13.5639 7.22108 13.2097 7.10162C12.8554 6.98216 12.481 6.93403 12.1081 6.95999ZM11.9281 14.736C11.8012 14.7326 11.675 14.7553 11.5574 14.8028C11.4397 14.8503 11.3331 14.9215 11.2441 15.012C11.1527 15.0977 11.0808 15.2021 11.0332 15.318C10.9855 15.434 10.9634 15.5588 10.9681 15.684C10.9647 15.8108 10.9874 15.937 11.0349 16.0547C11.0824 16.1724 11.1536 16.279 11.2441 16.368C11.429 16.5427 11.6737 16.64 11.9281 16.64C12.1825 16.64 12.4272 16.5427 12.6121 16.368C12.7075 16.2797 12.7827 16.1717 12.8324 16.0516C12.8821 15.9314 12.9052 15.8019 12.9001 15.672C12.9019 15.5471 12.8784 15.4232 12.8309 15.3077C12.7835 15.1922 12.7131 15.0875 12.6241 15C12.5319 14.9113 12.4227 14.8422 12.3031 14.7968C12.1835 14.7515 12.0559 14.7308 11.9281 14.736Z"
                                                    fill="white" />
                                            </g>
                                        </svg>
                                    </i>
                                </template>
                                <span>The times of chosen staking periods.</span>
                            </n-popover>
                        </div>

                        <div class="flex mt-[34px] items-center">
                            <n-input-number size="large" :bordered="false" v-model:value="phase"
                                :update-value-on-input="false" placeholder="" :min="phaseMin" :max="phaseMax"
                                :show-button="false" />
                            <p class="ml-3 text-[20px] text-[#fff] font-medium">Phase</p>
                            <span class="flex flex-col ml-[12px]">
                                <div @click="phaseAdd" class="w-6 overflow-hidden inline-block cursor-pointer">
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 0L13.0622 9H0.937822L7 0Z" fill="white" />
                                    </svg>
                                </div>

                                <div @click="phaseDecrease" class="w-6 overflow-hidden inline-block cursor-pointer mt-2">
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 9L13.0622 3.76515e-07L0.937823 -1.74337e-06L7 9Z" fill="white" />
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <p class="text-[#FFB017] text-[16px] font-medium mt-[22px]">30Days * Phase 10 (APY 2.6%)</p>
                        <div class="flex flex-col w-full mt-[56px] relative">
                            <div class="absolute left-0 top-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="123" viewBox="0 0 9 123"
                                    fill="none">
                                    <line x1="4.5" y1="-2.18557e-08" x2="4.50001" y2="123"
                                        stroke="url(#paint0_linear_179_495)" />
                                    <circle cx="4.5" cy="105.5" r="4.5" fill="white" />
                                    <circle cx="4.5" cy="13.5" r="4.5" fill="#FFB017" />
                                    <circle cx="4.5" cy="59.5" r="4.5" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_179_495" x1="4" y1="123" x2="4" y2="0"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="white" stop-opacity="0" />
                                            <stop offset="0.541667" stop-color="white" />
                                            <stop offset="1" stop-color="white" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex ml-[20px] justify-between mr-[10%] mt-[3px]">
                                    <p class="text-[18px] font-medium text-[#fff]/70 leading-[18px]">Initiate of pledge:
                                    </p>
                                    <p>2023-10-19 14:23</p>
                                </div>
                                <div class="flex ml-[20px] justify-between mr-[10%] mt-[24px]">
                                    <p class="text-[18px] font-medium text-[#fff]/70 leading-[18px]">Last release time:
                                    </p>
                                    <p>2023-10-19 14:23</p>
                                </div>
                                <div class="flex ml-[20px] justify-between mr-[10%] mt-[24px]">
                                    <p class="text-[18px] font-medium text-[#fff]/70 leading-[18px]">End of pledge:</p>
                                    <p>2023-10-19 14:23</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex flex-1 flex-col justify-center pr-[80px] relative before:content-[''] before:left-0 before:w-[2px] before:absolute before:h-[360px] before:bg-[#fff]/20">
                        <div
                            class="flex flex-col w-[417px] py-[33px] px-[40px] ml-auto flex-shrink-0 rounded-[16px] border-[2px] border-[#fff]/20">
                            <div class="flex mb-[35px]">
                                <p class="text-[18px] text-white/70 font-medium leading-[18px]">Est. APR:</p>
                                <p class="text-[18px] text-white font-medium leading-[18px]">3~6%</p>
                            </div>
                            <div class="flex mb-[35px]">
                                <p class="text-[18px] text-white/70 font-medium leading-[18px]">Daily Earnings:</p>
                                <p class="text-[18px] text-white font-medium leading-[18px]">20.23 EMC</p>
                            </div>
                            <div class="flex mb-[35px]">
                                <p class="text-[18px] text-white/70 font-medium leading-[18px]">Monthly Earnings:</p>
                                <p class="text-[18px] text-white font-medium leading-[18px]">500 EMC</p>
                            </div>
                            <div class="flex">
                                <p class="text-[18px] text-white/70 font-medium leading-[18px]">Yearly Earnings:</p>
                                <p class="text-[18px] text-white font-medium leading-[18px]">10009 EMC</p>
                            </div>
                        </div>
                        <div class="w-[417px] ml-auto mt-[83px]">
                            <p class="mr-[10px] text-[18px] leading-[18px] text-[#fff]">Add funds</p>
                            <div
                                class="mt-[15px] flex justify-between items-center w-[417px] h-[54px] rounded-[8px] bg-[#2A2C47]">
                                <p class="ml-[20px] text-[24px] leading-[24px] text-white/70 font-medium">0.00</p>
                                <span class="flex mr-[20px] items-center">
                                    <p class="flex mr-[20px] text-[24px] leading-[24px] text-white">EMC</p>
                                    <em class="not-italic text-[18px] leading-[18px] text-[#FFB017] cursor-pointer">Max</em>
                                </span>
                            </div>
                            <div class="flex mt-[20px] w-full justify-between">
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">Balance:</p>
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">200 EMC</p>
                            </div>
                            <div class="flex mt-[20px] w-full justify-between">
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">Staked:</p>
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">3000.34 EMC</p>
                            </div>
                            <div class="flex mt-[20px] w-full justify-between">
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">Redeemable:</p>
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">200.34 EMC</p>
                            </div>
                        </div>
                        <div class="w-[417px] ml-auto mt-[30px] justify-between flex">
                            <div class="btn-bg2 cursor-pointer rounded-[8px] flex justify-center items-center text-[16px] font-medium w-[160px] h-[44px]"
                                @click="onStaking">
                                Staking Now
                            </div>
                            <div
                                class="bg-[#323557] cursor-pointer rounded-[8px] flex justify-center items-center text-[16px] font-medium w-[160px] h-[44px]">
                                Unstake
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 第三页 -->
        <div class="w-full flex flex-col pt-[90px] flex-shrink-0 pb-[300px] relative z-10">
            <h2 class="text-[48px] font-bold leading-[84px] text-[#fff] flex justify-center">Why Stake with EMC?</h2>
            <div class="max-w-[742px] flex-col mx-auto flex w-full flex-1 px-5 mt-[50px] flex-shrink-0">

                <div class="flex flex-col duration-300 mb-[40px] border-linear w-full overflow-hidden rounded-[10px]">
                    <div
                        class="w-[calc(100%-4px)] py-[20px] h-[calc(100%-4px)] cursor-pointer pl-[40px] group duration-300 overflow-hidden rounded-[10px] flex-shrink-0 bg-[rgb(0,2,27)] m-[2px]">
                        <p class="text-[20px] font-semibold text-[#fff]">1.Earn EMC Ecosystem Rewards.</p>
                        <p
                            class="text-[#fff]/70 text-[16px] leading-[24px] h-[0] opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 duration-300">
                            Staking your EMC tokens
                            provides an opportunity
                            to earn
                            additional EMC
                            tokens. It's a
                            simple way
                            to increase your holdings and actively participate in the growth of our ecosystem.</p>
                    </div>
                </div>

                <div class="flex flex-col duration-300 mb-[40px] border-linear w-full overflow-hidden rounded-[10px]">
                    <div
                        class="w-[calc(100%-4px)] py-[20px] h-[calc(100%-4px)] cursor-pointer pl-[40px] group duration-300 overflow-hidden rounded-[10px] flex-shrink-0 bg-[rgb(0,2,27)] m-[2px]">
                        <p class="text-[20px] font-semibold text-[#fff]">2. Multiplier e-Power for Mining Rewards.</p>
                        <p
                            class="text-[#fff]/70 text-[16px] leading-[24px] h-[0] opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 duration-300">
                            Stakers can benefit from a multiplier e-Power for mining rewards. It's an incentive for actively
                            supporting our network and enjoying additional gains.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col duration-300 mb-[40px] border-linear w-full overflow-hidden rounded-[10px]">
                    <div
                        class="w-[calc(100%-4px)] py-[20px] h-[calc(100%-4px)] cursor-pointer pl-[40px] group duration-300 overflow-hidden rounded-[10px] flex-shrink-0 bg-[rgb(0,2,27)] m-[2px]">
                        <p class="text-[20px] font-semibold text-[#fff]">3. Enhanced Community Governance.</p>
                        <p
                            class="text-[#fff]/70 text-[16px] leading-[24px] h-[0] opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 duration-300">
                            By staking, you gain a voice in EMC's governance. Your participation can help shape the future
                            of our project, ensuring it aligns with your interests.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col duration-300 border-linear w-full overflow-hidden rounded-[10px]">
                    <div
                        class="w-[calc(100%-4px)] py-[20px] h-[calc(100%-4px)] cursor-pointer pl-[40px] group duration-300 overflow-hidden rounded-[10px] flex-shrink-0 bg-[rgb(0,2,27)] m-[2px]">
                        <p class="text-[20px] font-semibold text-[#fff]">4. Secure the Computing Network.</p>
                        <p
                            class="text-[#fff]/70 text-[16px] leading-[24px] h-[0] opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 duration-300">
                            Stakers play a pivotal role in maintaining the stability and security of our computing network.
                            Your contribution enhances the overall integrity of our platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <n-modal v-model:show="showModal">
            <n-card class="withdraw-modal" style="width: 550px" title="" :bordered="false" size="huge" role="dialog"
                aria-modal="true">
                <div class="flex flex-col items-center bg-[#1A1C34] rounded-[24px]">
                    <p class="text-[24px] pt-[30px] text-[#fff] font-medium">Withdraw</p>
                    <div class="px-[66px] mt-[40px] w-full">
                        <p class="text-[18px] text-[#fff] font-medium">Funds</p>
                        <div class="mt-[15px] flex justify-between items-center w-full h-[54px] rounded-[8px] bg-[#2A2C47]">
                            <p class="ml-[20px] text-[24px] leading-[24px] text-white/70 font-medium">0.00</p>
                            <span class="flex mr-[20px] items-center">
                                <p class="flex mr-[20px] text-[24px] leading-[24px] text-white">EMC</p>
                                <em class="not-italic text-[18px] leading-[18px] text-[#FFB017] cursor-pointer">Max</em>
                            </span>
                        </div>
                        <div class="flex mt-[20px] w-full justify-between">
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">Balance:</p>
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">200 EMC</p>
                        </div>
                        <div class="flex mt-[20px] w-full justify-between">
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">Staked:</p>
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">3000.34 EMC</p>
                        </div>
                        <div class="flex mt-[20px] w-full justify-between">
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">Redeemable:</p>
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">200.34 EMC</p>
                        </div>
                        <div
                            class="w-full mt-[60px] cursor-pointer rounded-[8px] h-[44px] bg-[#323557]/60 flex-shrink-0 mb-[30px] flex items-center justify-center text-[16px] text-[#fff] font-medium">
                            Withdraw
                        </div>
                    </div>
                </div>
            </n-card>
        </n-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NPopover, NInputNumber, NModal, NCard } from 'naive-ui';
import Star from './components/star.vue'
import Bg from './components/bg.vue'

const daysList: { id: number, label: string }[] = [
    {
        id: 1,
        label: '1 Day'
    },
    {
        id: 2,
        label: '30 Days'
    },
    {
        id: 3,
        label: '90 Days'
    },
    {
        id: 4,
        label: '180 Days'
    },
    {
        id: 5,
        label: '360 Days'
    }
]
const currentDay = ref(1)
const phase = ref(1)
const phaseMin = ref(1)
const phaseMax = ref(99)
const phaseAdd = () => {
    if (phase.value >= phaseMax.value) {
        return
    }
    phase.value = ++phase.value
}
const phaseDecrease = () => {
    if (phase.value <= phaseMin.value) {
        return
    }
    phase.value = --phase.value
}

const showModal = ref(false)
const onStaking = () => {
    showModal.value = true
}

</script>

<style scoped>
.withdraw-modal {
    background: none;
}

.withdraw-modal /deep/ .n-card__content {
    padding: 0;
}
</style>
