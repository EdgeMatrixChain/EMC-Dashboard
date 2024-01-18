// //backup

// type ModelItem = {
//   hash: string;
//   model_name: string;
//   model_sn: string;
//   config: string;
//   filename: string;
//   sha256: string;
//   title: string;
//   cover: string;
// };

// const initSdModels = async (nodeId: string) => {
//   const resp = await http.get('/emcnetwork/sdmodels', {
//     params: { nodeid: nodeId },
//   });
//   const modelsData = resp.data;
//   if (modelsData._result !== 0 || modelsData.data === '') return;
//   const models = JSON.parse(modelsData.data);

//   if (typeof models !== 'object' || !models.length) {
//     modelList.value = [];
//   } else {
//     models.sort((a: any, b: any) => {
//       const aSha256 = Boolean(a.sha256);
//       const bSha256 = Boolean(b.sha256);
//       if (aSha256 && !bSha256) {
//         return -1;
//       } else if (!aSha256 && bSha256) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//     modelList.value = [...models];
//   }

//   const resp1 = await http.get('https://client.emchub.ai/emchub/api/client/modelInfo/queryList', {
//     params: { pageNo: 1, pageSize: 99 },
//   });
//   const modelAllList = resp1.data.pageInfo?.list;

//   modelList.value.forEach((modelItem: ModelItem) => {
//     if (!modelItem.sha256) return;
//     const resp = modelAllList.find((modelItemAllItems: any) => modelItem.sha256 === modelItemAllItems.modelVersions[0].hashCodeSha256);
//     if (!resp) return;
//     const previewPicturesUrl = JSON.parse(resp.modelVersions[0].previewPicturesUrl)[0] || [];
//     modelItem.cover = previewPicturesUrl.url;
//     modelItem.model_name = resp.modelName;
//     modelItem.model_sn = resp.modelSn;
//   });
// };