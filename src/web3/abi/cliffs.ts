export default [
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_minStartDays", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ReleaseVestingV1.DurationUnits",
        name: "durationUnits",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTotal",
        type: "uint256",
      },
    ],
    name: "VestingScheduleCreated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
      { internalType: "uint256", name: "_start", type: "uint256" },
      { internalType: "uint256", name: "_duration", type: "uint256" },
      {
        internalType: "enum ReleaseVestingV1.DurationUnits",
        name: "_durationUnits",
        type: "uint8",
      },
      { internalType: "uint256", name: "_amountTotal", type: "uint256" },
    ],
    name: "createVestingSchedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
    ],
    name: "getAmount",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
    ],
    name: "getLockedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
    ],
    name: "getReleasableAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
    ],
    name: "getVestingSchedule",
    outputs: [
      {
        components: [
          { internalType: "address", name: "beneficiary", type: "address" },
          { internalType: "uint256", name: "start", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            internalType: "enum ReleaseVestingV1.DurationUnits",
            name: "durationUnits",
            type: "uint8",
          },
          { internalType: "uint256", name: "amountTotal", type: "uint256" },
          { internalType: "uint256", name: "released", type: "uint256" },
        ],
        internalType: "struct ReleaseVestingV1.VestingSchedule[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minStartDays",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "vestingSchedules",
    outputs: [
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      {
        internalType: "enum ReleaseVestingV1.DurationUnits",
        name: "durationUnits",
        type: "uint8",
      },
      { internalType: "uint256", name: "amountTotal", type: "uint256" },
      { internalType: "uint256", name: "released", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
