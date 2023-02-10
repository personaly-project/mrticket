/** @format */
import React from "react";

function filterObject<T>(
  inputArray: Array<T>,
  objectExample: T,
  searchQuery: string
) {
  if (searchQuery.length < 2) {
    return inputArray;
  }
  let result: T[] = [];
  if (
    typeof objectExample !== "object" ||
    typeof Array.isArray(objectExample)
  ) {
    return;
  }

  if (!objectExample) {
    return;
  }

  const keys: string[] = Object.keys(objectExample);

  for (let i = 0; i < inputArray.length; i++) {
    let objectToSearch: T = inputArray[i];

    // compare each key value to the objectSearch
    for (let j = 0; j < keys.length; j++) {
      let key: string = keys[j];

      let value: any = (objectToSearch as { [key: string]: any })[key];

      // if the value is a string
      if (typeof value === "string") {
        if (value.toLowerCase().includes(searchQuery.toLowerCase())) {
          result.push(objectToSearch);
          break;
        }
      }
    }
  }
  return result;
}

export default filterObject;
