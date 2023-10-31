<template>
    <div class="w-screen flex flex-col bg-[rgb(0,2,27)] fixed left-0 h-screen top-0 overflow-y-scroll">
        <!-- 背景 -->
        <Star />

        <!-- 头部 -->
        <Header />

        <!-- 第一页 -->
        <Banner />

        <!-- 第二页 -->
        <div class="w-full relative z-10 flex flex-col pt-[70px] lg:pt-[90px] flex-shrink-0">
            <h2
                class="text-[32px] leading-[32px] lg:text-[48px] font-bold lg:leading-[84px] text-[#fff] flex justify-center">
                Staking with EMC
            </h2>
            <div class="max-w-[1340px] mx-auto flex w-full flex-1 px-5 lg:mt-[50px] mt-[40px] flex-shrink-0">
                <div
                    class="bg-[#1A1C34] lg:pt-[76px] pt-[33px] flex-col lg:flex-row lg:pb-[68px] pb-[50px] rounded-[24px] border-[2px] border-[#fff]/20 flex w-full mb-[30px]">
                    <div class="flex flex-[1.1] flex-col lg:pl-[80px] pl-[15px]">
                        <div class="flex items-center">
                            <p class="mr-[10px] text-[24px] lg:text-[28px] leading-[24px] lg:leading-[28px] text-[#fff]">
                                Duration (Days)
                            </p>
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
                            <div v-for="item in daysList" :key="item.day"
                                class="relative rounded-[8px] duration-300 cursor-pointer border-[2px] lg:mr-[36px] mr-[18px] mb-[30px] border-[#fff]/20 lg:w-[144px] w-[87px] lg:h-[54px] h-[42px] flex items-center justify-center lg:text-[24px] text-[14px] font-medium text-[#fff]"
                                :class="item.day === currentDay.day && '!border-[#FFB017]'" @click="currentDay = item">
                                <div v-show="item.day === currentDay.day"
                                    class="lg:w-8 w-6 overflow-hidden inline-block absolute right-0 top-0">
                                    <div class="h-16 bg-[#FFB017] -rotate-45 transform origin-top-left"></div>
                                    <i class="absolute top-0 right-[2px] hidden lg:flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                            fill="none">
                                            <path
                                                d="M0.940918 9.90486C0.940918 9.90486 4.85025 11.5386 6.79348 15.0709C9.12751 10.6996 13.6077 6.62227 14.9349 6.32071C14.9349 4.5117 14.9349 3.76767 14.9349 0.985672C9.58742 4.51803 7.01963 11.0223 7.01963 11.0223L4.20635 8.02831L0.940918 9.90486Z"
                                                fill="white" />
                                        </svg>
                                    </i>
                                    <i class="absolute top-0 right-[2px] flex lg:hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"
                                            fill="none">
                                            <path
                                                d="M0.940918 9.90486C0.940918 9.90486 4.85025 11.5386 6.79348 15.0709C9.12751 10.6996 13.6077 6.62227 14.9349 6.32071C14.9349 4.5117 14.9349 3.76767 14.9349 0.985672C9.58742 4.51803 7.01963 11.0223 7.01963 11.0223L4.20635 8.02831L0.940918 9.90486Z"
                                                fill="white" />
                                        </svg>
                                    </i>
                                </div>
                                {{ item.day }} Days
                            </div>
                        </div>

                        <!-- <div class="flex items-center lg:mt-[20px]">
                            <p class="mr-[10px] text-[24px] lg:text-[28px] lg:leading-[28px] leading-[28px] text-[#fff]">
                                Staking Phases</p>
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
                        </div> -->

                        <!-- <div class="flex lg:mt-[34px] mt-[20px] items-center">
                            <n-input-number class="number-input" size="large" :bordered="false" v-model:value="phase"
                                :update-value-on-input="false" placeholder="" :min="phaseMin" :max="phaseMax"
                                :show-button="false" />
                            <p class="ml-3 lg:text-[20px] text-[16px] text-[#fff] font-medium">Phase</p>
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
                        <p class="text-[#FFB017] lg:text-[16px] text-[14px] font-medium lg:mt-[22px] mt-[15px]">
                            Total {{ currentDay.day * phase }} Days (APR {{ APR }}%)
                        </p> -->
                        <div class="flex flex-col w-full lg:mt-[56px] mt-[20px] relative">
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
                                <div class="flex ml-[20px] justify-between mr-[10%] mt-[5px] lg:mt-[3px]">
                                    <p
                                        class="text-[15px] lg:text-[18px] font-medium text-[#fff]/70 lg:leading-[18px] leading-[16px]">
                                        Initiate of pledge:
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] font-medium text-[#fff] lg:leading-[18px] leading-[16px]">
                                        2023-10-19 14:23</p>
                                </div>
                                <div class="flex ml-[20px] justify-between mr-[10%] mt-[26px] lg:mt-[28px]">
                                    <p
                                        class="text-[15px] lg:text-[18px] font-medium text-[#fff]/70 lg:leading-[18px] leading-[16px]">
                                        Next release time:
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] font-medium text-[#fff] lg:leading-[18px] leading-[16px]">
                                        2023-10-19 14:23</p>
                                </div>
                                <div class="flex ml-[20px] justify-between mr-[10%] mt-[26px] lg:mt-[28px]">
                                    <p
                                        class="text-[15px] lg:text-[18px] font-medium text-[#fff]/70 lg:leading-[18px] leading-[16px]">
                                        End of pledge:</p>
                                    <p
                                        class="text-[15px] lg:text-[18px] font-medium text-[#fff] lg:leading-[18px] leading-[16px]">
                                        2023-10-19 14:23</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex lg:flex-1 mt-[40px] lg:mt-0 flex-col justify-center lg:pr-[80px] relative before:content-[''] before:hidden lg:before:flex before:left-0 before:w-[2px] before:absolute before:h-[360px] before:bg-[#fff]/20">
                        <div
                            class="flex flex-col lg:w-[417px] w-[calc(100%-30px)] flex-1 lg:py-[33px] py-[25px] lg:px-[40px] px-[18px] ml-[15px] lg:ml-auto flex-shrink-0 rounded-[16px] border-[2px] border-[#fff]/20">
                            <div class="flex lg:mb-[35px] mb-[20px] justify-between lg:justify-start">
                                <p class="text-[15px] lg:text-[18px] text-white/70 font-medium leading-[18px]">Est. APR:</p>
                                <p class="text-[15px] lg:text-[18px] text-white font-medium leading-[18px] ml-[5px]">
                                    <!-- {{ APR }}% -->
                                    {{ currentDay.nAPR }}%
                                </p>
                            </div>
                            <div class="flex justify-between lg:justify-start">
                                <p class="text-[15px] lg:text-[18px] text-white/70 font-medium leading-[18px]">
                                    Reward Earnings:
                                </p>
                                <p class="text-[15px] lg:text-[18px] text-white font-medium leading-[18px] ml-[5px]">
                                    {{ rewardEarnings }} EMC
                                </p>
                            </div>
                            <!-- <div class="flex lg:mb-[35px] mb-[20px] justify-between lg:justify-start">
                                <p class="text-[15px] lg:text-[18px] text-white/70 font-medium leading-[18px]">
                                    Monthly Earnings:
                                </p>
                                <p class="text-[15px] lg:text-[18px] text-white font-medium leading-[18px] ml-[5px]">
                                    {{ incomeMonth }} EMC
                                </p>
                            </div>
                            <div class="flex justify-between lg:justify-start">
                                <p class="text-[15px] lg:text-[18px] text-white/70 font-medium leading-[18px]">
                                    Yearly Earnings:
                                </p>
                                <p class="text-[15px] lg:text-[18px] text-white font-medium leading-[18px] ml-[5px]">
                                    {{ incomeYear }} EMC
                                </p>
                            </div> -->
                        </div>
                        <div class="w-[calc(100%-30px)] lg:w-[417px] ml-[15px] lg:ml-auto lg:mt-[83px] mt-[40px]">
                            <p class="mr-[10px] text-[18px] leading-[18px] text-[#fff]">Add funds</p>
                            <div
                                class="mt-[15px] flex justify-between items-center w-full h-[54px] rounded-[8px] bg-[#2A2C47]">
                                <p class="ml-[15px] text-[24px] leading-[24px] text-white/70 font-medium">
                                    <n-input-number :disabled="useETHUser.account0 ? false : true" class="number-input"
                                        size="large" :bordered="false" v-model:value="EMC" :update-value-on-input="false"
                                        placeholder="" :min="0" :max="balance ? balance : 0" :show-button="false" />
                                </p>
                                <span class="flex mr-[20px] items-center">
                                    <p
                                        class="flex lg:mr-[20px] mr-[11px] lg:text-[24px] lg:leading-[24px] text-[20px] leading-[20px] text-white">
                                        EMC</p>
                                    <em @click="EMC = (balance ? balance : 0)"
                                        class="not-italic text-[18px] leading-[18px] text-[#FFB017] cursor-pointer">Max</em>
                                </span>
                            </div>
                            <div class="flex mt-[20px] w-full justify-between">
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">Balance:</p>
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">
                                    {{ typeof balance === 'undefined' ? '---' : balance }}
                                    EMC
                                </p>
                            </div>
                            <div class="flex mt-[20px] w-full justify-between">
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">Staked:</p>
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">
                                    {{ typeof locked === 'undefined' ? '---' : locked }} EMC
                                </p>
                            </div>
                            <div class="flex mt-[20px] w-full justify-between">
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">Available:</p>
                                <p class="text-white/70 text-[16px] leading-[16px] font-medium">
                                    {{ typeof releasable === 'undefined' ? '---' : releasable }} EMC
                                </p>
                            </div>
                        </div>
                        <div v-if="useETHUser.account0"
                            class="w-[calc(100%-30px)] ml-[15px] lg:w-[417px] lg:ml-auto mt-[30px] justify-between flex">
                            <div :class="stakingLoading ? 'opacity-60 cursor-pointer' : 'opacity-100'"
                                class="btn-bg2 cursor-pointer duration-300 rounded-[8px] flex justify-center items-center text-[16px] font-medium w-[136px] lg:w-[160px] h-[44px]"
                                @click="staking">
                                <img v-if="stakingLoading" class="w-[18px] h-[18px] mr-[5px]" src="./images/loading.svg"
                                    alt="">
                                Staking Now
                            </div>
                            <div class="bg-[#323557] cursor-pointer rounded-[8px] flex justify-center items-center text-[16px] font-medium w-[136px] lg:w-[160px] h-[44px]"
                                @click="onWithdraw">
                                Withdraw
                            </div>
                        </div>
                        <div v-else @click="onConnect"
                            class="w-[calc(100%-30px)] lg:w-[417px] h-[44px] duration-300 btn-bg rounded-[8px] cursor-pointer flex-shrink-0 items-center ml-[15px] lg:ml-auto mt-[30px] justify-between flex">
                            <p :class="initLoading ? 'opacity-60 duration-300' : ''"
                                class="w-full h-full flex justify-center items-center text-[16px] font-medium text-[#fff]">
                                Wallet Connect
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 第三页 -->
        <Ask />

        <!-- 解押模态框 -->
        <n-modal v-model:show="decompressionModal">
            <n-card class="withdraw-modal w-[calc(100%-30px)] md:w-[550px]" title="" :bordered="false" size="huge"
                role="dialog" aria-modal="true">
                <div class="flex flex-col items-center relative bg-[#1A1C34] rounded-[24px]">
                    <p class="text-[24px] pt-[30px] text-[#fff] font-medium">Withdraw</p>
                    <i class="absolute right-[30px] top-[30px] cursor-pointer" @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M14.3026 14.115C14.2329 14.1848 14.1502 14.2401 14.0592 14.2778C13.9681 14.3156 13.8705 14.335 13.772 14.335C13.6734 14.335 13.5758 14.3156 13.4847 14.2778C13.3937 14.2401 13.311 14.1848 13.2413 14.115L9.00008 9.87378L4.75883 14.115C4.68914 14.1847 4.60642 14.24 4.51537 14.2777C4.42433 14.3154 4.32675 14.3348 4.2282 14.3348C4.12965 14.3348 4.03207 14.3154 3.94103 14.2777C3.84998 14.24 3.76726 14.1847 3.69758 14.115C3.62789 14.0453 3.57262 13.9626 3.53491 13.8716C3.49719 13.7805 3.47778 13.6829 3.47778 13.5844C3.47778 13.4859 3.49719 13.3883 3.53491 13.2972C3.57262 13.2062 3.62789 13.1235 3.69758 13.0538L7.93883 8.81253L3.69758 4.57128C3.5931 4.46617 3.5221 4.33248 3.49354 4.18706C3.46498 4.04164 3.48014 3.89102 3.53711 3.75421C3.59408 3.6174 3.69031 3.50054 3.81364 3.41837C3.93697 3.3362 4.08188 3.29241 4.23008 3.29253C4.42813 3.29237 4.61821 3.37056 4.75883 3.51003L9.00008 7.75128L13.2413 3.51003C13.3464 3.40555 13.4801 3.33455 13.6255 3.30599C13.771 3.27743 13.9216 3.29259 14.0584 3.34956C14.1952 3.40653 14.3121 3.50276 14.3942 3.62609C14.4764 3.74942 14.5202 3.89433 14.5201 4.04253C14.5202 4.24058 14.442 4.43066 14.3026 4.57128L10.0613 8.81253L14.3026 13.0538C14.3723 13.1234 14.4276 13.2061 14.4654 13.2972C14.5031 13.3882 14.5225 13.4858 14.5225 13.5844C14.5225 13.683 14.5031 13.7806 14.4654 13.8716C14.4276 13.9627 14.3723 14.0454 14.3026 14.115Z"
                                fill="white" fill-opacity="0.7" />
                        </svg>
                    </i>
                    <div class="px-[15px] md:px-[66px] mt-[20px] md:mt-[40px] w-full">
                        <p class="text-[18px] text-[#fff] font-medium">Funds</p>
                        <div class="mt-[15px] flex justify-between items-center w-full h-[54px] rounded-[8px] bg-[#2A2C47]">
                            <p class="ml-[15px] text-[24px] leading-[24px] text-white/70 font-medium">
                                {{ releasable }}
                                <!-- <n-input-number class="number-input" size="large" :bordered="false"
                                    v-model:value="redemption" :update-value-on-input="false" placeholder="" :min="0"
                                    :max="releasable ? releasable : 0" :show-button="false" /> -->
                            </p>
                            <span class="flex mr-[20px] items-center">
                                <p class="flex text-[24px] leading-[24px] text-white">EMC</p>
                                <!-- <em @click="redemption = (releasable ? releasable : 0)"
                                    class="not-italic text-[18px] leading-[18px] text-[#FFB017] cursor-pointer">Max</em> -->
                            </span>
                        </div>
                        <div class="flex mt-[20px] w-full justify-between">
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">Balance:</p>
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">
                                {{ typeof balance === 'undefined' ? '---' : balance }} EMC
                            </p>
                        </div>
                        <div class="flex mt-[20px] w-full justify-between">
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">Staked:</p>
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">
                                {{ typeof locked === 'undefined' ? '---' : locked }} EMC
                            </p>
                        </div>
                        <div class="flex mt-[20px] w-full justify-between">
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">Available:</p>
                            <p class="text-white/70 text-[16px] leading-[16px] font-medium">
                                {{ typeof releasable === 'undefined' ? '---' : releasable }} EMC
                            </p>
                        </div>
                        <div @click="onDecompression"
                            class="w-full md:mt-[60px] mt-[30px] cursor-pointer duration-300 rounded-[8px] h-[44px] bg-[#323557]/60 flex-shrink-0 mb-[30px] flex items-center justify-center text-[16px] text-[#fff] font-medium"
                            :class="decompressionLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100'">
                            <img v-if="decompressionLoading" class="w-[18px] h-[18px] mr-[5px]" src="./images/loading.svg"
                                alt="">
                            Withdraw
                        </div>
                    </div>
                </div>
            </n-card>
        </n-modal>

        <!-- 质押成功 -->
        <StakingSuccess :show="stakingSuccess" @close="closeStakingSuccess" />

        <!-- 解押成功 -->
        <ReleasableSuccess :show="releasableSuccess" @close="closeReleasableSuccess" />

    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { NPopover, NInputNumber, NModal, NCard, useMessage } from 'naive-ui';
import Star from './components/star.vue'
import Ask from './components/ask.vue'
import Header from './components/header.vue'
import Banner from './components/banner.vue'
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api'
import { ERC20Api } from '@/web3/api/erc20';
import { EMCApi } from '@/web3/api/emc';
import { ceil } from 'lodash';
import moment from 'moment';
import { ethers } from 'ethers';
import StakingSuccess from './components/stakingSuccess.vue'
import ReleasableSuccess from './components/releasableSuccess.vue'

const message = useMessage();

type dayItem = { day: number, magnification: number, apy: number, id: number, nAPR: number }
const daysList: dayItem[] = [
    // {
    //     day: 1,
    //     magnification: 1,
    //     apy: 0.67,
    //     id: 0
    // },
    {
        day: 30,
        magnification: 1.03,
        apy: 1,
        id: 1,
        nAPR: 2.7
    },
    {
        day: 90,
        magnification: 1.055,
        apy: 1.3,
        id: 2,
        nAPR: 3.15
    },
    {
        day: 180,
        magnification: 1.08,
        apy: 1.8,
        id: 3,
        nAPR: 3.60
    },
    {
        day: 360,
        magnification: 1.1,
        apy: 2.2,
        id: 4,
        nAPR: 4.8
    },
    {
        day: 720,
        magnification: 1.1,
        apy: 2.2,
        id: 5,
        nAPR: 5.7
    },
    {
        day: 360 * 3,
        magnification: 1.1,
        apy: 2.2,
        id: 6,
        nAPR: 7.1
    },
]
const currentDay = ref<dayItem>({
    day: 30,
    magnification: 1.03,
    apy: 1,
    id: 1,
    nAPR: 2.7
},)

const emcContract = '0xd5C70C233e63bf1551A15E47f9cFb8259A53bF51';
const useETHUser = useETHUserStore();
const apiManager = ApiManager.getInstance();
// 周期
const phase = ref<number>(1)
const phaseMin = ref<number>(1)
const phaseMax = ref<number>(9999)
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

const APR = ref<string>('0.67')
const EMC = ref(0)
const incomeDay = ref<string>('0')
const incomeMonth = ref<string>('0')
const incomeYear = ref<string>('0')

// 钱包地址
const account0 = ref<string>('')
// 钱包余额
const balance = ref<number | undefined>(undefined)
// 可释放的emc
const releasable = ref<number | undefined>(undefined)
// 已获得的奖励
const rewards = ref<number | undefined>(undefined)
// 当前质押量
const locked = ref<number | undefined>(undefined)
// 赎回量
const redemption = ref<number>(0)
// 质押成功
const stakingSuccess = ref(false)
const closeStakingSuccess = () => stakingSuccess.value = false
// 解押成功
const releasableSuccess = ref(false)
const closeReleasableSuccess = () => releasableSuccess.value = false

// 精度
const decimals = ref<number>()
let emcApi: null | EMCApi = null;
let erc20Api: null | ERC20Api = null;

// 获取实际金额
const getAmount = (balance: number, decimals: number, interception: number = 4) => {
    return ceil(Number(balance / 10 ** decimals), interception);
};

// 链接钱包
const onConnect = async () => {
    if (initLoading.value) {
        return
    }
    if (!erc20Api || !emcApi || !decimals.value) {
        return
    }
    await useETHUser.signIn({ type: 'metamask' })
    account0.value = useETHUser.account0
    console.log('account0', account0.value)

    balanceInit()
}

// 钱包初始化
const balanceInit = () => {
    // 获取钱包余额
    erc20Api!.balanceOf({ account: account0.value }).then(res => {
        balance.value = getAmount(Number(res.data), decimals.value!)
        console.log('钱包余额', balance.value)
    }).catch(err => {
        console.error(err)
    })

    // 查询当前可以释放多少token，以及释放时可以获得多少奖励
    emcApi!.getReleasableAmount({ account: account0.value }).then(res => {
        console.log(res)
        releasable.value = getAmount(Number(res.data[0]), decimals.value!)
        rewards.value = getAmount(Number(res.data[1]), decimals.value!)
        console.log('可释放', releasable.value)
        console.log('奖励', rewards.value)
    }).catch(err => {
        console.error(err)
    })

    // 查询当前质押锁定了多少token
    emcApi!.getLockedAmount({ account: account0.value }).then(res => {
        locked.value = getAmount(Number(res.data), decimals.value!)
        console.log('质押量', locked.value)
    }).catch(err => {
        console.error(err)
    })
}

// 质押
type FormData = {
    start: number;
    cycles: number;
    cycleUnit: number;
    amount: bigint;
};
const stakingLoading = ref(false)
const staking = async () => {
    if (stakingLoading.value) {
        return
    }
    if (!balance.value) {
        return
    }
    if (!EMC.value) {
        message.warning('Please enter the EMC quantity')
        return
    }
    stakingLoading.value = true
    const formData: FormData = {
        start: Math.floor(moment().valueOf() / 1000) + 1800,
        cycles: phase.value,
        cycleUnit: currentDay.value.id,
        amount: ethers.parseUnits(EMC.value.toString(), decimals.value),
    };
    console.log(formData);

    try {
        // 授权支付
        let approve = await erc20Api!.approve({ amount: formData.amount, spender: emcContract });
        if (approve._result !== 0) {
            message.error(`Approve Error`);
            console.log(approve)
            stakingLoading.value = false
            return false;
        }
        try {
            // 确认交易
            const pay = await emcApi!.createVestingSchedule({
                account: account0.value, start: formData.start, cycles: formData.cycles, cycleUnit: formData.cycleUnit as any, amount: formData.amount
            });
            if (pay._result !== 0) {
                message.error(`CreateVestingSchedule Error`);
                console.log(pay)
                stakingLoading.value = false
                return false;
            }
            setTimeout(() => {
                balanceInit()
                stakingLoading.value = false
                stakingSuccess.value = true
            }, 3000)
        } catch (err: any) {
            message.error(`CreateVestingSchedule Error`);
            console.log(err)
            stakingLoading.value = false
        }
    } catch (err: any) {
        message.error(`Approve Error`);
        console.log(err)
        stakingLoading.value = false
    }
}

// 解押模态框
const decompressionModal = ref(false)
const onWithdraw = () => {
    if (!useETHUser.account0) {
        return
    }
    decompressionModal.value = true
}

const closeModal = () => {
    if (decompressionLoading.value) {
        message.warning('Please wait...')
        return
    }
    decompressionModal.value = false
}

// 解压
const decompressionLoading = ref(false)
const onDecompression = () => {
    if (decompressionLoading.value) {
        return
    }
    if (!releasable.value) {
        message.error(`There is no EMC to decompress`);
        return
    }
    decompressionLoading.value = true

    emcApi!.release({ address: account0.value }).then(res => {
        if (res._result !== 0) {
            message.error(`Decompression Error`);
            return false;
        }
        setTimeout(() => {
            decompressionLoading.value = false
            decompressionModal.value = false
            releasableSuccess.value = true
            balanceInit()
        }, 3000)
    }).catch(err => {
        console.log(err)
        message.error(`Decompression Error`);
        decompressionLoading.value = false
    })
}

// 实际收益
const rewardEarnings = ref<string>('0')
watch(
    () => [EMC.value, APR.value],
    () => {
        incomeYear.value = (EMC.value * (Number(APR.value) / 100)).toFixed(4)
        incomeMonth.value = (Number(incomeYear.value) / 12).toFixed(4)
        incomeDay.value = (Number(incomeYear.value) / 365).toFixed(4)

        rewardEarnings.value = (EMC.value + ((EMC.value * currentDay.value.nAPR / 100 / 360 * currentDay.value.day))).toFixed(4)
    },
    { immediate: true }
);

// 计算apr
watch(
    () => [currentDay.value, phase.value],
    () => {
        if (!phase.value) {
            phase.value = 1
        }
        let { magnification, day, apy } = currentDay.value
        APR.value = (apy * Math.pow(magnification, phase.value - 1)).toFixed(2)
    },
    { immediate: true }
);

const initLoading = ref(true)
onMounted(async () => {
    emcApi = apiManager.create(EMCApi, { address: emcContract });
    const { data } = await emcApi.token();
    erc20Api = apiManager.create(ERC20Api, { address: data });
    const { data: _decimals } = await erc20Api.decimals()
    decimals.value = Number(_decimals)
    initLoading.value = false
});
</script>

<style scoped>
.withdraw-modal {
    background: none;
}

.withdraw-modal /deep/ .n-card__content {
    padding: 0;
}

@media screen and (max-width: 767px) {
    .number-input /deep/ .n-input input {
        width: 87px !important;
    }
}
</style>
