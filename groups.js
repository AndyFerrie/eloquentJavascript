class Group {
  constructor() {
    this.members = [];
  }
  add(value) {
    if (!this.members.includes(value)) {
      this.members.push(value);
    }
  }
  delete(value) {
    this.members = this.members.filter((member) => member !== value);
  }
  static from(iterable) {
    let group = new Group();
    for (let value of iterable) {
      group.add(value);
    }
    return group;
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.i = 0;
  }
  next() {
    if (this.position >= this.group.members.length) {
      return { done: true };
    } else {
      let result = {
        value: this.group.members[this.position],
        done: false,
      };
      this.position++;
      return result;
    }
  }
}
