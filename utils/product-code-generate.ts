export const codeGenerate = (
  category: string,
  subCategory: string,
  categoryList: any[]
) => {
  const firstCode = categoryList.findIndex(
    (value) => value.categoryName == category
  );

  let secondCode = categoryList[firstCode].categorySubName.findIndex(
    (value: any) => value == subCategory
  );

  const code =
    (firstCode + 1).toString().padStart(2, "0") +
    (secondCode + 1).toString().padStart(2, "0");

  return code;
};
