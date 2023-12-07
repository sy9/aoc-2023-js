export class AOCMap{
  constructor(name) {
    this.name = name
    this.entries = []
  }

  addEntry(dstStart, srcStart, length) {
    this.entries.push({
      dstStart: dstStart,
      srcStart: srcStart,
      range: length,
      do: this.entryMap(dstStart, srcStart, length),
      doRange: this.entryMapRange(dstStart, srcStart, length)
    })
  }

  lookup(input) {
    for (const entry of this.entries) {
      const result = entry.do(input)
      if (result.found) return result.value
    }
    return input
  }

  lookupRange(start, length) {
    const outRanges = []
    for (const entry of this.entries) {
      const resultRanges = entry.doRange(start, length)
      for (const resultRange of resultRanges) {
        if (resultRange.found) outRanges.push(resultRange)
      }
    }
    return outRanges
  }

  entryMap(destStart, srcStart, range) {
    return function(input) {
      if (input < srcStart || input > srcStart+range) return { found: false, value: input}
      return {
        found: true,
        value: destStart+input-srcStart
      }
    }
  }

  // entryMapRange checks if start..start+range is included in/overlaps with srcStart..srcStart+range
  // and returns overlapping range (mapped to destStart)
  // example input: 40 10 10 (input range 10..19, mapping to output range 40..49)
  entryMapRange(destStart, srcStart, length) {
    return function(inStart, inLength) {
      // in:  XXXX---------- or ---------XXXX-
      // src: -------XXXX---    --XXXX--------
      if (inStart+inLength <= srcStart || inStart >= srcStart+length) 
        return [{ found: false, start: inStart, size: inLength }]
      
      //      1234567890
      // in:  ---XXXX-------
      // src: -----XXXX-----
      if (inStart < srcStart && inStart+inLength < srcStart+length)
        return [
          { found: false, start: inStart, size: srcStart-inStart},
          { found: true,  start: destStart, size: inLength-(srcStart-inStart)}
        ]
    
      let outStart = destStart + ((inStart > srcStart) ? inStart - srcStart : 0)
      let outLength = srcStart+length <= inStart+inLength ? srcStart+length : inStart+inLength
      //console.log("current: ", outLength, srcStart+length <= inStart+inLength)
      outLength -= (inStart < srcStart ? srcStart : inStart)
      //console.log("srcStart < inStart:", srcStart < inStart, "srcStart: ", srcStart, "inStart: ", inStart)
      return {
        found: true,
        start: outStart,
        size: outLength
      }
    }
  }
}