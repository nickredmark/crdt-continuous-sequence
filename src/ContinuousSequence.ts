export class ContinuousSequence {
  sort = (arr: any[]) => arr.sort(this.compare);

  move = (current: any, prev: any, next: any) =>
    this.setIndex(current, this.getIndexBetween(current, prev, next));

  compare = (a: any, b: any) => {
    const indexA = this.getIndex(a);
    const indexB = this.getIndex(b);

    for (let i = 0; i < Math.max(indexA.length, indexB.length); i++) {
      const comparison = this.compareIndexPart(indexA[i], indexB[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }

    return 0;
  };

  getIndexBetween = (current: any, prev: any, next: any) => {
    // note how [] = MIN and undefined = MAX
    const currentId = this.getId(current);
    const prevIndex = prev ? this.getIndex(prev) : [];
    const nextIndex = next ? this.getIndex(next) : undefined;

    const index = [];
    if (nextIndex) {
      // make sure we are between prev and next
      while (
        this.compareIndexPart(
          prevIndex[index.length],
          nextIndex[index.length]
        ) === 0
      ) {
        index.push(prevIndex[index.length]);
      }
      // make sure we are before next
      if (this.compareIndexPart(nextIndex[index.length], currentId) <= 0) {
        index.push(prevIndex[index.length]);
      }
    }
    // make sure we are before prev
    while (this.compareIndexPart(currentId, prevIndex[index.length]) <= 0) {
      index.push(prevIndex[index.length]);
    }
    index.push(this.getId(current));
    return index;
  };

  compareIndexPart = (a: any, b: any) => {
    if (a == b) {
      // using == on purpose
      return 0;
    }
    if (!a) {
      return -1;
    }
    if (!b) {
      return 1;
    }
    return a < b ? -1 : 1;
  };

  getId = (element: any): string =>
    typeof element === "string" ? element : element.id;

  getIndex = (element: any): string[] => {
    if (Array.isArray(element)) {
      return element;
    }

    if (typeof element === "string") {
      return [element];
    }

    if (element.index) {
      if (typeof element.index === "string") {
        return JSON.parse(element.index);
      }

      return element.index;
    }

    return [this.getId(element)];
  };

  setIndex = (element: any, index: string[]) => (element.index = index);
}
