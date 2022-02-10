import {
  commafy,
  handleCropName,
  handleDecimal,
  handleEnNum,
  handleRadioNum,
} from "../src/utils";
import i18n from "i18next";

describe("不同语言环境截取不同字符长度", () => {
  const cnString = "0".repeat(5);
  const enString = "0".repeat(8);
  const cnString1 = "0".repeat(11);
  const enString1 = "0".repeat(15);
  it("中文截取7字符,后面补3个点", () => {
    i18n.changeLanguage("zh_CN");
    expect(handleCropName(cnString).length).toBe(cnString.length);
    expect(handleCropName(cnString)).not.toMatch("...");
    expect(handleCropName(cnString1).length).toBe(10);
    expect(handleCropName(cnString1)).toMatch("...");
  });

  it("英文超出12字符,后面补3个点", () => {
    i18n.changeLanguage("en_US");
    expect(handleCropName(enString).length).toBe(enString.length);
    expect(handleCropName(enString)).not.toMatch("...");
    expect(handleCropName(enString1).length).toBe(15);
    expect(handleCropName(enString1)).toMatch("...");
  });
});

describe("保留三位小数", () => {
  const test3 = handleDecimal(45646.0);
  const test4 = handleDecimal(45646.00006);
  it("是否存在小数点", () => {
    expect(handleDecimal(test3)).toMatch(".");
  });

  it("保留三位小数,test3情况保留00", () => {
    expect(test3.slice(test3.indexOf(".") + 1, test3.length)).toBe("00");
    expect(test4.slice(test4.indexOf(".") + 1, test4.length).length).toBe(3);
  });
});

describe("四舍五入", () => {
  const test1 = handleEnNum("");
  it("空字符串", () => {
    expect(test1).toBe("");
  });

  it("进位", () => {
    i18n.changeLanguage("zh_CN");
    expect(handleEnNum("153.45566123")).toBe("153.46");
    i18n.changeLanguage("en_US");
    expect(handleEnNum("153.45566123")).toBe("1534.56");
  });

  it("不进位", () => {
    i18n.changeLanguage("zh_CN");
    expect(handleEnNum("153.444446123")).toBe("153.44");
    i18n.changeLanguage("en_US");
    expect(handleEnNum("153.444446123")).toBe("1534.44");
  });

  it("小于0.01,大于0,返回0.00", () => {
    i18n.changeLanguage("zh_CN");
    expect(handleEnNum("0.00901", true)).toBe("0.00");
    expect(handleEnNum("0.010001", true)).toBe("0.01");
    i18n.changeLanguage("en_US");
    expect(handleEnNum("0.00901", true)).toBe("0.00");
    expect(handleEnNum("0.010001", true)).toBe("0.1");
  });
});

describe("百分比处理", () => {
  const test1 = handleRadioNum("");
  it("空字符串", () => {
    expect(test1).toBe("--");
  });

  it("进位", () => {
    expect(handleRadioNum("53.45566123")).toBe("53.46%");
    expect(handleRadioNum("0.00566123")).toBe("0.01%");
  });

  it("不进位", () => {
    expect(handleRadioNum("53.444446123")).toBe("53.44%");
    expect(handleRadioNum("0.00466123")).toBe("0.00%");
  });
});

describe("千分制", () => {
  const test1 = commafy("");
  it("空字符串", () => {
    expect(test1).toBe("--");
  });

  it("保留两位，不四舍五入", () => {
    expect(commafy("39810.00")).toBe("39,810.00");
    expect(commafy("39810")).toBe("39,810.00");
    expect(commafy("39810.45")).toBe("39,810.45");
  });

  it("常规显示", () => {
    expect(commafy("39810.44")).toBe("39,810.44");
    expect(commafy("0.01")).toBe("0.01");
  });
});
