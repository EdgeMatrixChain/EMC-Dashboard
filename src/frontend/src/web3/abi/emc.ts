export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_duration',
        type: 'uint256',
      },
      {
        internalType: 'enum RewardVestingContract.DurationUnits',
        name: '_durationUnits',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_amountTotal',
        type: 'uint256',
      },
    ],
    name: 'createVestingSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'depositPermanently',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'daysYieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'daysDurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days30YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days30DurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days90YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days90DurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days180YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days180DurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days360YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days360DurationMultiple',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'y',
        type: 'uint256',
      },
    ],
    name: 'PRBMath_MulDiv18_Overflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'UD60x18',
        name: 'x',
        type: 'uint256',
      },
    ],
    name: 'PRBMath_UD60x18_Exp2_InputTooBig',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'UD60x18',
        name: 'x',
        type: 'uint256',
      },
    ],
    name: 'PRBMath_UD60x18_Log_InputTooSmall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'release',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'daysYieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'daysDurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days30YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days30DurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days90YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days90DurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days180YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days180DurationMultiple',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days360YieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'days360DurationMultiple',
        type: 'uint256',
      },
    ],
    name: 'setDurationUnitRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_op',
        type: 'address',
      },
    ],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'TokensReleased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum RewardVestingContract.DurationUnits',
        name: 'durationUnits',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountTotal',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'yieldRate',
        type: 'uint256',
      },
    ],
    name: 'VestingScheduleCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum RewardVestingContract.DurationUnits',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'durationUnitMultiple',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum RewardVestingContract.DurationUnits',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'durationUnitRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'getAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDurationUnitRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'getLockedAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'getReleasableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'getVestingSchedule',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'enum RewardVestingContract.DurationUnits',
            name: 'durationUnits',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'amountTotal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'released',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'yieldRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewarded',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardVestingContract.VestingSchedule[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'permanentTotal',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'enum RewardVestingContract.DurationUnits',
            name: 'durationUnits',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'amountTotal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'released',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'yieldRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewarded',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardVestingContract.VestingSchedule',
        name: '_schedule',
        type: 'tuple',
      },
    ],
    name: 'releasableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'enum RewardVestingContract.DurationUnits',
            name: 'durationUnits',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'amountTotal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'released',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'yieldRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewarded',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardVestingContract.VestingSchedule',
        name: '_schedule',
        type: 'tuple',
      },
    ],
    name: 'vestedAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'vestingSchedules',
    outputs: [
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
      {
        internalType: 'enum RewardVestingContract.DurationUnits',
        name: 'durationUnits',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'amountTotal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'released',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'yieldRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewarded',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
