export function addThousandSeparator(number: number): string {
  // Convert number to string
  let strNumber: string = String(number);

  // Split the string into integer and decimal parts
  let parts: string[] = strNumber.split(".");
  let integerPart: string = parts[0];
  let decimalPart: string = parts[1] ? "." + parts[1] : "";

  // Add thousand separators to the integer part
  let result: string = "";
  for (
    let i: number = integerPart.length - 1, j: number = 1;
    i >= 0;
    i--, j++
  ) {
    result = integerPart[i] + result;
    if (j % 3 === 0 && i !== 0) {
      result = "." + result;
    }
  }

  // Combine integer and decimal parts
  result += decimalPart;

  return result;
}

export function removeThousandSeparator(text: string): number {
  // Remove any commas in the text
  let stringWithoutCommas: string = text.replace(/\./g, "");

  // Parse the string to a number
  let number: number = parseFloat(stringWithoutCommas);
  if (!number) {
    number = 0;
  }

  return number;
}
