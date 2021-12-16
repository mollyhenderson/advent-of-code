const fs = require('fs');

// https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
const hex2bin = hex => parseInt(hex, 16).toString(2).padStart(4, '0');

const readPacket = (packet, versionTotal=0) => {
  const version = packet.slice(0, 3);
  const typeId = packet.slice(3, 6);

  // console.log({ packet, version, parsedVersion: parseInt(version, 2), typeId });

  versionTotal += parseInt(version, 2);

  let endIndex = 0;
  if (typeId === '100') {
    // console.log('literal value');
    // literal value
    let binaryNum = '';
    let i = 6;
    let keepReading = true;
    while(keepReading) {
      const nextGroup = packet.slice(i, i+5);
      if (nextGroup[0] === '0') keepReading = false;
      binaryNum += nextGroup.slice(1);
      i += 5;
    }
    endIndex = i;
  } else {
    // operator packet
    const lengthTypeId = packet[6];
    if (lengthTypeId === '0') {
      // console.log('operator, type 0');
      // the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
      const totalSubPacketLength = parseInt(packet.slice(7, 22), 2);
      
      let lengthRead = 0;
      while (lengthRead < totalSubPacketLength) {
        const { versionTotal: subVersionTotal, endIndex: subEndIndex } = readPacket(packet.slice(22 + lengthRead));
        versionTotal += subVersionTotal;
        lengthRead += subEndIndex;
      }
      endIndex = 22 + totalSubPacketLength;
    } else if (lengthTypeId === '1') {
      // console.log('operator, type 1');
      // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
      const numSubPackets = parseInt(packet.slice(7, 18), 2);

      let lengthRead = 0;
      for (let i = 0; i < numSubPackets; i++) {
        const { versionTotal: subVersionTotal, endIndex: subEndIndex } = readPacket(packet.slice(18 + lengthRead));
        versionTotal += subVersionTotal;
        lengthRead += subEndIndex;
      }
      endIndex = 18 + lengthRead;
    } else {
      throw 'Something went horribly wrong';
    }
  }

  return { versionTotal, endIndex };
}

const answer1 = (input) => {
  const binary = input.map(c => hex2bin(c)).join('');
  const { versionTotal } = readPacket(binary);
  return versionTotal;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('');
console.log(answer1(input));