// services/mockIdentity.service.js

// Aadhaar checksum validation (Verhoeff Algorithm)
function validateAadhaarChecksum(num) {
  const d = [
    [0,1,2,3,4,5,6,7,8,9],
    [1,2,3,4,0,6,7,8,9,5],
    [2,3,4,0,1,7,8,9,5,6],
    [3,4,0,1,2,8,9,5,6,7],
    [4,0,1,2,3,9,5,6,7,8],
    [5,9,8,7,6,0,4,3,2,1],
    [6,5,9,8,7,1,0,4,3,2],
    [7,6,5,9,8,2,1,0,4,3],
    [8,7,6,5,9,3,2,1,0,4],
    [9,8,7,6,5,4,3,2,1,0]
  ];
  const p = [
    [0,1,2,3,4,5,6,7,8,9],
    [1,5,7,6,2,8,3,0,9,4],
    [5,8,0,3,7,9,6,1,4,2],
    [8,9,1,6,0,4,3,5,2,7],
    [9,4,5,3,1,2,6,8,7,0],
    [4,2,8,6,5,7,3,9,0,1],
    [2,7,9,3,8,0,6,4,1,5],
    [7,0,4,6,9,1,3,2,5,8]
  ];
  const inv = [0,4,3,2,1,5,6,7,8,9];
  
  let c = 0;
  num.split('').reverse().forEach((n, i) => {
    c = d[c][p[i % 8][parseInt(n, 10)]];
  });
  
  return c === 0;
}

export const validateIdentity = async (type, value) => {
  const patterns = {
    aadhaar: /^\d{12}$/,
    upi: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
    nfc: /^nfc_[a-zA-Z0-9]+$/,
    eid: /^EU_[a-zA-Z0-9]+$/
  };

  if (!patterns[type]) return false;

  if (type === 'aadhaar') {
    return patterns.aadhaar.test(value) && validateAadhaarChecksum(value);
  }
  
  return patterns[type].test(value);
};
