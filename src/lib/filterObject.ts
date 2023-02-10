/** @format */
import React from "react";

const filterObject = (
  Array: Array<object>,
  objectExample: object,
  searchQuery: string
) => {
  if (searchQuery.length < 2) {
    return Array;
  }
  let result: any[] = [];
  const keys: string[] = Object.keys(objectExample);

  for (let i = 0; i < Array.length; i++) {
    let objectToSearch: object = Array[i];

    // compare each key value to the objectSearch
    for (let j = 0; j < keys.length; j++) {
      let key: string = keys[j];
      let value: string = objectToSearch[key];

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
};

export default filterObject;
