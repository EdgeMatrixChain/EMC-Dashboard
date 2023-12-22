#### Usage

```typescript
import { ApiManager } from "@/web3/api";
import { EMCApi } from "@/web3/api/emc";
import { ERC20Api } from "@/web3/api/erc20";

const apiManager = ApiManager.getInstance();
let emcApi: null | EMCApi = null;
let erc20Api: null | ERC20Api = null;

const handleStake = async ({ start, cycles, cycleUnit, amount }: any) => {
  const resp2 = await erc20Api!.approve({
    amount: INFINITY,
    spender: rvContract.value,
  });
  if (resp2._result !== 0) {
    message.error(`Approve error: ${resp2._desc}`);
    return resp2;
  }
  const resp3 = await emcApi!.createVestingSchedule({
    account,
    start,
    cycles,
    cycleUnit,
    amount: BigInt(amount),
  });
  if (resp3._result !== 0) {
    message.error(`CreateVestingSchedule error: ${resp3._desc}`);
  }
  return resp3;
};
onMounted(async () => {
  const emcContract = "";
  emcApi = apiManager.create(EMCApi, { address: emcContract });
  const { data: erc20ContractAddress } = await emcApi.token();
  erc20Api = apiManager.create(ERC20Api, { address: erc20ContractAddress });
  await emcApi.getLockedAmount({ account: account0 });
  await erc20Api.balanceOf({ account: account0 });
});
```
