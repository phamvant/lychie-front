export const categoryToCode = {
  "Quần áo": {
    code: "01",
    subCode: [
      {
        name: "Váy",
        code: "01",
      },
      {
        name: "Chân váy",
        code: "02",
      },
      {
        name: "Quần",
        code: "03",
      },
      {
        name: "Áo",
        code: "04",
      },
    ],
  },
  Giày: {
    code: "02",
    subCode: [
      {
        name: "Boots",
        code: "01",
      },
      {
        name: "Cao gót",
        code: "02",
      },
      {
        name: "Lười",
        code: "03",
      },
    ],
  },
};

export const codeGenerate = (
  category: keyof typeof categoryToCode,
  subCategory: keyof typeof categoryToCode
) => {
  const code =
    categoryToCode[category]?.code +
    categoryToCode[category]?.subCode.find(
      (value) => value.name === subCategory
    )?.code;

  return code;
};
