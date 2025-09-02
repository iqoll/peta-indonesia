// Helper function untuk mencari field di infobox
export function findField(parts, fieldName, parentName = null) {
    for (let part of parts) {
    if (part.type === "field" && part.name === fieldName) {
      if(!parentName) {
        return part.value;
      }
    }
    if (part.has_parts) {
      if(parentName && part.name === parentName) {
        const result = findField(part.has_parts, fieldName);
        if (result) return result;
      } else {
        const result = findField(part.has_parts, fieldName, parentName);
        if (result) return result;
      }
    }
  }
  return null;
}

export function findFieldMulti(parts, fieldNames, parentNames = []) {
  for (let name of fieldNames) {
    for (let parent of parentNames.length ? parentNames : [null]) {
      const result = findField(parts, name, parent);
      if(result) return result;
    }
  }
  return null
}