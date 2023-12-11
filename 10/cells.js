export const Cells = {
  "-": {
    "left": {
      offsetX: 1,
      offsetY: 0,
      dir: "left"
    },
    "right": {
      offsetX: -1,
      offsetY: 0,
      dir: "right"
    }
  },
  "|": {
    "up": {
      offsetX: 0,
      offsetY: 1,
      dir: "up"
    },
    "down": {
      offsetX: 0,
      offsetY: -1,
      dir: "down"
    }
  },
  "7": {
    "down": {
      offsetX: -1,
      offsetY: 0,
      dir: "right"
    },
    "left": {
      offsetX: 0,
      offsetY: 1,
      dir: "up"
    }
  },
  "F": {
    "down": {
      offsetX: 1,
      offsetY: 0,
      dir: "left"
    },
    "right": {
      offsetX: 0,
      offsetY: 1,
      dir: "up"
    }
  },
  "J": {
    "left": {
      offsetX: 0,
      offsetY: -1,
      dir: "down"
    },
    "up": {
      offsetX: -1,
      offsetY: 0,
      dir: "right"
    }
  },
  "L": {
    "right": {
      offsetX: 0,
      offsetY: -1,
      dir: "down"
    },
    "up": {
      offsetX: 1,
      offsetY: 0,
      dir: "left"
    }
  }
}